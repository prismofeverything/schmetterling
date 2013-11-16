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
occur in this process.

When an exception arises in the observed process it will break and control
will be passed to Schmetterling.  A stacktrace will appear and provide an
interactive repl for each frame in the stacktrace.

## License

Copyright © 2013 Ryan Spangler

Distributed under the Eclipse Public License, the same as Clojure.
