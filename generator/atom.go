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

func formatRFC3339(dateStr string) (string, error) {
	t, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		return "", err
	}
	return t.UTC().Format(time.RFC3339), nil
}

func writeAtom(collection *Collection) error {
	entries := make([]entry, 0, len(collection.Posts))
	var latestUpdated string

	for _, p := range collection.Posts {
		postLink := Site.URL + "/blog/" + p.Slug + "/"

		published, err := formatRFC3339(p.Frontmatter.Published)
		if err != nil {
			return err
		}

		updated := published
		if p.Frontmatter.Updated != "" {
			updated, err = formatRFC3339(p.Frontmatter.Updated)
			if err != nil {
				return err
			}
		}

		if updated > latestUpdated {
			latestUpdated = updated
		}

		entries = append(entries, entry{
			Title: p.Frontmatter.Title,
			Link: link{
				Href: postLink,
				Rel:  "alternate",
				Type: "text/html",
			},
			ID:        postLink,
			Published: published,
			Updated:   updated,
			Summary:   p.Frontmatter.Description,
		})
	}

	if latestUpdated == "" {
		latestUpdated = time.Now().UTC().Format(time.RFC3339)
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
		Updated: latestUpdated,
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
