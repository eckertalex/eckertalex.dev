#!/bin/sh
# usage: ./build.sh [debug|release|test]
set -eu

cd "$(dirname "$0")"

# Release builds the production site, with analytics
flags=""
site_flags=""
case "${1:-debug}" in
    debug) ;;
    release) flags="-trimpath" site_flags="--prod" ;;
    test) exec go test -v ./... ;;
    *)
        echo "usage: $0 [debug|release|test]" >&2
        exit 2
        ;;
esac

go vet ./...
mkdir -p build
go build $flags -o build/generator ./generator
./build/generator build $site_flags
