(ns schmetterling.repl
  (:require [clojure.tools.nrepl :as repl]
            [ritz.nrepl :as ritz]
            [ritz.debugger.break :as break]
            [leiningen.core.project :as project]
            [leiningen.ritz-nrepl :as lein-ritz]))

(defn start-ritz
  [host port]
  (let [project (project/read)]
    (lein-ritz/ritz-nrepl
     (assoc project
       :repl-options
       {:host host :port (str port)}))))

(defn schmetterling-request?
  [request prefix]
  ())

(defn read-values
  [responses]
  (map repl/read-response-value responses))

(defn- ^ThreadGroup get-root-group
  [^java.lang.ThreadGroup tg]
  (if-let [parent (.getParent tg)]
    (recur parent)
    tg))

(defn- get-thread-list
  []
  (let [rg (get-root-group (.getThreadGroup (Thread/currentThread)))
        arr (make-array Thread (.activeCount rg))]
    (.enumerate rg arr true)
    (seq arr)))

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

(defn message
  [connection msg]
  (println "SENDING" (str msg))
  (-> (repl/client connection 1000)
      (repl/message msg)
      (read-values)))

(defn print-response
  [response]
  (doseq [res response]
    (println "FULL RESPONSE" res)))

(defn handle-error
  [response connection]
  (println "CONNECTION" (str connection))
  (let [;; body (:err response)
        thread-id "5482"

        ;; threads (get-thread-list)
        ;; _ (doseq [thread threads]
        ;;     (println "THREAD" (.getId thread) (.getName thread)))

        info (message
              connection
              {:op "debugger-info"
               :thread-id thread-id})
        _ (print-response info)

        frame (message
               connection
               {:op "frame-source"
                :frame-number "1"
                :thread-id thread-id})]
    (print-response frame)
    {:status 200 :body "ERROR"}))

(defn handle-response
  [response connection]
  (println "RESPONSE" (str (doall response)))
  (if-let [out (:out response)]
    (println out))
  (cond
   (empty? response) (handle-error response connection)
   ((:status response) "eval-error") (handle-error response connection)
   :else (first (:value response))))

(defn wrap-schmetterling
  ([namespace] (wrap-schmetterling namespace 'handler))
  ([namespace action] (wrap-schmetterling namespace action "localhost"))
  ([namespace action host] (wrap-schmetterling namespace action host 15351))
  ([namespace action host port] (wrap-schmetterling namespace action host port "/_schmetterling"))
  ([namespace action host port prefix]
     (let [remote-handler (symbol (str namespace "/" action))
           server (Thread. #(start-ritz host port))
           connection (atom nil)]
       (.start server)
       (fn [request]
         (if (= "/favicon.ico" (:uri request))
           {:status 200 :body ""}
           (try
             (do
               (if-not @connection
                 (let [connect (repl/connect :port port)
                       response (message connect {:op "break-on-exception"})]
                   (doseq [res response]
                     (println "BREAK ON EXCEPTION RESPONSE" res))
                   (reset! connection connect)))
               (let [pruned (dissoc request :body)
                     required `(require :reload '~namespace)
                     code (list remote-handler pruned)
                     _ (println "CODE" (pr code))
                     response (message @connection {:op "eval" :code (pr-str `(do ~required ~code))})
                     _ (doseq [res response]
                         (println "RAW RESPONSE" (str res)))
                     response (combine-responses response)]
                 (handle-response response @connection)))
             (catch java.net.ConnectException failed-connection
               (require :reload (symbol namespace))
               (update-in
                ((ns-resolve (symbol namespace) (symbol action)) request)
                [:body] #(str "Schmetterling still emerging... " %)))))))))