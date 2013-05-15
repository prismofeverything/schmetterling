(ns schmetterling.ritz
  (:require [clojure.tools.nrepl :as repl]
            [leiningen.core.project :as project]
            [leiningen.ritz-nrepl :as lein-ritz]))

(defn start-ritz
  [host port]
  (let [project (project/read)]
    (lein-ritz/ritz-nrepl
     (assoc project
       :repl-options
       {:host host :port (str port)}))))

(defn wrap-schmetterling
  [handler host port]
  (let [server (Thread. #(start-ritz host port))]
    (.start server)
    (fn [request]
      (with-open [connection (repl/connect :port port)]
        (let [response (-> (repl/client connection 1000)
                           (repl/message {:op "eval" :code "(+ 5 5 5)"})
                           (repl/response-values))]
          {:status 200 :body (str response)})))))

        ;; (handler request)))))
