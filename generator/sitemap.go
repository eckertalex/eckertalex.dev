package main

import (
	"encoding/xml"
	"os"
	"path/filepath"
)

type urlEntry struct {
	Loc     string `xml:"loc"`
	Lastmod string `xml:"lastmod,omitempty"`
}

type urlset struct {
	XMLName xml.Name   `xml:"urlset"`
	XMLNS   string     `xml:"xmlns,attr"`
	URLs    []urlEntry `xml:"url"`
}

func writeSitemap(c *Collection) error {
	var entries []urlEntry
	add := func(p *Page) {
		lastmod := p.Frontmatter.Updated
		if lastmod == "" {
			lastmod = p.Frontmatter.Published
		}
		if iso, err := formatRFC3339(lastmod); err == nil {
			lastmod = iso
		}
		entries = append(entries, urlEntry{Loc: Site.URL + p.CanonicalPath, Lastmod: lastmod})
	}

	for _, p := range c.Indexes {
		add(p)
	}
	for _, p := range c.Pages {
		if p.CanonicalPath == "/404.html" {
			continue
		}
		add(p)
	}
	for _, p := range c.Posts {
		add(p)
	}

	set := urlset{XMLNS: "http://www.sitemaps.org/schemas/sitemap/0.9", URLs: entries}
	buf, err := xml.MarshalIndent(set, "", "\t")
	if err != nil {
		return err
	}

	out := append([]byte(xml.Header), buf...)
	return os.WriteFile(filepath.Join(distDir, "sitemap.xml"), out, 0o644)
}

func writeRobots() error {
	body := "User-agent: *\nAllow: /\n\nSitemap: " + Site.URL + "/sitemap.xml\n"
	return os.WriteFile(filepath.Join(distDir, "robots.txt"), []byte(body), 0o644)
}
