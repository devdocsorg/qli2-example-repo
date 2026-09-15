# Set up your development environment

This example prepares a local checkout, builds the skeleton's documentation, and
checks the result in a browser. When adopting the skeleton, extend this page with
the actual project's compiler/runtime, dependencies, and validation commands.

## Prerequisites

Use Git, Make, Python 3.12 or newer, [uv](https://docs.astral.sh/uv/getting-started/installation/),
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
local assets. Commit the source and regenerated site together. The documentation CI job repeats
the strict build and rejects missing or stale committed output. The build replaces
`docs/site/` to remove stale pages after a source deletion or rename.

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
[function documentation setup](https://github.com/devdocsorg/qli2-deliverables-portal/blob/main/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/function-documentation.md):
choose the native extractor, pin its version and runtime, install it in this
setup, and add its build and coverage checks to local validation and CI.

For example, a TypeScript project installs TypeDoc and TypeScript in its locked
package manifest, generates reference from source comments, and links that output
from the site. Keep comments authoritative; do not rewrite the same API entries
by hand. A project with an established reference site can link to its authoritative
reference and retain that site's build procedure.

The skeleton has no application functions to extract. `conf.py` configures Sphinx
without defining functions. A passing prose build alone does not prove function
reference coverage after code is added.

The [Makefile](../Makefile) owns dependency installation and build commands for
both local use and CI. After committing regenerated output, run
`make -f docs/source/Makefile check` to verify it reproduces.
