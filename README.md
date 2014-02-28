<p align="center">
  <img alt="schmetterling" src="https://raw.github.com/prismofeverything/schmetterling/master/schmetterling.png" />
</p>

# schmetterling

Debug running clojure processes from the browser!

## Usage

To enable a process to be debugged by Schmetterling you must open a `dt_socket`
with the following compiler option:

    -agentlib:jdwp=transport=dt_socket,server=y,suspend=n
    
So with leiningen, in your project.clj add the following line:

    :jvm-opts ["-agentlib:jdwp=transport=dt_socket,server=y,suspend=n"]
    
When the process starts up, something like the following will appear in its
console output:

    Listening for transport dt_socket at address: 54330
    
Note the five digit port number (in this case 54330).

To run Schmetterling, clone the repo and simply

    lein cljsbuild once
    lein run
    
in the Schmetterling root.  Browse to the Schmetterling frontend at
[localhost:16461](localhost:16461), then connect to an existing process by
providing its `dt_socket` port.  Schmetterling is now waiting for exceptions to
occur in this process.  When an exception arises in the observed process it will
break and control will be passed to Schmetterling.

A stacktrace will appear and provide an interactive repl for each frame in the
stacktrace.  Click the triangle next to the frame to open the repl.  There will
be a view of the source with the questionable line highlighted, and under that a
list of available locals.  Type expressions at the prompt and hit enter to
evaluate them in the context of the frozen process.  You can navigate your
expression history with the up and down arrows.  When you are done you can click
the white "continue" button to resume the frozen process.

![stacktrace](https://raw.github.com/prismofeverything/schmetterling/master/stacktrace.png)

### Triggering Schmetterling Manually

If you add Schmetterling as a dependency, you can trigger the debugger from your code.

Add the dependency in your project.clj:

```clj
[schmetterling "0.0.7"]
```    

Then from your code:

```clj
(ns bad.code
  (:use [schmetterling.core :only (debugger)]))
  
(defn destroy-everything
  []
  (let [a 0 b 1]
    (debugger)  ;; <-- This will trigger Schmetterling
    (/ b a)))
```

The stacktrace will appear in your Schmetterling tab, and hopefully you can fix
this egregious violation of universal law.

## Caveats

Schmetterling uses java debugging tools, so you must have the JDK installed, not
just the JRE.  Also, it seems on Java 7 this jar is no longer in the classpath.
If you get an exception like:

    Exception in thread "main" java.lang.ClassNotFoundException: com.sun.jdi.Bootstrap
    
you will have to set an environment variable that points Schmetterling at the
current location of your tools.jar:

    export JAVA_TOOLS_JAR=/path/to/tools/jar/on/your/system/tools.jar

Also, if you trigger an exception in the process being debugged (by a mistyping
a local or just a compounding error) this creates a paradox in spacetime where
it cannot resolve the exception since you are already paused for an exception (I
call this act "exinception").  If this happens you will have to restart
Schmetterling, and possibly the frozen process as well.

If you find a way around this let me know, but as far as I can tell don't do
this.

## License

Copyright © 2013 Ryan Spangler

Distributed under the Eclipse Public License, the same as Clojure.
