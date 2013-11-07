goog.provide('schmetterling.connect');
goog.require('cljs.core');
goog.require('clojure.browser.repl');
schmetterling.connect.connect = (function connect(){return clojure.browser.repl.connect.call(null,"http://localhost:9000/repl");
});
