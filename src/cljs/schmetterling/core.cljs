(ns schmetterling.core
  (:require 
   [cljs.core.async :refer [chan <! >! put!]]
   [cljs.reader :as reader]
   [domina :as dom]
   [domina.css :as css]
   [domina.events :as events]
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
  [c id el type]
  (let [writer #(put! c [id %])]
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

(defn dispatch-message
  []
  (go
   (while true
     (let [msg (<! receive)
           raw (.-data msg)
           data (reader/read-string raw)]
       (log (str data))))))

(defn make-sender
  []
  (log "HELLO")
  (event-chan send :connect (css/sel "input#connection") :keypress)
  (go
   (while true
     (let [[id event] (<! send)]
       (log event)
       (cond
        (and (= id :connect) (= 13 (key-code event)))
        (let [port (input-value "input#connection")]
          (.send ws {:op :connect :port port})))))))

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

