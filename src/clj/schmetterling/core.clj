(ns schmetterling.core
  (:use [ring.middleware.resource :only (wrap-resource)]
        [ring.middleware.reload :only (wrap-reload)])
  (:require [clojure.edn :as edn] 
            [clojure.java.io :as io]
            [clojure.string :as string]
            [clojure.pprint :as pprint]
            [org.httpkit.server :as httpkit] 
            [polaris.core :as polaris]
            [schmetterling.debug :as debug]))

(def clients (atom []))
(def connection (atom {:connected? false}))

(defn index
  [request]
  {:status 200 
   :headers {"Content-Type" "text/html"}
   :body (slurp (io/resource "public/index.html"))})

(defn parse-exception-event
  [e]
  (let [[_ class line] (re-find #".+@(.+):([^ ]+)" (str e))
        exception (.exception e)]
    {:class class
     :line line
     :exception (str exception)}))

(defn parse-frame
  [frame filename locals source]
  (println frame)
  (if-let [[_ namespace f args file line]
           (re-find #"([^ ]+) ([^ ]+) \[(.*)\] (.+):(.+)" frame)]
    (let [args (string/split args #" ")
          [function method] (string/split f #"\$")]
      {:namespace namespace
       :function function
       :method method
       :locals locals
       :args args
       :file file
       :filename filename
       :source source
       :line line})))

(defn make-exception-handler
  [channel port]
  (fn [{:keys [e stack filenames locals sources]}]
    (let [event (parse-exception-event e)
          frames (mapv parse-frame stack filenames locals sources)
          state {:stack frames
                 :exception event
                 :paused? true}]
      (swap! connection merge state)
      (httpkit/send!
       channel (pr-str (assoc state :op :exception))))))

(defn connect
  [channel {:keys [port] :as data}]
  (try
    (let [port (Integer. port)]
      (debug/attach port (make-exception-handler channel port))
      (swap! connection assoc :connected? true :port port)
      {:op :connected
       :port port})
    (catch Exception e (println "something wrong with" data e))))

(defn init-client
  [channel data]
  (if (:connected? @connection)
    (debug/set-exception-handler (make-exception-handler channel (:port @connection))))
  (httpkit/send! channel (pr-str (assoc @connection :op :init))))

(defn eval-expression
  [channel {:keys [expression level] :as data}]
  (println "eval:" (str data))
  (let [form (edn/read-string expression) 
        result (debug/reval form level)]
    (println "result:" result)
    (assoc data 
      :result result
      :output (with-out-str (pprint/pprint result)))))

(defn dispatch
  [channel data]
  (condp = (:op data)
    :init (init-client channel data)
    :connect (connect channel data)
    :eval (eval-expression channel data)
    {:op :unsupported}))

(defn handler
  [request]
  (httpkit/with-channel request channel
    (httpkit/on-close 
     channel 
     (fn [status] 
       (println "Socket closing:" status)
       (swap! clients (fn [clients] (remove (partial = channel) clients)))))
    (if (httpkit/websocket? channel)
      (httpkit/on-receive 
       channel
       (fn [raw]
         (println "Received message:" raw)
         (when-not (some (partial = channel) @clients)
           (swap! clients conj channel))
         (let [data (edn/read-string raw)
               response (dispatch channel data)]
           (httpkit/send! channel (pr-str response)))))
      (httpkit/send!
       channel
       (index request)))))

(def routes
  (polaris/build-routes 
   [["/" :index #'index]
    ["/async" :async #'handler]]))

(defn wrap-print-request
  [handler]
  (fn [request]
    (println (str request))
    (handler request)))

(def app
  (-> (polaris/router routes)
      (wrap-resource "public")
      (wrap-reload)))
   
(defn -main 
  [& args]
  (httpkit/run-server #'app {:port 16461}))
