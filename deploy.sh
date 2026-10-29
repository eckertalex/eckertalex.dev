#!/bin/sh
set -eu

cd "$(dirname "$0")"

# Deploys are always the production site
./build.sh release
exec wrangler pages deploy
