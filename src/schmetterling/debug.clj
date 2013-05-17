(ns schmetterling.debug
  (:require [ritz.debugger.break :as break]
            [ritz.debugger.connection :as connection]
            [ritz.debugger.exception-filters :as exception-filters]
            [ritz.logging :as log]
            [ritz.jpda.jdi :as jdi]
            [ritz.jpda.jdi-vm :as jdi-vm]
            [ritz.jpda.jdi-clj :as jdi-clj]
            [ritz.jpda.debug :as debug]
            [leiningen.core.classpath :as classpath]
            [leiningen.core.project :as project]))

(def ritz-connection (atom {}))

(defn make-connection
  [context]
  (let [connection (assoc connection/default-connection
                     :vm-context context
                     :type :ring)]
    (exception-filters/exception-filters-set!
     connection
     (or (exception-filters/read-exception-filters)
         exception-filters/default-exception-filters))
    connection))

(defn break-on-exception
  [connection flag]
  (if flag
    (do
      (swap!
       (:debug connection)
       assoc-in [:breakpoint :msg] (-> connection :msg))
      (swap!
       (:debug connection)
       assoc-in [:breakpoint :break] flag)
      (jdi/enable-exception-request-states (-> connection :vm-context :vm)))
    (do
      (jdi/disable-exception-request-states (-> connection :vm-context :vm))
      (swap! (:debug connection) assoc-in [:breakpoint :break] flag)))
  (connection/debug-context connection))

(defn thread-data
  [^Thread thread]
  {:id (.getId thread)
   :name (.getName thread)
   :state (.getState thread)
   :alive? (.isAlive thread)
   :interrupted? (.isInterrupted thread)})

(defn stacktrace-frames
  [frames start]
  (map
   #(list
     %1
     (format "%s (%s:%s)" (:function %2) (:source %2) (:line %2))
     (list :stratum (:stratum %2)))
   (iterate inc start)
   frames))

(defn debugger-data
  [{:keys [thread thread-id condition event restarts] :as level-info}
   level frame-min frame-max]
  `("exception" ~(list (:message condition "No message")
                       (:type condition ""))
    "thread-id" ~thread-id
    "frames" ~(vec (stacktrace-frames (debug/build-backtrace thread) frame-min))
    "restarts" ~(vec (map
                      (fn [{:keys [name description]}]
                        (list name description))
                      restarts))
    "level" ~level))

(defmethod debug/display-break-level :ring
  [{:keys [vm-context] :as connection}
   {:keys [thread thread-id condition event restarts] :as level-info}
   level]
  (log/trace "ring display-break-level: thread-id %s level %s" thread-id level)
  (when-let [debug-context (connection/debug-context connection)]
    (let [value (debugger-data level-info level 0 100)]
      (log/trace (str "DEBUGGER INFO: " value)))))

(defn handle-exception
  [connection message]
  (let [breaks (break/break-threads connection)]
    (println "CONNECTION" (str connection))
    (doseq [break breaks] (println "BREAK THREAD" break))
    {:status 200 :body (str "ERROR: " message)}))

(defn signal
  [{:keys [vm-context] :as connection} message]
  (try 
    (let [response (jdi-clj/control-eval-to-value vm-context message)
          value (read-string (.value response))]
      (println "RESPONSE" (str value))
      value)
    (catch com.sun.jdi.InvocationException e
      (handle-exception connection message))))

(debug/add-connection-for-event-fn! (fn [_] @ritz-connection))
(debug/add-all-connections-fn! (fn [_] [@ritz-connection]))

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
           connection (make-connection context)]
       (reset! ritz-connection connection)
       (break-on-exception connection true)
       (debug/add-exception-event-request context)
       (jdi-vm/vm-resume context)
       (fn [request]
         (doseq [thread (debug/thread-list context)]
           (println "THREAD" (str thread)))
         (println "event thread" (str (-> context :vm-ev thread-data)))
         (if (= "/favicon.ico" (:uri request))
           {:status 200 :body ""}
           (let [pruned (dissoc request :body)
                 required `(require :reload '~namespace)
                 code `(pr-str (~remote-handler ~pruned))
                 _ (println "CODE" (pr-str code))
                 response (signal connection `(do ~required ~code))]
             response))))))
