package main

import (
	"bytes"
	"html/template"
	"path/filepath"
	"strings"
	"time"
)

type Templates struct {
	partials *template.Template
}

// formatDate turns a "2006-01-02" date into "Jan 2, 2006". On a parse
// failure it returns the input unchanged.
func formatDate(s string) string {
	t, err := time.Parse("2006-01-02", s)
	if err != nil {
		return s
	}
	return t.Format("Jan 2, 2006")
}

var funcMap = template.FuncMap{
	"formatDate": formatDate,
	"rfc3339":    formatRFC3339,
	"absURL":     func(p string) string { return Site.URL + p },
	"hasPrefix":  strings.HasPrefix,
}

func loadTemplates() (*Templates, error) {
	partialGlob := filepath.Join(contentDir, "_partials", "*.html")
	p, err := template.New("root").Funcs(funcMap).ParseGlob(partialGlob)
	if err != nil {
		return nil, err
	}

	return &Templates{partials: p}, nil
}

func (t *Templates) Render(layoutName string, data any) ([]byte, error) {
	// Clone per render so {{ define }} blocks from one layout
	// don't leak into another
	tmpl, err := t.partials.Clone()
	if err != nil {
		return nil, err
	}
	layoutsDir := filepath.Join(contentDir, "_layouts")
	basePath := filepath.Join(layoutsDir, "base.html")
	layoutPath := filepath.Join(layoutsDir, layoutName+".html")
	if _, err := tmpl.ParseFiles(basePath, layoutPath); err != nil {
		return nil, err
	}

	var buf bytes.Buffer
	if err := tmpl.ExecuteTemplate(&buf, "base.html", data); err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}
