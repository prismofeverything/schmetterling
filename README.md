# schmetterling

Debug ring handlers from inside the browser!

## Usage

```clj
(wrap-schmetterling 'handler.namespace 'handler)
```

Then in your handler: (/ 1 0) and enjoy the seamless debugging!

## License

Copyright © 2013 Ryan Spangler

Distributed under the Eclipse Public License, the same as Clojure.
