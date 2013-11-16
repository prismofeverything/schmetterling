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
  [thread e]
  (let [[_ class line] (re-find #".+@(.+):([^ ]+)" (str e))
        exception (.exception e)
        string (debug/invoke-remote-method exception thread "toString" [])
        value (.value string)]
    {:class class
     :line line
     :exception value}))

(def def-beginning #"\(def")

(defn get-source-line
  [source line]
  (try
    (nth source (dec line))
    (catch Exception e "(no source found)")))

(defn get-surrounding-def
  [source line]
  (try
    (let [line (dec line)
          exception-line (nth source line)
          previous (if (re-find def-beginning exception-line)
                     (list)
                     (loop [previous (list)
                            line (dec line)]
                       (let [source-line (nth source line)
                             previous (cons source-line previous)]
                         (if (re-find def-beginning source-line)
                           previous
                           (recur previous (dec line))))))
          subsequent (loop [subsequent []
                            line (inc line)]
                       (let [source-line (try (nth source line) (catch Exception e nil))]
                         (if (or (not source-line) (re-find def-beginning source-line))
                           subsequent
                           (recur (conj subsequent source-line) (inc line)))))]
      {:previous previous
       :highlight exception-line
       :subsequent subsequent})
    (catch Exception e {:highlight "no source found"})))

(defn parse-frame
  [frame filename locals source-file]
  (println frame)
  (if-let [[_ signature method args file line]
           (re-find #"([^ ]+) ([^ ]+) \[(.*)\] (.+):(.+)" frame)]
    (let [args (string/split args #" ")
          path (string/split signature #"\$")
          namespace (first path)
          function (string/join "$" (rest path))
          line (Integer. line)
          source-lines (if source-file (string/split source-file #"\n"))
          source (get-surrounding-def source-lines line)]
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
  (fn [{:keys [e thread stack filenames locals sources]}]
    (let [event (parse-exception-event thread e)
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
