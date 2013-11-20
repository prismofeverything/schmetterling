(ns schmetterling.source
  (:require [clojure.java.io :as io]
            [cdt.utils :as cu]))

(defn source-path
  [thread frame]
  (try
    (cu/get-source-path thread frame)
    (catch Exception e nil)))

(defn line-reader
  [stream]
  (java.io.LineNumberReader. (java.io.InputStreamReader. stream)))

(defn stream-from-jar
  [jar path]
  (let [zip (java.util.zip.ZipFile. jar)
        stream (.getInputStream zip (.getEntry zip path))]
    stream))

(defn get-source-line-reader
  [thread frame]
  (try
    (let [{:keys [jar name]} (cu/get-source thread frame)
          stream (if jar
                   (stream-from-jar jar name)
                   (io/input-stream name))]
      (line-reader stream))
    (catch Exception e nil)))

(defn read-line-number
  [source line]
  (.setLineNumber source line)
  (.readLine source))

(def def-beginning #"^\(def")

(defn seek-to-line
  [source line]
  (loop [line line
         lines []]
    (if (zero? line)
      [lines source]
      (recur (dec line) (conj lines (.readLine source))))))

(defn get-surrounding-def
  [source line]
  (try
    (let [line (dec line)
          [lines source] (seek-to-line source line)
          exception-line (.readLine source)
          previous (if (re-find def-beginning exception-line)
                     (list)
                     (loop [previous (list)
                            line (dec line)]
                       (let [source-line (nth lines line)
                             previous (cons source-line previous)]
                         (if (re-find def-beginning source-line)
                           previous
                           (recur previous (dec line))))))
          subsequent (loop [subsequent []]
                       (let [source-line (.readLine source)]
                         (if (or (not source-line) (re-find def-beginning source-line))
                           subsequent
                           (recur (conj subsequent source-line)))))]
      {:previous previous
       :highlight exception-line
       :subsequent subsequent})
    (catch Exception e {:highlight "no source found"})))

(defn read-file-from-jar
  [jar path]
  (slurp (stream-from-jar jar path)))

(defn get-source
  [thread frame]
  (try
    (let [{:keys [jar name]} (cu/get-source thread frame)]
      (if jar
        (read-file-from-jar jar name)
        (slurp name)))
    (catch Exception e nil)))

