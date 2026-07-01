package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"html/template"
	"io"
	"io/fs"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

const (
	contentDir = "content"
	distDir    = "dist"
)

type Frontmatter struct {
	Title       string `json:"title"`
	Description string `json:"description,omitempty"`
	Published   string `json:"published"`
	Updated     string `json:"updated,omitempty"`
	Layout      string `json:"layout,omitempty"`
}

type Page struct {
	Frontmatter   Frontmatter
	Slug          string
	OutputPath    string
	SourcePath    string
	CanonicalPath string    // site URL path, e.g. "/blog/foo/"
	PublishedAt   time.Time // parsed Frontmatter.Published
	Markdown      string
	HTML          template.HTML
	IsPost        bool // under content/blog/, not _index.md
	IsIndex       bool // _index.md (homepage or a section index)
}

type Collection struct {
	Posts   []*Page // blog posts, sorted by Published desc
	Pages   []*Page // top-level standalone pages (datenschutz, impressum, etc.)
	Indexes []*Page // _index.md pages (homepage + section indexes)
}

func walk() ([]string, error) {
	var paths []string
	err := filepath.WalkDir(contentDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if d.IsDir() {
			// Skip leading-underscore dirs (_layouts, _partials, future
			// _drafts, etc.) and the assets dir, which is copied separately.
			if d.Name() == "assets" || strings.HasPrefix(d.Name(), "_") {
				return fs.SkipDir
			}

			return nil
		}

		if strings.HasSuffix(path, ".md") {
			paths = append(paths, path)
		}

		return nil
	})

	return paths, err
}

// outputPath maps a source markdown path to its output file location,
// using a Hugo-style convention: the path is the URL. It derives from
// canonicalPath so the two never drift.
func outputPath(srcPath string) string {
	p := canonicalPath(srcPath)
	if p == "/404.html" {
		return filepath.Join(distDir, "404.html")
	}
	if p == "/" {
		return filepath.Join(distDir, "index.html")
	}
	return filepath.Join(distDir, filepath.FromSlash(strings.Trim(p, "/")), "index.html")
}

// canonicalPath maps a source markdown path to its site URL path.
//
//	content/_index.md       -> /
//	content/blog/_index.md  -> /blog/
//	content/blog/foo.md     -> /blog/foo/
//	content/about.md        -> /about/
//	content/404.md          -> /404.html        (hosting convention)
func canonicalPath(srcPath string) string {
	rel := strings.TrimSuffix(strings.TrimPrefix(filepath.ToSlash(srcPath), contentDir+"/"), ".md")

	if rel == "404" {
		return "/404.html"
	}
	if rel == "_index" {
		return "/"
	}
	if section, ok := strings.CutSuffix(rel, "/_index"); ok {
		return "/" + section + "/"
	}
	return "/" + rel + "/"
}

func buildCollection() (*Collection, error) {
	paths, err := walk()
	if err != nil {
		return nil, err
	}

	var errs []error
	var posts, pages, indexes []*Page
	for _, path := range paths {
		raw, err := os.ReadFile(path)
		if err != nil {
			return nil, err
		}

		fm, body, err := parseFrontmatter(string(raw), path)
		if err != nil {
			errs = append(errs, fmt.Errorf("%s: %w", path, err))
			continue
		}

		base := filepath.Base(path)
		isIndex := base == "_index.md"
		isPost := !isIndex && strings.HasPrefix(filepath.ToSlash(path), contentDir+"/blog/")
		slug := strings.TrimSuffix(base, ".md")

		if isPost && fm.Description == "" {
			errs = append(errs, fmt.Errorf("%s: missing description", path))
			continue
		}

		publishedAt, err := time.Parse("2006-01-02", fm.Published)
		if err != nil {
			errs = append(errs, fmt.Errorf("%s: invalid published date %q: %w", path, fm.Published, err))
			continue
		}

		page := &Page{
			Frontmatter:   fm,
			Slug:          slug,
			OutputPath:    outputPath(path),
			SourcePath:    path,
			CanonicalPath: canonicalPath(path),
			PublishedAt:   publishedAt,
			Markdown:      body,
			IsPost:        isPost,
			IsIndex:       isIndex,
		}

		switch {
		case isIndex:
			indexes = append(indexes, page)
		case isPost:
			posts = append(posts, page)
		default:
			pages = append(pages, page)
		}
	}
	if len(errs) > 0 {
		return nil, errors.Join(errs...)
	}

	sort.Slice(posts, func(i, j int) bool {
		return posts[i].PublishedAt.After(posts[j].PublishedAt)
	})

	return &Collection{Posts: posts, Pages: pages, Indexes: indexes}, nil
}

func copyFile(src, dst string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer in.Close()

	if err := os.MkdirAll(filepath.Dir(dst), 0o755); err != nil {
		return err
	}
	out, err := os.Create(dst)
	if err != nil {
		return err
	}

	if _, err := io.Copy(out, in); err != nil {
		out.Close()
		return err
	}

	return out.Close()
}

func copyDir(src, dst string) error {
	return filepath.WalkDir(src, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		rel, _ := filepath.Rel(src, path)
		target := filepath.Join(dst, rel)
		if d.IsDir() {
			return os.MkdirAll(target, 0o755)
		}

		return copyFile(path, target)
	})
}

type renderData struct {
	*Page
	Site  Config
	Prod  bool
	Posts []*Page
	Pages []*Page
}

func Build(prod bool) error {
	data, err := os.ReadFile("config.json")
	if err != nil {
		return fmt.Errorf("config.json: %w", err)
	}
	if err := json.Unmarshal(data, &Site); err != nil {
		return fmt.Errorf("config.json: %w", err)
	}

	collection, err := buildCollection()
	if err != nil {
		return err
	}

	tmpls, err := loadTemplates()
	if err != nil {
		return err
	}

	if err := os.RemoveAll(distDir); err != nil {
		return err
	}

	if err := copyDir(filepath.Join(contentDir, "assets"), filepath.Join(distDir, "assets")); err != nil {
		return err
	}
	if err := copyDir("public", distDir); err != nil {
		return err
	}
	if err := writeSyntaxCSS(); err != nil {
		return err
	}

	all := append(append([]*Page{}, collection.Posts...), collection.Pages...)
	all = append(all, collection.Indexes...)

	for _, p := range all {
		rendered, err := renderMarkdown(p.Markdown)
		if err != nil {
			return fmt.Errorf("%s: %w", p.SourcePath, err)
		}
		p.HTML = rendered

		layout := "page"
		switch {
		case p.CanonicalPath == "/":
			layout = "index"
		case p.CanonicalPath == "/blog/":
			layout = "blog"
		case p.CanonicalPath == "/404.html":
			layout = "404"
		case p.IsPost:
			layout = "post"
		}
		if p.Frontmatter.Layout != "" {
			layout = p.Frontmatter.Layout
		}

		out, err := tmpls.Render(layout, renderData{Page: p, Site: Site, Prod: prod, Posts: collection.Posts, Pages: collection.Pages})
		if err != nil {
			return fmt.Errorf("%s: %w", p.SourcePath, err)
		}
		if err := os.MkdirAll(filepath.Dir(p.OutputPath), 0o755); err != nil {
			return err
		}
		if err := os.WriteFile(p.OutputPath, out, 0o644); err != nil {
			return err
		}
	}

	if err := writeAtom(collection); err != nil {
		return err
	}
	if err := writeSitemap(collection); err != nil {
		return err
	}
	if err := writeRobots(); err != nil {
		return err
	}

	return nil
}
