# QLI Build Log Summarizer

> **This is the QLI 2.0 example repository.** It shows how a small, working project meets the
> [Required Files Checklist](https://qli2-deliverables-portal.vercel.app/qualcomm-developer-ecosystem/github-repositories/audits/required-files-checklist/)
> requirements: every required file and folder is present and filled in. Use any file
> here as a starting point for a real repository.

`qli-buildlog-summary` reads a QLI build log and reports task counts, failures, and the
slowest tasks. Build and release engineers use it to identify slow or failed tasks
without reading the whole log.

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

| Branch | Purpose and status | Build or use this branch? | Send contributions here? |
| --- | --- | --- | --- |
| `main` | Active development; every release is tagged from it | Yes — always current | Yes — base every pull request on `main` |
| `release/1.0` | Maintenance line for 1.0.x; fixes only | Yes — when you need the 1.0.x line without new features | No — send fixes to `main`; maintainers cherry-pick fixes |

See [`BRANCHES.md` on `main`](https://github.com/devdocsorg/qli2-example-repo/blob/main/BRANCHES.md)
for every long-lived branch, its lifecycle, and its relationship to `main`.

## Documentation

- [Reference documentation](docs/reference/README.md) — generated from the source comments with TypeDoc.
- [Tutorial: Summarize a build log](docs/tutorials/summarize-a-build-log.md).
- [Configuration](.env.example) — every setting, documented beside its example value.

## Folders

- [`docs/`](docs/README.md) — Contains tutorials and the generated API reference.
- [`examples/`](examples/README.md) — Provides the sample build log used by the tutorial.
- [`src/`](src/README.md) — Contains the TypeScript source for the library and the CLI.
- [`test/`](test/README.md) — Contains automated tests, run with `npm test`.
- [`.github/`](.github/) — Defines code ownership ([`CODEOWNERS`](.github/CODEOWNERS)) and provides the [issue](.github/ISSUE_TEMPLATE/README.md) and [pull request](.github/PULL_REQUEST_TEMPLATE/README.md) templates. This folder carries no `README.md` of its own: GitHub displays `.github/README.md` in place of the repository front page, so the folder's index lives in this entry instead.

## Files

- [README.md](README.md) — Introduces the project and lists its folders and files.
- [`BRANCHES.md`](BRANCHES.md) — Explains every long-lived branch and its relationship to `main`.
- [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) — Defines expected behaviour and explains how to report a conduct concern.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — Explains how to prepare, validate, and submit a change.
- [`LICENSE`](LICENSE) — Contains the project's BSD 3-Clause licence text.
- [`SECURITY.md`](SECURITY.md) — Explains how to report vulnerabilities privately.
- [`.env.example`](.env.example) — Documents configuration settings with safe example values.
- [`.gitignore`](.gitignore) — Lists paths Git ignores: build output, dependencies, and local `.env` files.
- [`package.json`](package.json) — Defines package scripts, dependencies, and the CLI entry point.
- [`package-lock.json`](package-lock.json) — Pins dependency versions for reproducible installs.
- [`tsconfig.json`](tsconfig.json) — Configures the TypeScript compiler.
- [`typedoc.json`](typedoc.json) — Configures the generated reference documentation.

## Support

- Usage questions and confirmed bugs: [open an issue](https://github.com/devdocsorg/qli2-example-repo/issues/new/choose).
- Security vulnerabilities: follow [`SECURITY.md`](SECURITY.md); do not open a public issue.

Maintainers aim to respond within three business days.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before proposing a change. Base every pull
request on `main` in this repository.

## Licence

The QLI Build Log Summarizer is available under the terms in [`LICENSE`](LICENSE).
