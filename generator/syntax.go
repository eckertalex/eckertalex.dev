package main

import (
	"os"
	"path/filepath"
	"strings"

	"github.com/alecthomas/chroma/v2"
	chromahtml "github.com/alecthomas/chroma/v2/formatters/html"
	"github.com/alecthomas/chroma/v2/styles"
)

func writeSyntaxCSS() error {
	formatter := chromahtml.New(chromahtml.WithClasses(true))

	light, err := formatterCSS(formatter, styles.Get("rose-pine-dawn"), "")
	if err != nil {
		return err
	}

	dark, err := formatterCSS(formatter, styles.Get("rose-pine"), `:root[data-theme="dark"] `)
	if err != nil {
		return err
	}
	darkSystem, err := formatterCSS(formatter, styles.Get("rose-pine"),
		`:root:not([data-theme="light"]):not([data-theme="dark"]) `)
	if err != nil {
		return err
	}

	var out strings.Builder
	out.WriteString(light)
	out.WriteString(dark)
	out.WriteString("@media (prefers-color-scheme: dark) {\n")
	out.WriteString(darkSystem)
	out.WriteString("}\n")

	return os.WriteFile(filepath.Join(distDir, "syntax.css"), []byte(out.String()), 0o644)
}

// formatterCSS renders a Chroma style to CSS and prefixes every ".chroma"
// and ".bg" selector with scope, so the same token CSS can be scoped to a
// theme selector (e.g. `:root[data-theme="dark"] `).
func formatterCSS(formatter *chromahtml.Formatter, style *chroma.Style, scope string) (string, error) {
	var buf strings.Builder
	if err := formatter.WriteCSS(&buf, style); err != nil {
		return "", err
	}
	if scope == "" {
		return buf.String(), nil
	}
	css := strings.ReplaceAll(buf.String(), ".chroma", scope+".chroma")
	css = strings.ReplaceAll(css, ".bg", scope+".bg")
	return css, nil
}
