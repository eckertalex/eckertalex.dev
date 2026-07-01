BIN_NAME  ?= generator
GO        ?= go

SRC_DIR   := ./generator
BUILD_DIR := ./bin
TMP_DIR   := ./tmp
DIST_DIR  := ./dist

BIN       := $(BUILD_DIR)/$(BIN_NAME)

## help: print this help message
.PHONY: help
help:
	@echo "Usage:"
	@sed -n "s/^##//p" ${MAKEFILE_LIST} | column -t -s ":" | sed -e "s/^/ /"

## audit: run quality control checks
.PHONY: audit
audit: test
	$(GO) mod tidy -diff
	$(GO) mod verify
	@test -z "$$(gofmt -l .)"
	$(GO) vet ./...

## test: run all tests
.PHONY: test
test:
	$(GO) test -v -race -buildvcs ./...

## test/cover: run tests and open the HTML coverage report
.PHONY: test/cover
test/cover:
	@mkdir -p $(TMP_DIR)
	$(GO) test -v -race -buildvcs -coverprofile=$(TMP_DIR)/coverage.out ./...
	$(GO) tool cover -html=$(TMP_DIR)/coverage.out

## tidy: tidy modfiles and modernize and format .go files
.PHONY: tidy
tidy:
	$(GO) mod tidy -v
	$(GO) fix ./...
	$(GO) fmt ./...

## build: build the application
.PHONY: build
build:
	@$(GO) build -v -o=$(BIN) $(SRC_DIR)

## gen: build the site into dist/
.PHONY: gen
gen: build
	@$(BIN) build

## gen/prod: production build the site into dist/
.PHONY: gen/prod
gen/prod: build
	@$(BIN) build --prod

## serve: build, then serve dist/ over http
.PHONY: serve
serve: build
	@$(BIN) serve

## deploy: deploy to cloudflare pages
.PHONY: deploy
deploy: gen/prod
	@wrangler pages deploy

## clean: remove build artifacts
.PHONY: clean
clean:
	rm -rvI $(BUILD_DIR) $(TMP_DIR) $(DIST_DIR)

# vim: set tabstop=4 shiftwidth=4 noexpandtab
