(defproject schmetterling "0.0.5"
  :description "Web debugger for Clojure"
  :url "http://github.com/prismofeverything/schmetterling"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [prismofeverything/cdt "1.2.6.4"]
                 [http-kit "2.1.12"]
                 [polaris "0.0.4"]
                 [ring "1.2.0"]
                 [org.clojure/clojurescript "0.0-1909"]
                 [org.clojure/core.async "0.1.242.0-44b1e3-alpha"]
                 [domina "1.0.2"]
                 [com.keminglabs/singult "0.1.6"]
                 [org.clojure/tools.cli "0.3.1"]
                 [org.clojure/google-closure-library-third-party "0.0-2029"]]
  :plugins [[lein-cljsbuild "0.3.3"]]
  :source-paths ["src/clj"]
  :resource-paths ~(if-let [tools (System/getenv "JAVA_TOOLS_JAR")]
                     ["resources" tools]
                     ["resources"])
  :min-lein-version "2.0.0"
  :repl-options {:host "localhost"
                 :port 11911}
  :main schmetterling.server
  :cljsbuild 
  {:builds 
   {:dev 
    {:libs ["singult"]
     :source-paths ["src/cljs"]  
     :compiler 
     {:externs ["resources/public/js/externs/greensock.externs.js"]
      :optimizations :whitespace
      :output-to  "resources/public/js/app/schmetterling.js"
      :output-dir "resources/public/js/app/out"}}}})
