(ns schmetterling.inner)

(defn inner-handler
  [request]
  (let [a 5
        b 1
        q (/ a b)]
    (println "!!!" q)
    {:status 200 :body (str q)}))

(def handler inner-handler)