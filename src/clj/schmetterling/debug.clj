(ns schmetterling.debug
  (:require [clojure.edn :as edn] 
            [cdt.ui :as c]
            [cdt.events :as ce]))

(def default-exclusions 
  ["org.h2.*" 
   "java.net.URLClassLoader*"
   "clojure.lang.Util"
   "sun.misc.BASE64Decoder"
   "java.lang.Integer"
   "sun.security.provider.DSA"
   "sun.security.rsa.RSAPadding"
   "sun.security.x509.X509CertImpl"])

(defn exclude-exceptions
  [filters]
  (apply c/set-catch-exclusion-filter-strings filters))

(defn break-on-exception
  [handler]
  (fn [e]
    (println e)
    (try
      (let [stack (c/get-frames (ce/get-thread-from-event e))]
        (handler e stack))
      (catch Exception ex (println ex) (.printStackTrace ex)))))

(defn attach
  ([port handler] (attach port handler Exception))
  ([port handler pattern] (attach port handler pattern :all))
  ([port handler pattern occasion]
     (c/cdt-attach port)
     (exclude-exceptions default-exclusions)
     (c/set-handler ce/exception-handler (break-on-exception handler))
     (c/set-catch pattern occasion)))

(defn reval
  [expression frame]
  (println frame expression)
  (c/safe-reval (c/ct) frame expression true edn/read-string))
