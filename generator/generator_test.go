package main

import (
	"path/filepath"
	"testing"
)

func TestOutputPath(t *testing.T) {
	tests := []struct {
		name string
		src  string
		want string
	}{
		{
			name: "blog post",
			src:  "content/blog/hello-world.md",
			want: filepath.Join(distDir, "blog", "hello-world", "index.html"),
		},
		{
			name: "top-level page",
			src:  "content/about.md",
			want: filepath.Join(distDir, "about", "index.html"),
		},
		{
			name: "homepage",
			src:  "content/_index.md",
			want: filepath.Join(distDir, "index.html"),
		},
		{
			name: "section index",
			src:  "content/blog/_index.md",
			want: filepath.Join(distDir, "blog", "index.html"),
		},
		{
			name: "404 page",
			src:  "content/404.md",
			want: filepath.Join(distDir, "404.html"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := outputPath(tt.src)
			if got != tt.want {
				t.Errorf("outputPath(%q) = %q, want %q", tt.src, got, tt.want)
			}
		})
	}
}
