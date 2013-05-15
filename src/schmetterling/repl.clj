(ns schmetterling.repl
  (:require [clojure.tools.nrepl :as repl]
            [ritz.nrepl :as ritz]
            [leiningen.core.project :as project]
            [leiningen.ritz-nrepl :as lein-ritz]))

(defn start-ritz
  [host port]
  (let [project (project/read)]
    (lein-ritz/ritz-nrepl
     (assoc project
       :repl-options
       {:host host :port (str port)}))))

(defn read-values
  [responses]
  (map repl/read-response-value responses))

(defn combine-responses
  [responses]
  (reduce
   (fn [response part]
     (reduce
      (fn [m [k v]]
        (cond
         (= k :id) (assoc m k v)
         (= k :ns) (assoc m k v)
         (= k :value) (update-in m [k] (fnil conj []) v)
         (= k :status) (update-in m [k] (fnil into #{}) v)
         (= k :session) (update-in m [k] (fnil conj #{}) v)
         (string? v) (update-in m [k] #(str % v))
         :else (assoc m k v)))
      response part))
   {} responses))

(defn handle-error
  [response]
  (let [body (:err response)]
    {:status 200 :body body}))

(defn handle-response
  [response]
  (println "RESPONSE" (str (doall response)))
  (cond
   ((:status response) "eval-error") (handle-error response)
   :else (first (:value response))))

(defn wrap-schmetterling
  [namespace action host port]
  (let [remote-handler (str namespace "/" action)
        server (Thread. #(start-ritz host port))
        connection (atom nil)]
    (.start server)
    (fn [request]
      (try
        (do
          (if-not @connection
            (reset! connection (repl/connect :port port)))
          (let [pruned (dissoc request :body)
                required (str "(require :reload '" namespace ")")
                code (str "(" remote-handler " " (str pruned) ")")
                response (-> (repl/client @connection 1000)
                             (repl/message {:op "eval" :code (str required code)})
                             (read-values)
                             (combine-responses))]
            (handle-response response)))
        (catch java.net.ConnectException failed-connection
          (require :reload (symbol namespace))
          (update-in
           ((ns-resolve (symbol namespace) (symbol action)) request)
           [:body] #(str "Schmetterling still emerging... " %)))))))