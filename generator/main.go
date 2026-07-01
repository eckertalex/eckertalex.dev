package main

import (
	"flag"
	"fmt"
	"log"
	"os"
)

func main() {
	if len(os.Args) < 2 {
		usage()
		os.Exit(2)
	}

	switch os.Args[1] {
	case "build":
		fs := flag.NewFlagSet("build", flag.ExitOnError)
		prod := fs.Bool("prod", false, "production build (enables analytics)")
		if err := fs.Parse(os.Args[2:]); err != nil {
			log.Fatal(err)
		}
		if err := Build(*prod); err != nil {
			log.Fatal(err)
		}
	case "serve":
		fs := flag.NewFlagSet("serve", flag.ExitOnError)
		port := fs.Int("port", 3000, "listen port")
		if err := fs.Parse(os.Args[2:]); err != nil {
			log.Fatal(err)
		}

		if err := Build(false); err != nil {
			log.Fatal(err)
		}

		if err := Serve(*port); err != nil {
			log.Fatal(err)
		}
	case "help", "-h", "--help":
		usage()
	default:
		fmt.Fprintf(os.Stderr, "unknown command %s\n", os.Args[1])
		usage()
		os.Exit(2)
	}
}

func usage() {
	fmt.Fprintln(os.Stderr, `usage: generator <command> [flags]

commands:
  build    build the site into dist/
    --prod   production build (enables analytics)
  serve    build, then serve dist/ over http`)
}
