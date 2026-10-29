#!/bin/sh
set -eu

cd "$(dirname "$0")"

# --- Arguments ---------------------------------------------------------------
mode="debug"
action="build"

while [ "$#" -gt 0 ]; do
    case "$1" in
        debug|release) mode="$1" ;;
        build|run|test) action="$1" ;;
        --)
            shift
            break
            ;;
        *)
            echo "usage: $0 [debug|release] [build|run|test] [-- args...]" >&2
            exit 2
            ;;
    esac
    shift
done

if [ "$action" != "run" ] && [ "$#" -gt 0 ]; then
    echo "error: program arguments require the 'run' action" >&2
    exit 2
fi

# --- Actions -----------------------------------------------------------------
case "$action" in
    test)
        exec go test -v -race ./...
        ;;
esac

# --- Flags -------------------------------------------------------------------
# release is the production site, which includes analytics
build_debug=""
build_release="-trimpath"

site_debug=""
site_release="--prod"

# --- Choose Flags ------------------------------------------------------------
case "$mode" in
    debug)
        echo "[debug mode]" >&2
        build_flags="$build_debug"
        site_flags="$site_debug"
        ;;
    release)
        echo "[release mode]" >&2
        build_flags="$build_release"
        site_flags="$site_release"
        ;;
esac

# --- Vet ---------------------------------------------------------------------
# Go's version of -Wall, so every build runs it
go vet ./...

# --- Build -------------------------------------------------------------------
mkdir -p build
go build $build_flags -o build/generator ./generator

# --- Site/Run ----------------------------------------------------------------
# The site is what this repo builds, so a build also generates dist/
case "$action" in
    run)
        # Without arguments, preview the site
        [ "$#" -eq 0 ] && set -- serve
        exec ./build/generator "$@"
        ;;
    build)
        exec ./build/generator build $site_flags
        ;;
esac
