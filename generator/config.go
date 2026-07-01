package main

type Socials struct {
	GitHub   string `json:"github"`
	X        string `json:"x"`
	Bluesky  string `json:"bluesky"`
	LinkedIn string `json:"linkedin"`
}

type Config struct {
	URL         string  `json:"url"`
	Name        string  `json:"name"`
	Author      string  `json:"author"`
	AuthorEmail string  `json:"authorEmail,omitempty"`
	Description string  `json:"description"`
	Copyright   string  `json:"copyright"`
	OGImage     string  `json:"ogImage"`
	OGImageAlt  string  `json:"ogImageAlt"`
	Locale      string  `json:"locale"`
	UmamiID     string  `json:"umamiId,omitempty"`
	UmamiSrc    string  `json:"umamiSrc,omitempty"`
	Socials     Socials `json:"socials"`
}

var Site Config
