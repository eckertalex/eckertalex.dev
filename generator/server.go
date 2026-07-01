package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func Serve(port int) error {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		p := filepath.Join(distDir, filepath.FromSlash(r.URL.Path))
		if info, err := os.Stat(p); err == nil && info.IsDir() {
			p = filepath.Join(p, "index.html")
		}

		if _, err := os.Stat(p); err != nil {
			body, rerr := os.ReadFile(filepath.Join(distDir, "404.html"))
			if rerr != nil {
				http.NotFound(w, r)
				return
			}
			w.Header().Set("Content-Type", "text/html; charset=utf-8")
			w.WriteHeader(http.StatusNotFound)
			w.Write(body)
			return
		}

		http.ServeFile(w, r, p)
	})

	log.Printf("preview at http://localhost:%d", port)
	return http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}
