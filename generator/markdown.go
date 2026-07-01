package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"strings"

	chromahtml "github.com/alecthomas/chroma/v2/formatters/html"
	"github.com/yuin/goldmark"
	highlighting "github.com/yuin/goldmark-highlighting/v2"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"
	"go.abhg.dev/goldmark/anchor"
)

func parseFrontmatter(raw, filePath string) (Frontmatter, string, error) {
	if !strings.HasPrefix(raw, "---") {
		return Frontmatter{}, "", fmt.Errorf("%s: missing frontmatter", filePath)
	}

	end := strings.Index(raw[3:], "\n---")
	if end == -1 {
		return Frontmatter{}, "", fmt.Errorf("%s: unclosed frontmatter", filePath)
	}

	block := strings.TrimSpace(raw[3 : 3+end])
	body := strings.TrimLeft(raw[3+end+4:], "\n\r\t")

	var fm Frontmatter
	if err := json.Unmarshal([]byte(block), &fm); err != nil {
		return Frontmatter{}, "", fmt.Errorf("%s: invalid frontmatter: %w", filePath, err)
	}
	if fm.Title == "" {
		return Frontmatter{}, "", fmt.Errorf("%s: missing title", filePath)
	}
	if fm.Published == "" {
		return Frontmatter{}, "", fmt.Errorf("%s: missing published", filePath)
	}

	return fm, body, nil
}

var md = goldmark.New(
	goldmark.WithExtensions(
		extension.GFM,
		extension.Footnote,
		// Emit CSS classes (not inline styles); colors come from the
		// Chroma-generated syntax.css (see writeSyntaxCSS) and follow light/dark.
		highlighting.NewHighlighting(
			highlighting.WithFormatOptions(chromahtml.WithClasses(true)),
		),
		&anchor.Extender{
			Texter:   anchor.Text("#"),
			Position: anchor.After,
		},
	),
	goldmark.WithParserOptions(parser.WithAutoHeadingID()),
	goldmark.WithRendererOptions(html.WithUnsafe()),
)

func renderMarkdown(src string) (template.HTML, error) {
	var buf bytes.Buffer
	if err := md.Convert([]byte(src), &buf); err != nil {
		return "", err
	}

	return template.HTML(buf.String()), nil
}
