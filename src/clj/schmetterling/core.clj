(ns schmetterling.core
  (:use [ring.middleware.resource :only (wrap-resource)]
        [ring.middleware.reload :only (wrap-reload)])
  (:require [clojure.edn :as edn] 
            [clojure.java.io :as io]
            [org.httpkit.server :as httpkit] 
            [polaris.core :as polaris]
            [schmetterling.debug :as debug]))

(def client (atom nil))

(defn index
  [request]
  {:status 200 
   :headers {"Content-Type" "text/html"}
   :body (slurp (io/resource "public/index.html"))})

(defn handler 
  [request]
  (httpkit/with-channel request channel
    (httpkit/on-close channel (fn [status] (println "Socket closing:" status)))
    (if (httpkit/websocket? channel)
      (httpkit/on-receive 
       channel
       (fn [raw]
         (println "Received message:" raw)
         (let [data (edn/read-string raw)]
           (if-not (= channel @client)
             (swap! client (constantly channel)))
           (httpkit/send! @client (pr-str data)))))
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
