(ns schmetterling.debug
  (:require [clojure.edn :as edn] 
            [cdt.ui :as c]
            [cdt.events :as ce]
            [cdt.reval :as cr]
            [cdt.utils :as cu]
            [schmetterling.source :as source]))

(def default-exclusions 
  ["org.h2.*" 
   "java.net.URLClassLoader*"
   "clojure.lang.Util"
   "sun.misc.BASE64Decoder"
   "java.lang.Integer"
   "java.lang.Thread"
   "sun.security.provider.DSA"
   "sun.security.rsa.RSAPadding"
   "sun.security.x509.X509CertImpl"])

(defn exclude-exceptions
  [filters]
  (apply ce/add-catch-exclusion-filter-strings filters))

(defn clear-exclusions
  []
  (ce/remove-catch-exclusion-filter-strings))

(defn invoke-remote-method
  [remote thread method-name args]
  (try
    (let [type (.referenceType remote)
          methods (.allMethods type)
          matching (first (drop-while #(not= (.name %) method-name) methods))]
      (.invokeMethod remote thread matching args 0))
    (catch com.sun.jdi.InternalException ie (format "Exception while invoking remote method! %s" remote))))

(defn find-locals
  [thread frame]
  (try
    (cr/local-names thread frame)
    (catch Exception e [])))

(defn break-on-exception
  [handler]
  (fn [e]
    (println e)
    (try
      (let [thread (ce/get-thread-from-event e)
            stack (c/get-frames thread)
            filenames (map (partial source/source-path thread) (range))
            locals (map (partial find-locals thread) (range))
            sources (map (partial source/get-source-line-reader thread) (range))]
        (handler {:e e
                  :thread thread
                  :stack stack
                  :filenames filenames
                  :locals locals
                  :sources sources}))
      (catch Exception ex (println ex) (.printStackTrace ex)))))

(defn set-exception-handler
  [handler]
  (c/set-handler ce/exception-handler (break-on-exception handler)))

(defn watch-exceptions
  ([handler] (watch-exceptions handler Exception))
  ([handler pattern] (watch-exceptions handler pattern :all))
  ([handler pattern occasion]
     (set-exception-handler handler)
     (c/set-catch pattern occasion)))

(defn attach
  ([port handler] (attach port handler Exception))
  ([port handler pattern] (attach port handler pattern :all))
  ([port handler pattern occasion]
     (c/cdt-attach port)
     (exclude-exceptions default-exclusions)
     (watch-exceptions handler pattern occasion)))

(defn reval
  [expression frame]
  (println "eval: " expression "at frame" frame)
  (c/safe-reval (c/ct) frame expression true edn/read-string))

(defn continue
  []
  (cu/continue-vm))
