<h1 align="center">eckertalex.dev</h1>

The source for [eckertalex.dev](https://eckertalex.dev), a static site built by a
small custom generator written in Go (stdlib + [goldmark](https://github.com/yuin/goldmark)).

## Requirements

- Go (see `.tool-versions`)

## Commands

Run `make help` to list everything. The common ones:

| Command        | What it does                                        |
| -------------- | --------------------------------------------------- |
| `make gen`     | Build the site into `dist/`                         |
| `make serve`   | Build, then serve `dist/` at <http://localhost:3000> |
| `make build`   | Compile the binary into `bin/generator`             |
| `make deploy`  | Production build (`--prod`) then `wrangler pages deploy` |
| `make audit`   | gofmt check, `go vet`, `go test`, `go mod verify`   |
| `make test`    | Run the tests                                       |
| `make clean`   | Remove `bin/`, `tmp/`, and `dist/`                  |

The binary itself takes `build [--prod]` and `serve` subcommands; `serve` accepts `--port`.
`--prod` enables the analytics script (omitted from local builds).

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
- `updated` and `layout` are optional. The layout is otherwise inferred from the path.
- Directories starting with `_` (e.g. `_layouts`, `_partials`) are not published.

Layouts and partials are Go `html/template` files in `content/_layouts/` and
`content/_partials/`. Site-wide identity (URL, author, socials, analytics) lives in
`generator/config.go`.

A build produces `dist/` with the rendered pages, `atom.xml`, `sitemap.xml`, and
`robots.txt`, plus everything copied verbatim from `public/` (stylesheet, fonts, favicon, og image).
