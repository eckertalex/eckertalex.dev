<h1 align="center">eckertalex.dev</h1>

The source for [eckertalex.dev](https://eckertalex.dev), a static site built by a
small custom generator written in Go (stdlib + [goldmark](https://github.com/yuin/goldmark)).

## Build

`build.sh` compiles the generator into `build/generator` and generates the site
into `dist/`. No make, no build system.

```sh
./build.sh                          # build/generator, then the site into dist/
./build.sh release                  # production site (--prod adds analytics)
./build.sh run                      # serve dist/ at http://localhost:3000
./build.sh run -- serve --port 8080 # anything after -- goes to the generator
./build.sh test
./deploy.sh                         # production site, then wrangler pages deploy
```

The generator takes `build [--prod]` and `serve [--port N]`. `serve` regenerates
the site (without analytics), then watches `content/`, `public/`, and `config.json`,
rebuilds on any change, and reloads open browser tabs. Changes to the generator
itself need a restart.

Needs: Go and wrangler from `.tool-versions`.

## Content

Pages live under `content/` as Markdown with a JSON frontmatter block:

```markdown
---
{ "title": "A Neat Rounding Mode", "description": "Today I learned ...", "published": "2026-03-24" }
---

Body in Markdown.
```

- The file path is the URL: `content/blog/foo.md` becomes `/blog/foo/`,
  `content/_index.md` becomes `/`.
- `title` and `published` (`YYYY-MM-DD`) are required on every page. Blog posts
  (anything under `content/blog/`) additionally require a `description`, which feeds
  the `<meta>`/Open Graph tags and the Atom feed `<summary>`.
- `updated` is optional. The layout is inferred from the path.
- Directories starting with `_` (e.g. `_layouts`, `_partials`) are not published.

Layouts and partials are Go `html/template` files in `content/_layouts/` and
`content/_partials/`. Site-wide identity (URL, author, socials, analytics) lives in
`config.json`.

A build produces `dist/` with the rendered pages, `atom.xml`, `sitemap.xml`, and
`robots.txt`, plus everything copied verbatim from `public/` (stylesheet, fonts, favicon, og image).
