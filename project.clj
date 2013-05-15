(defproject schmetterling "0.1.0"
  :description "Web debugger for clojure"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.0"]
                 [leiningen "2.0.0"]
                 [ring "1.1.8"]                 
                 [ritz/ritz-nrepl "0.7.1-SNAPSHOT"]
                 [lein-ritz "0.7.1-SNAPSHOT"]]
  :repl-options {:host "localhost"
                 :port 16461}
  :ring {:handler schmetterling.core/handler
         :init schmetterling.core/init
         :port 22222})