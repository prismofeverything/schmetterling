(ns schmetterling.debug
  (:require [ritz.debugger.break :as break]
            [ritz.debugger.inspect :as inspect]
            [ritz.logging :as log]
            [ritz.jpda.jdi :as jdi]
            [ritz.jpda.jdi-vm :as jdi-vm]
            [ritz.jpda.jdi-clj :as jdi-clj]
            [ritz.jpda.debug :as debug]
            [leiningen.core.classpath :as classpath]
            [leiningen.core.project :as project]))

(defn reference-fields
  [object-reference]
  (let [reference-type (.referenceType object-reference)
        fields (.allFields reference-type)]
    fields))

(defn handle-exception
  [context message]
  (println (str context))
  {:status 200 :body (str "ERROR: " message)})

(defn signal
  [context message]
  (try 
    (let [response (jdi-clj/control-eval-to-value context message)
          value (read-string (.value response))]
      (println "RESPONSE" (str value))
      value)
    (catch com.sun.jdi.InvocationException e
      (handle-exception context message))))

(defn wrap-schmetterling
  ([namespace] (wrap-schmetterling namespace 'handler))
  ([namespace action] (wrap-schmetterling namespace action "localhost"))
  ([namespace action host] (wrap-schmetterling namespace action host 15351))
  ([namespace action host port] (wrap-schmetterling namespace action host port "/_schmetterling"))
  ([namespace action host port prefix]
     (log/set-level :trace)
     (let [remote-handler (symbol (str namespace "/" action))
           project (project/read)
           context (debug/launch-vm
                    {;; :classpath (classpath/get-classpath project)
                     :main `@(promise)
                     :jvm-opts ["-Djava.awt.headless=true"
                                "-XX:+TieredCompilation"]})
           connection (atom nil)]
       (jdi-vm/vm-resume context)
       (jdi/enable-exception-request-states (:vm context))
       (println "THREADS" (str (debug/threads context)))
       (fn [request]
         (if (= "/favicon.ico" (:uri request))
           {:status 200 :body ""}
           (let [pruned (dissoc request :body)
                 required `(require :reload '~namespace)
                 code `(pr-str (~remote-handler ~pruned))
                 _ (println "CODE" (pr-str code))
                 response (signal context `(do ~required ~code))]
             response))))))
