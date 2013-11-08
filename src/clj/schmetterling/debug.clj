(ns schmetterling.debug
  (:require [cdt.ui :as c]
            [cdt.events :as ce]))

(defn break-on-exception
  [handler]
  (fn [e]
    (try
      (let [stack (c/get-frames (ce/get-thread-from-event e))]
        (handler e stack))
      (catch Exception ex (println ex) (.printStackTrace ex)))))

(defn attach
  [port handler]
  (c/cdt-attach port)
  (c/set-handler ce/exception-handler (break-on-exception handler))
  (c/set-catch Exception :all))
