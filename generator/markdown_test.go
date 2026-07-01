package main

import (
	"strings"
	"testing"
)

func TestParseFrontmatter_HappyPath(t *testing.T) {
	raw := "---\n" +
		`{ "title": "Hello", "description": "A short summary.", "published": "2026-01-15" }` + "\n" +
		"---\n\nBody content."

	fm, body, err := parseFrontmatter(raw, "test.md")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if fm.Title != "Hello" {
		t.Errorf("Title = %q, want %q", fm.Title, "Hello")
	}
	if fm.Description != "A short summary." {
		t.Errorf("Description = %q, want %q", fm.Description, "A short summary.")
	}
	if fm.Published != "2026-01-15" {
		t.Errorf("Published = %q, want %q", fm.Published, "2026-01-15")
	}
	if body != "Body content." {
		t.Errorf("body = %q, want %q", body, "Body content.")
	}
}

func TestParseFrontmatter_Errors(t *testing.T) {
	cases := []struct {
		name   string
		input  string
		substr string
	}{
		{
			name:   "missing opening fence",
			input:  "no frontmatter here",
			substr: "missing frontmatter",
		},
		{
			name:   "missing closing fence",
			input:  "---\n" + `{"title":"x"}`,
			substr: "unclosed frontmatter",
		},
		{
			name:   "invalid json",
			input:  "---\nnot json\n---\nbody",
			substr: "invalid frontmatter",
		},
		{
			name:   "missing title",
			input:  "---\n" + `{ "published": "2026-01-15" }` + "\n---",
			substr: "missing title",
		},
		{
			name:   "missing published",
			input:  "---\n" + `{ "title": "Hello" }` + "\n---",
			substr: "missing published",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			_, _, err := parseFrontmatter(tc.input, "test.md")
			if err == nil {
				t.Fatalf("expected error, got nil")
			}
			if !strings.Contains(err.Error(), tc.substr) {
				t.Errorf("err = %q, want to contain %q", err.Error(), tc.substr)
			}
		})
	}
}

func TestRenderMarkdown(t *testing.T) {
	html, err := renderMarkdown("# Hello\n\nWorld")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	s := string(html)
	for _, want := range []string{"<h1", "Hello", "<p", "World"} {
		if !strings.Contains(s, want) {
			t.Errorf("output missing %q\n--- ouput ---\n%s", want, s)
		}
	}
}
