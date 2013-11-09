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

(defn frame-template
  [frame level]
  [(frame-tag :div "frame" level)
   frame
   [(frame-tag :div "frame-response" level)]
   [(frame-tag :input "frame-eval" level) {:type "text"}]])

(defn stack-template
  [stack exception]
  [:div#display
   [:div#exception exception]
   [:div#frames 
    (map frame-template stack (range))]])

(defn result-template
  [expression result]
  [:div.eval-result
   [:div.result-expression ">>> " (str expression)]
   [:div.result-content (str result)]])

(defn handle-exception
  [{:keys [stack exception] :as data}]
  (let [frames (stack-template stack exception)]
    (dom/append! (css/sel "div#stack") (sing/render frames))
    (doseq [level (range (count stack))]
      (event-chan 
       send :eval 
       (css/sel (str "input#frame-eval-" level))
       :keypress {:level level}))))

(defn print-result
  [{:keys [expression level result] :as data}]
  (log result)
  (let [result-node (result-template expression result)
        el (css/sel (str "div#frame-response-" level))]
    (dom/append! el (sing/render result-node))))

(defn dispatch-message
  []
  (go
   (while true
     (let [msg (<! receive)
           raw (.-data msg)
           data (reader/read-string raw)]
       (condp = (:op data)
         :connected (log (str "connected on port " (:port data) "!"))
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
                       el (str "input#frame-eval-" level)
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
