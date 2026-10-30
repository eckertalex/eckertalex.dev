#!/bin/sh
set -eu

cd "$(dirname "$0")"

./build.sh release
exec wrangler pages deploy
