(ns schmetterling.core)

(defn debugger
  []
  (throw (java.lang.Exception. "Schmetterling debugger invoked!")))
