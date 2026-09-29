# Set up your development environment

This example prepares a local checkout, builds the skeleton's documentation, and
checks the result in a browser. When adopting the skeleton, extend this page with
the actual project's compiler/runtime, dependencies, and validation commands.

## Prerequisites

Use Git, Make, GNU Awk (for shdoc), Python 3.12 or newer, [uv](https://docs.astral.sh/uv/getting-started/installation/),
and a browser. Dependency installation needs network access; reading the built
site does not. Python runs the documentation tools and does not select an
implementation language for the project.

## 1. Clone and create a branch

```sh
git clone https://github.com/devdocsorg/qli2-example-repo.git
cd qli2-example-repo
git switch -c docs/my-change
```

If contributing through a fork, clone your fork and target this repository's
`main` when opening the pull request.

## 2. Install the documentation dependencies

```sh
make -f docs/source/Makefile setup
```

The requirements file pins Sphinx and MyST, which renders Markdown. Keep the
virtual environment out of commits. The Makefile uses a POSIX shell; on Windows, run the walkthrough in WSL.

## 3. Edit and build

Edit the Markdown under `docs/source/`. Keep policy files at the repository root;
link to those originals instead of maintaining another policy in the docs.

```sh
make -f docs/source/Makefile html
```

Expected result: exit status 0 and `docs/site/index.html`, with HTML pages and
local assets. `docs/site/` is generated and ignored by Git, so commit only the
source. The documentation CI job repeats the strict build and checks. The build
replaces `docs/site/` to remove stale pages after a source deletion or rename.

## 4. Check the site locally

Open `docs/site/index.html` directly in the browser, without a local HTTP server.
Navigate to the adoption tutorial, contributor guide, and this page; use a heading
link, return home, and search for `environment`. Search should link to this page.
Repeat with networking disabled. Copying just `docs/site/` elsewhere must also
work. External repository and policy-owner websites still require connectivity.

The site uses relative HTML links and bundled assets. Search results show titles
without fetching page excerpts, so search also works under `file://`.

## 5. Add the implementation's reference tooling

Sphinx/MyST renders prose; it does not automatically extract every language's
function comments. When implementation code is added, follow the checklist's
[function documentation setup](https://github.com/devdocsorg/qli2-example-repo/blob/main/SPECIFICATION.md#native-function-reference):
choose the native extractor, pin its version and runtime, install it in this
setup, and add its build and coverage checks to local validation and CI.

For example, a TypeScript project installs TypeDoc and TypeScript in its locked
package manifest, generates reference from source comments, and links that output
from the site. Keep comments authoritative; do not rewrite the same API entries
by hand. A project with an established reference site can link to its authoritative
reference and retain that site's build procedure.

[test_reference_coverage.py](https://github.com/devdocsorg/qli2-example-repo/blob/main/.github/test_reference_coverage.py)
finds every function in the tracked sources and fails the build on formats it
cannot read, on functions without a documentation comment or a configured
renderer, and on missing rendered entries. Extend it with the project's formats
and renderers. The skeleton's own functions are its documentation helpers, rendered
with Python autodoc.

The [Makefile](https://github.com/devdocsorg/qli2-example-repo/blob/main/docs/source/Makefile) owns dependency installation and build commands for
both local use and CI. Before submitting, run
`make -f docs/source/Makefile check` to build and check the site.

The shared `check` target also opens a copied site with Playwright and networking
disabled. It checks navigation, anchors, resources, and a search-result click.
It uses system Chromium when available; otherwise run
`make -f docs/source/Makefile browser` to install Playwright's user-local browser.
CI installs its browser before invoking the same check target.

Direct documentation dependencies are declared in `docs/source/requirements.txt`;
`docs/source/requirements.lock` also pins their transitive dependencies. After an
intentional tool update, regenerate the lock with
`uv pip compile --python-version 3.12 docs/source/requirements.txt -o docs/source/requirements.lock`,
run setup, and rebuild before committing the requirements and lock.

The setup target recreates the documentation-only `.venv` from the lockfile.
Keep project dependencies and custom tools in their own environments.
