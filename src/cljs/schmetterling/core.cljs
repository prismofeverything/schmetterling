(ns schmetterling.core
  (:require 
   [cljs.core.async :refer [chan <! >! put!]]
   [cljs.reader :as reader]
   [domina :as dom]
   [domina.css :as css]
   [domina.events :as events]
   [singult.core :as sing]
   [schmetterling.connect :as connect])
  (:require-macros 
   [cljs.core.async.macros :refer [go]]))

(def send (chan))
(def receive (chan))

(def ws-url "ws://localhost:16461/async")
(def ws (new js/WebSocket ws-url))

(defn log
  [e]
  (.log js/console e))

(defn event-chan
  [c id el type data]
  (let [writer #(put! c [id % data])]
    (events/listen! el type writer)
    {:chan c
     :unsubscribe #(.removeEventListener el type writer)}))

(defn key-code
  [event]
  (.-keyCode (events/raw-event event)))

(defn key-press?
  [event]
  (= (events/event-type event) "keypress"))

(defn input-value
  [input]
  (-> input css/sel dom/single-node dom/value))

(defn tag
  [type id class]
  (keyword (str (name type) "#" id "." class)))

(defn frame-tag
  [type class level]
  (tag type (str class "-" level) class))

(defn code-template
  [inner]
  [:pre {:class "brush: clj"} 
   [:code inner]])

(defn frame-info-template
  [frame]
  [:div.frame-info
   "In "
   [:span.frame-file (:file frame)]
   [:span.frame-line " line " (:line frame) ": "]
   [:span.frame-namespace (:namespace frame)]
   (if-not (empty? (:function frame))
     [:span.frame-function "/" (:function frame)])
   [:span.frame-method " " (:method frame)]])

(defn frame-template
  [frame level]
  [(frame-tag :div "frame" level)
   (frame-info-template frame)
   [(frame-tag :div "frame-response" level)]
   [(frame-tag :div "frame-eval" level) [:pre.prompt ">>> "]
    [(frame-tag :input "frame-input" level) {:type "text"}]]])

(defn stack-template
  [stack exception]
  [:div#display
   [:div.exception
    [:span.exception-announcement "Exception! in "] 
    [:span.exception-class (:class exception)]
    " line " 
    [:span.exception-line (:line exception)]
    ": " [:span.exception-content (:exception exception)]]
   [:div#frames 
    (map frame-template stack (range))]])

(defn result-template
  [expression result output]
  [:div.eval-result
   [:div.result-expression (code-template (str ">>> " expression))]
   [:div.result-content (code-template output)]])

(defn announce-connection
  [data]
  (let [announcement [:span#connected (str "connected on port " (:port data))]]
    (dom/append! (css/sel "div#connection") (sing/render announcement))
    (dom/set-styles! (css/sel "span#connected") {:width 500})))

(defn handle-exception
  [{:keys [stack exception] :as data}]
  (let [frames (stack-template stack exception)]
    (dom/append! (css/sel "div#stack") (sing/render frames))
    (doseq [level (range (count stack))]
      (event-chan 
       send :eval 
       (css/sel (str "input#frame-input-" level))
       :keypress {:level level}))))

(defn print-result
  [{:keys [expression level result output] :as data}]
  (log result)
  (log output)
  (let [result-node (result-template expression result output)
        el (css/sel (str "div#frame-response-" level))
        code (sing/render result-node)]
    (dom/append! el code)
    (.highlightBlock js/hljs code)))

(defn dispatch-message
  []
  (go
   (while true
     (let [msg (<! receive)
           raw (.-data msg)
           data (reader/read-string raw)]
       (condp = (:op data)
         :connected (announce-connection data)
         :exception (handle-exception data)
         :eval (print-result data)
         (log (str "op not supported! " data)))))))

(defn make-sender
  []
  (log "HELLO")
  (event-chan send :port (css/sel "input#port") :keypress {})
  (go
   (while true
     (let [[id event data] (<! send)]
       (log event)
       (condp = id
         :port (if (= 13 (key-code event))
                 (let [port (input-value "input#port")]
                   (.send ws {:op :connect :port port})))
         :eval (if (= 13 (key-code event)) 
                 (let [level (:level data)
                       el (str "input#frame-input-" level)
                       expression (input-value el)]
                   (.send ws {:op :eval 
                              :level level 
                              :expression expression}))))))))

(defn make-receiver []
  (set! 
   (.-onmessage ws)
   (fn [msg]
     (put! receive msg)))
  (dispatch-message))

(defn init!
  []
  (make-sender)
  (make-receiver))

(def on-load
  (set! (.-onload js/window) init!))

(connect/connect)
