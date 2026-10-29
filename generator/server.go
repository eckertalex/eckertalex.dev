package main

import (
	"bytes"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"slices"
	"sync"
	"time"
)

// Injected into served HTML only, so dist/ never contains it.
const reloadScript = `<script>new EventSource("/_reload").onmessage = () => location.reload()</script>`

type server struct {
	// Held for writing while dist/ is rebuilt, so requests never see it half-written.
	dist sync.RWMutex

	clientsMu sync.Mutex
	clients   map[chan struct{}]struct{}
}

func Serve(port int) error {
	s := &server{clients: map[chan struct{}]struct{}{}}
	go s.watch()

	mux := http.NewServeMux()
	mux.HandleFunc("/_reload", s.reload)
	mux.HandleFunc("/", s.files)

	log.Printf("preview at http://localhost:%d", port)
	return http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}

func (s *server) files(w http.ResponseWriter, r *http.Request) {
	s.dist.RLock()
	defer s.dist.RUnlock()

	p := filepath.Join(distDir, filepath.FromSlash(r.URL.Path))
	if info, err := os.Stat(p); err == nil && info.IsDir() {
		p = filepath.Join(p, "index.html")
	}

	status := http.StatusOK
	if _, err := os.Stat(p); err != nil {
		p = filepath.Join(distDir, "404.html")
		status = http.StatusNotFound
	}

	if filepath.Ext(p) != ".html" {
		http.ServeFile(w, r, p)
		return
	}

	body, err := os.ReadFile(p)
	if err != nil {
		http.NotFound(w, r)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(status)
	w.Write(injectReload(body))
}

func injectReload(html []byte) []byte {
	i := bytes.LastIndex(html, []byte("</body>"))
	if i < 0 {
		return append(html, reloadScript...)
	}
	return slices.Concat(html[:i], []byte(reloadScript), html[i:])
}

// reload holds a server-sent events stream open until the next rebuild.
func (s *server) reload(w http.ResponseWriter, r *http.Request) {
	ch := make(chan struct{}, 1)
	s.clientsMu.Lock()
	s.clients[ch] = struct{}{}
	s.clientsMu.Unlock()
	defer func() {
		s.clientsMu.Lock()
		delete(s.clients, ch)
		s.clientsMu.Unlock()
	}()

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	http.NewResponseController(w).Flush()

	select {
	case <-ch:
		fmt.Fprint(w, "data: reload\n\n")
	case <-r.Context().Done():
	}
}

// watch polls the site's inputs and rebuilds when anything changes. A full
// build takes a fraction of a second, so there is nothing to gain from
// tracking which files changed.
func (s *server) watch() {
	last := snapshot()
	for range time.Tick(250 * time.Millisecond) {
		now := snapshot()
		if now == last {
			continue
		}
		last = now

		s.dist.Lock()
		err := Build(false)
		s.dist.Unlock()
		if err != nil {
			log.Print(err)
			continue
		}
		log.Print("rebuilt")

		s.clientsMu.Lock()
		for ch := range s.clients {
			select {
			case ch <- struct{}{}:
			default:
			}
		}
		s.clientsMu.Unlock()
	}
}

type stamp struct {
	newest int64 // newest mtime, catches edits
	files  int   // entry count, catches deletes
}

func snapshot() stamp {
	var st stamp
	for _, root := range []string{contentDir, "public", "config.json"} {
		filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
			if err != nil {
				return nil
			}
			info, err := d.Info()
			if err != nil {
				return nil
			}
			st.files++
			st.newest = max(st.newest, info.ModTime().UnixNano())
			return nil
		})
	}
	return st
}
