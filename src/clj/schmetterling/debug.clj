(ns schmetterling.debug
  (:require [clojure.edn :as edn] 
            [cdt.ui :as c]
            [cdt.events :as ce]
            [cdt.reval :as cr]
            [cdt.utils :as cu]))

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

(defn invoke-remote-method
  [remote thread method-name args]
  (let [type (.referenceType remote)
        methods (.allMethods type)
        matching (first (drop-while #(not= (.name %) method-name) methods))]
    (.invokeMethod remote thread matching args 0)))

(defn find-locals
  [thread frame]
  (try
    (cr/local-names thread frame)
    (catch Exception e [])))

(defn source-path
  [thread frame]
  (try
    (cu/get-source-path thread frame)
    (catch Exception e nil)))

(defn read-file-from-jar
  [jar path]
  (let [zip (java.util.zip.ZipFile. jar)
        stream (.getInputStream zip (.getEntry zip path))]
    (slurp stream)))

(defn get-source
  [thread frame]
  (try
    (let [{:keys [jar name]} (cu/get-source thread frame)]
      (if jar
        (read-file-from-jar jar name)
        (slurp name)))
    (catch Exception e nil)))

(defn break-on-exception
  [handler]
  (fn [e]
    (println e)
    (try
      (let [thread (ce/get-thread-from-event e)
            stack (c/get-frames thread)
            filenames (map (partial source-path thread) (range))
            locals (map (partial find-locals thread) (range))
            sources (map (partial get-source thread) (range))]
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

(defn attach
  ([port handler] (attach port handler Exception))
  ([port handler pattern] (attach port handler pattern :all))
  ([port handler pattern occasion]
     (c/cdt-attach port)
     (exclude-exceptions default-exclusions)
     (set-exception-handler handler)
     (c/set-catch pattern occasion)))

(defn reval
  [expression frame]
  (println frame expression)
  (try 
    (c/safe-reval (c/ct) frame expression true edn/read-string)
    (catch Exception e (println e) (.printStackTrace e))))
