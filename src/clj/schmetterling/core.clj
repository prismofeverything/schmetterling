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
  [frame]
  (println frame)
  (if-let [[_ namespace f args file line]
           (re-find #"([^ ]+) ([^ ]+) \[(.*)\] (.+):(.+)" frame)]
    (let [args (string/split args #" ")
          [function method] (string/split f #"\$")]
      {:namespace namespace
       :function function
       :method method
       :args args
       :file file
       :line line})))

(defn connect
  [channel {:keys [port] :as data}]
  (try
    (let [port (Integer. port)]
      (debug/attach 
       port
       (fn [e stack]
         (let [event (parse-exception-event e)
               frames (mapv parse-frame stack)]
           (httpkit/send! 
            channel (pr-str {:op :exception 
                             :stack frames
                             :exception event})))))
      {:op :connected 
       :port port})
    (catch Exception e (println "something wrong with" data e))))

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
