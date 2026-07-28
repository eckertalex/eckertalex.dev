package main

import (
	"encoding/xml"
	"fmt"
	"os"
	"path/filepath"
	"time"
)

type link struct {
	Href string `xml:"href,attr"`
	Rel  string `xml:"rel,attr,omitempty"`
	Type string `xml:"type,attr,omitempty"`
}

type person struct {
	Name string `xml:"name"`
}

type entry struct {
	Title     string `xml:"title"`
	Link      link   `xml:"link"`
	ID        string `xml:"id"`
	Published string `xml:"published"`
	Updated   string `xml:"updated"`
	Summary   string `xml:"summary,omitempty"`
}

type feed struct {
	XMLName xml.Name `xml:"feed"`
	XMLNS   string   `xml:"xmlns,attr"`
	Title   string   `xml:"title"`
	Link    []link   `xml:"link"`
	ID      string   `xml:"id"`
	Updated string   `xml:"updated"`
	Author  person   `xml:"author"`
	Entries []entry  `xml:"entry"`
}

func formatRFC3339(t time.Time) string {
	return t.UTC().Format(time.RFC3339)
}

func writeAtom(collection *Collection) error {
	entries := make([]entry, 0, len(collection.Posts))
	var latest time.Time

	for _, p := range collection.Posts {
		postLink := Site.URL + "/blog/" + p.Slug + "/"

		if p.LastModified().After(latest) {
			latest = p.LastModified()
		}

		entries = append(entries, entry{
			Title: p.Frontmatter.Title,
			Link: link{
				Href: postLink,
				Rel:  "alternate",
				Type: "text/html",
			},
			ID:        postLink,
			Published: formatRFC3339(p.PublishedAt),
			Updated:   formatRFC3339(p.LastModified()),
			Summary:   p.Frontmatter.Description,
		})
	}

	if latest.IsZero() {
		latest = time.Now()
	}

	feed := feed{
		XMLNS: "http://www.w3.org/2005/Atom",
		Title: fmt.Sprintf("%s's Blog", Site.Name),
		ID:    Site.URL + "/",
		Link: []link{
			{
				Href: Site.URL + "/atom.xml",
				Rel:  "self",
				Type: "application/atom+xml",
			},
			{
				Href: Site.URL + "/",
				Rel:  "alternate",
				Type: "text/html",
			},
		},
		Updated: formatRFC3339(latest),
		Author: person{
			Name: Site.Author,
		},
		Entries: entries,
	}

	buf, err := xml.MarshalIndent(feed, "", "\t")
	if err != nil {
		return err
	}

	out := append([]byte(xml.Header), buf...)
	return os.WriteFile(filepath.Join(distDir, "atom.xml"), out, 0o644)
}
