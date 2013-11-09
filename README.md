# schmetterling

Debug running clojure processes from the browser!

## Usage

To start a Schmetterling process:

    lein run
    
Then connect to an existing process by providing its dt_socket port.  When an exception arises in the process being watched it will break and control will be passed to Schmetterling.  

There is a repl for each frame in the stacktrace.

## License

Copyright © 2013 Ryan Spangler

Distributed under the Eclipse Public License, the same as Clojure.
