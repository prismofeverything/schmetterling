# schmetterling

Debug running clojure processes from the browser!

## Usage

To start a Schmetterling process:

    lein run
    
Browse to the Schmetterling frontend at [localhost:16461](localhost:16461), then connect to an existing process by providing its dt_socket port.  Schmetterling will wait for exceptions to occur in this process.

When an exception arises in the process being watched it will break and control will be passed to Schmetterling.  A stacktrace will appear and there is a repl for each frame in the stacktrace.

## License

Copyright © 2013 Ryan Spangler

Distributed under the Eclipse Public License, the same as Clojure.
