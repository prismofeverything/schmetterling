(ns schmetterling.core
  (:require 
   [clojure.string :as string]
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

(def history 
  (atom 
   {:stack [] 
    :index 0}))

(defn add-to-history
  [expression]
  (swap! history update-in [:stack] conj expression)
  (let [index (-> @history :stack count)]
    (swap! history update-in [:index] (constantly index))))

(defn history-dec
  [index]
  (let [up (dec index)]
    (if (< up 0) 0 up)))

(defn history-inc
  [top index]
  (if (>= index top) index (inc index)))

(defn traverse-history
  [direction]
  (if (= :up direction)
    (do 
      (swap! history update-in [:index] history-dec)
      (let [{:keys [index stack]} @history]
        (nth stack index)))
    (let [top (-> @history :stack count)]
      (swap! history update-in [:index] (partial history-inc top))
      (let [{:keys [index stack]} @history]
        (if (>= index (count stack)) "" (nth stack index))))))

(defn event-chan
  [c id el type data]
  (let [writer #(put! c [id % data])]
    (events/listen! el type writer)
    {:chan c
     :unsubscribe #(.removeEventListener el type writer)}))

(defn key-code
  [event]
  (.-keyCode (events/raw-event event)))

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
  [:pre {:class "code brush: clj"}
   [:code inner]])

(defn frame-info-template
  [frame level]
  [:div.frame-info
   [:span.frame-reveal {:id (str "frame-reveal-" level) }
    [:img.rotate-90 
     {:id (str "frame-reveal-arrow-" level) 
      :src "/img/interaction-arrow.png" 
      :width 15}]]
   "In " [:span.frame-file (or (:filename frame) (:file frame))]
   " line " [:span.frame-line (:line frame)]
   ": " [:span.frame-namespace (:namespace frame)]
   (if-not (empty? (:function frame))
     [:span.frame-function "/" (:function frame)])
   [:span.frame-method " " (:method frame)]])

(defn space-padding
  [s total-spaces]
  (let [spaces (- total-spaces (count s))
        padding (repeat spaces " ")]
    (str s (string/join padding))))

(defn source-template
  [{:keys [previous highlight subsequent]}]
  [:span.lines 
   (string/join "\n" previous) "\n"
   [:span.highlight (space-padding highlight 50) "\n"]
   ;; [:span.highlight highlight "\n"]
   (string/join "\n" subsequent)])

(defn frame-template
  [frame level]
  [(frame-tag :div "frame" level)
   (frame-info-template frame level)
   [(frame-tag :div "frame-interaction" level)
    [(frame-tag :div "frame-response" level) 
     [:span.source (code-template (source-template (:source frame)))]
     [(frame-tag :pre "frame-locals" level) 
      [:code.locals (pr-str (:locals frame))]]]
    [(frame-tag :div "frame-eval" level)
     [:pre.prompt ">>> "]
     [(frame-tag :input "frame-input" level) {:type "text"}]]]])

(defn exception-template
  [exception]
  (let [message (:message exception)]
    [:div#exception
     [:span.exception-announcement "Exception! in "] 
     [:span.exception-class (:class exception)]
     " line " [:span.exception-line (:line exception)]
     ": " [:span.exception-content (:exception exception)]
     (if message ": ")
     (if message [:span.exception-message message])
     [:span#continue "continue"]]))

(defn stack-template
  [stack]
  [:div#frames 
   (map frame-template stack (range))])

(defn result-template
  [expression result output]
  [:div.eval-result
   [:div.result-expression (code-template (str ">>> " expression))]
   [:div.result-content (code-template output)]])

(defn announce-connection
  [data]
  (let [announcement [:span#connected (str "connected on port " (:port data))]]
    (dom/set-value! (css/sel "input#port") (:port data))
    (dom/append! (css/sel "div#connection") (sing/render announcement))
    (dom/set-styles! (css/sel "span#connected") {:opacity 0})
    (js/TweenMax.to (dom/single-node (css/sel "span#connected")) 0.4 (js-obj "opacity" 1.0 "delay" 0.4))))

(defn element-width
  [el]
  (.-width (js/goog.style.getSize (dom/single-node el))))

(defn element-height
  [el]
  (.-height (js/goog.style.getSize (dom/single-node el))))

(defn viewport-to-bottom
  [el]
  (let [inner (dom/single-node el) 
        viewport (.-innerHeight js/window)
        page-top (js/goog.style.getPageOffsetTop inner)
        height (.-height (js/goog.style.getSize inner))]
    (- (+ page-top height) viewport)))

(defn scroll-to-bottom
  [el]
  (let [viewport-top (viewport-to-bottom el)]
    (js/window.scrollTo 0 viewport-top)))

(defn animate-scroll
  [y]
  (let [y (if (< y 0) 0 y)]
    (js/TweenMax.to js/document.body 0.3 (js-obj "scrollTop" y))))

(defn toggle-prompt
  [level frame-reveals]
  (swap! frame-reveals update-in [level] not)
  (let [reveal (nth @frame-reveals level)
        interaction (css/sel (str "div#frame-interaction-" level))
        arrow (css/sel (str "img#frame-reveal-arrow-" level))]
    (dom/set-styles! interaction {:display (if reveal "block" "none")})
    (if reveal (animate-scroll (viewport-to-bottom interaction)))
    ((if reveal dom/add-class! dom/remove-class!) arrow "rotate-180")))

(defn handle-exception
  [{:keys [stack exception] :as data}]
  (let [exception (sing/render (exception-template exception))
        frames (sing/render (stack-template stack))
        frames-height (element-height frames)
        frame-reveals (atom (vec (repeat (count stack) false)))]
    (dom/destroy-children! (css/sel "div#stack"))
    (dom/append! (css/sel "div#stack") exception)
    (dom/append! (css/sel "div#stack") frames)
    (dom/set-styles! exception {:top 0})
    (dom/set-styles! frames {:left (* -1 (element-width (css/sel "div#frames")))})
    (js/TweenMax.to (dom/single-node exception) 0.6 (js-obj "top" 53 "delay" 1))
    (js/TweenMax.to (dom/single-node frames) 0.8 (js-obj "left" 0 "delay" 0.9))
    (doseq [pre (dom/nodes (css/sel "pre.code"))]
      (.highlightBlock js/hljs pre))
    (event-chan send :continue (css/sel "span#continue") :click {})
    (doseq [level (range (count stack))]
      (events/listen! 
       (css/sel (str "span#frame-reveal-" level)) :click
       (fn [e] 
         (toggle-prompt level frame-reveals)))
      (event-chan 
       send :eval 
       (css/sel (str "input#frame-input-" level))
       :keydown {:level level}))))

(defn print-result
  [{:keys [expression level result output] :as data}]
  (let [result-node (result-template expression result output)
        el (css/sel (str "div#frame-response-" level))
        code (sing/render result-node)]
    (dom/set-value! (css/sel (str "input#frame-input-" level)) "")
    (dom/append! el code)
    (.highlightBlock js/hljs code)
    (animate-scroll (viewport-to-bottom (css/sel (str "div#frame-interaction-" level))))))

(defn init
  [data]
  (let [expressions (:history data)]
    (swap! history assoc :stack expressions :index (count expressions)))
  (if (:connected? data)
    (announce-connection data))
  (if (:paused? data)
    (handle-exception data)))

(defn continue
  [data]
  (let [exception (css/sel "div#exception") 
        frames (css/sel "div#frames")]
    (dom/set-styles! (css/sel "div.frame-interaction") {:display "none"})
    (js/TweenMax.to (dom/single-node exception) 0.6 (js-obj "top" 0))
    (js/TweenMax.to 
     (dom/single-node frames) 0.8 
     (js-obj 
      "left" (* -1 (element-width (css/sel "div#frames")))
      "onComplete" #(dom/destroy-children! (css/sel "div#stack"))))))

(defn dispatch-message
  []
  (go
   (while true
     (let [msg (<! receive)
           raw (.-data msg)
           data (reader/read-string raw)]
       (condp = (:op data)
         :init (init data)
         :connected (announce-connection data)
         :exception (handle-exception data)
         :continue (continue data)
         :internal (continue data)
         :eval (print-result data)
         (log (str "op not supported! " data)))))))

(def key-code-map {38 :up 40 :down})

(defn make-sender
  []
  (log "HELLO")
  (event-chan send :port (css/sel "input#port") :keypress {})
  (go
   (while true
     (let [[id event data] (<! send)]
       (condp = id
         :continue (.send ws {:op :continue})
         :port (if (= 13 (key-code event))
                 (let [port (input-value "input#port")]
                   (.send ws {:op :connect :port port})))
         :eval (let [code (key-code event)] 
                 (cond 
                  (or (= 40 code) (= 38 code))
                  (let [expression (traverse-history (get key-code-map code))
                        level (:level data)]
                    (dom/set-value! (css/sel (str "input#frame-input-" level)) expression))

                  (= 13 code) 
                  (let [level (:level data)
                        el (str "input#frame-input-" level)
                        expression (input-value el)]
                    (add-to-history expression)
                    (.send ws {:op :eval 
                               :level level 
                               :expression expression})))))))))

(defn make-receiver []
  (set! 
   (.-onmessage ws)
   (fn [msg]
     (put! receive msg)))
  (set!
   (.-onopen ws)
   (fn [msg] 
     (.send ws {:op :init})))
  (dispatch-message))

(defn init!
  []
  (make-sender)
  (make-receiver))

(def on-load
  (set! (.-onload js/window) init!))

(connect/connect)

