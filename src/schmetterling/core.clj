(ns schmetterling.core
  (:require [schmetterling.debug :as debug]))

(declare handler)

(defn init
  []
  (def handler (debug/wrap-schmetterling 'schmetterling.inner 'handler "localhost" 15351)))

(def successful-response
  ({:id "bc582548-18e3-4a83-92d3-42579b5a6b5d"
    :out "!!! 5/3"
    :session "db237ba1-c88b-40c0-b118-8e096bb6cbc6"}
   {:id "bc582548-18e3-4a83-92d3-42579b5a6b5d"
    :ns "user",
    :session "db237ba1-c88b-40c0-b118-8e096bb6cbc6"
    :value {:status 200, :body "5/3"}}
   {:id "bc582548-18e3-4a83-92d3-42579b5a6b5d"
    :session "db237ba1-c88b-40c0-b118-8e096bb6cbc6"
    :status ["done"]}))

(def error-response
  ({:ex "class java.lang.ArithmeticException"
    :id "f04d83c5-a30d-4d00-8b74-70747277b9db"
    :root-ex "class java.lang.ArithmeticException"
    :session "022cb69a-331d-443e-9fa9-092678f67e7c"
    :status ["eval-error"]}
   {:err "ArithmeticException Divide by zero  clojure.lang.Numbers.divide (Numbers.java:156)"
    :id "f04d83c5-a30d-4d00-8b74-70747277b9db"
    :session "022cb69a-331d-443e-9fa9-092678f67e7c"}
   {:id "f04d83c5-a30d-4d00-8b74-70747277b9db"
    :session "022cb69a-331d-443e-9fa9-092678f67e7c"
    :status ["done"]}))