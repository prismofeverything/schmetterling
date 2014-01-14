(ns schmetterling.server
  (:use [ring.middleware.resource :only (wrap-resource)]
        [ring.middleware.reload :only (wrap-reload)])
  (:require [clojure.edn :as edn] 
            [clojure.java.io :as io]
            [clojure.string :as string]
            [clojure.pprint :as pprint]
            [org.httpkit.server :as httpkit] 
            [polaris.core :as polaris]
            [schmetterling.source :as source]
            [schmetterling.debug :as debug]))

(def clients (atom []))
(def connection 
  (atom 
   {:connected? false
    :history []}))

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
        value (if (string? string) string (.value string))
        [body message] (string/split value #": ")]
    {:class class
     :line line
     :exception body
     :message message}))

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
          source (source/get-surrounding-def source-file line)]
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
  [channel]
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
      (debug/attach port (make-exception-handler channel))
      (swap! connection assoc :connected? true :port port)
      {:op :connected
       :port port})
    (catch Exception e (println "something wrong with" data e))))

(defn init-client
  [channel data]
  (if (:connected? @connection)
    (debug/set-exception-handler (make-exception-handler channel)))
  (httpkit/send! channel (pr-str (assoc @connection :op :init))))

(defn eval-expression
  [channel {:keys [expression level] :as data}]
  (println "eval:" (str data))
  (try
    (let [form (edn/read-string expression)
          result (debug/reval form level)]
      (swap! connection update-in [:history] conj form)
      (println "result:" result)
      (assoc data
        :result result
        :output (with-out-str (pprint/pprint result))))
    (catch com.sun.jdi.InternalException e 
      (do 
        (debug/continue)
        {:op :internal}))))

(defn continue
  [channel data]
  (let [handler (make-exception-handler channel)]
    (debug/continue)
    (debug/set-exception-handler handler)
    (swap! connection select-keys [:connected? :port :history])
    {:op :continue}))

(defn dispatch
  [channel data]
  (condp = (:op data)
    :init (init-client channel data)
    :connect (connect channel data)
    :eval (eval-expression channel data)
    :continue (continue channel data)
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

(def cli-options
  ;; An option with a required argument
  [["-p" "--port PORT" "Port number"
    :default 16461
    :parse-fn #(Integer/parseInt %)
    :validate [#(< 0 % 0x10000) "Must be a number between 0 and 65536"]]
   ["-i" "--ip HOST_IP" "IP address to bind http server to"
    :default "127.0.0.1"]
    ["-h" "--help"]])

(defn -main
  [& args]
  (let [args (parse-opts args cli-options)
        {:keys [ip port help]} (:options args)
        ]
    (printf "\nLaunching server at: http://%s:%d\n" ip port)
    (httpkit/run-server #'app {:ip ip :port port })))
