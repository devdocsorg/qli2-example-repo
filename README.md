# QLI Build Log Summarizer

> **This is the QLI 2.0 example repository.** It shows what a repository that meets the
> [Required Files Checklist](https://qli2-deliverables-portal.vercel.app/qualcomm-developer-ecosystem/github-repositories/audits/required-files-checklist/)
> looks like: every required file and folder is present and filled in for a small, working
> project. Use any file here as a starting point for a real repository.

`qli-buildlog-summary` reads a QLI build log and reports task counts, failures, and the
slowest tasks. Build and release engineers use it to see why a build was slow or which
task failed without reading the whole log.

> **Repository relationship:** This is the authoritative repository. It is not a mirror
> or a fork; contributions belong here.

## Get started

### Prerequisites

- Node.js 20 or newer (tested on Node.js 26)
- npm (bundled with Node.js)

```console
npm install && npm run build
```

Expected result: `tsc` completes without errors and creates `dist/src/cli.js`.

For the complete walkthrough, follow
[Summarize a build log](docs/tutorials/summarize-a-build-log.md).

## Choose a branch

| Branch | Purpose and status | Build or use from it? | Send contributions here? |
| --- | --- | --- | --- |
| `main` | Active development; every release is tagged from it | Yes — always current | Yes — base every pull request on `main` |
| `release/1.0` | Maintenance line for 1.0.x; fixes only | Yes — when you need the 1.0.x line without new features | No — send fixes to `main`; maintainers cherry-pick |

See [`BRANCHES.md` on `main`](https://github.com/devdocsorg/qli2-example-repo/blob/main/BRANCHES.md)
for every long-lived branch, its lifecycle, and its relationship to `main`.

## Documentation

- [Reference documentation](docs/reference/README.md) — generated from the source comments with TypeDoc
- [Tutorial: Summarize a build log](docs/tutorials/summarize-a-build-log.md)
- [Configuration](.env.example) — every setting, documented beside its example value

## Folders

- [`docs/`](docs/README.md) — tutorials and the generated API reference.
- [`examples/`](examples/README.md) — sample build log used by the tutorial.
- [`src/`](src/README.md) — TypeScript source for the library and the CLI.
- [`test/`](test/README.md) — automated tests, run with `npm test`.
- [`.github/`](.github/README.md) — code ownership and the issue and pull request templates.

## Files

- [README.md](README.md) — Introduces the project and lists its folders and files.
- [`BRANCHES.md`](BRANCHES.md) — Explains every long-lived branch and its relationship to `main`.
- [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) — Expected behaviour and how to report a conduct concern.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — How to prepare, validate, and submit a change.
- [`LICENSE`](LICENSE) — The BSD 3-Clause licence text for the project.
- [`SECURITY.md`](SECURITY.md) — Private route for reporting vulnerabilities.
- [`.env.example`](.env.example) — Documented configuration with safe example values.
- [`.gitignore`](.gitignore) — Paths git ignores: build output, dependencies, and local `.env` files.
- [`package.json`](package.json) — Package manifest: scripts, dependencies, and the CLI entry point.
- [`package-lock.json`](package-lock.json) — Pinned dependency versions for reproducible installs.
- [`tsconfig.json`](tsconfig.json) — TypeScript compiler configuration.
- [`typedoc.json`](typedoc.json) — Configuration for the generated reference documentation.

## Support

- Usage questions and confirmed bugs: [open an issue](https://github.com/devdocsorg/qli2-example-repo/issues/new/choose)
- Security vulnerabilities: follow [`SECURITY.md`](SECURITY.md); do not open a public issue

Maintainers aim to respond within three business days.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before proposing a change. Base every pull
request on `main` in this repository.

## Licence

The QLI Build Log Summarizer is available under the terms in [`LICENSE`](LICENSE).
