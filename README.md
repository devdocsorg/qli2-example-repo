# QLI 2.0 example repository

A small TypeScript CLI and library that turn a build-task log into a summary of
failures, incomplete tasks, and durations. It demonstrates the
[Required Files Checklist](https://github.com/devdocsorg/qli2-deliverables-portal/blob/a462ebf8ebff6b45f9659349fd725ccca0e19908/docs/qualcomm-developer-ecosystem/github-repositories/audits/required-files-checklist.md)
with working code, a runnable tutorial, generated API documentation, and CI.

The input is a deliberately small [sample format](docs/tutorials/summarize-a-build-log.md#input-format).
Raw QLI or BitBake logs need conversion to that format. No device, credentials, or
runtime dependencies are required.

> **Repository relationship:** This is the authoritative DevDocs example, maintained
> here. Contributions target this repository's `main` branch.

## Get started

### Prerequisites

- Git and access to this repository
- Node.js 22 or newer, with npm

```console
git clone https://github.com/devdocsorg/qli2-example-repo.git
cd qli2-example-repo
npm ci
npm run demo
```

The demo compiles the source and prints:

```text
Tasks: 5 (1 failed, 0 incomplete)
Total task time: 898s
Failed tasks:
  kernel-modules do_configure
Slowest tasks:
  meta-qcom-image do_rootfs — 525s
  pkg-fastrpc do_compile — 253s
  kernel-modules do_configure — 49s
```

The failure is part of the sample input. Exit status 0 means the report was
produced successfully. Total task time sums durations; overlapping tasks mean
it is not the elapsed time of the build.

## Choose a branch

| Branch | Purpose and status | Build or use? | Contributions |
| --- | --- | --- | --- |
| `main` | Current example | Yes; start here | Pull requests target `main` |
| `release/1.0` | Frozen initial example at `v1.0.0` | Historical comparison only | Closed; changes go to `main` |

These are the repository's current branches. Add temporary branches to this table
while they exist and remove their entries when the branches are deleted.
[BRANCHES.md on main](https://github.com/devdocsorg/qli2-example-repo/blob/main/BRANCHES.md)
explains the long-lived branches and their relationship.

## Documentation

- [Usage tutorial](docs/tutorials/summarize-a-build-log.md): run the CLI, select JSON output, and understand the accepted input.
- [API reference](docs/reference/README.md): use the parsing and summary functions from another program.
- [Configuration](CONFIGURATION.md): runtime settings and every build-tool option.
- [Contributing](CONTRIBUTING.md): make a change and run the same checks as CI.

## Folders

- [docs/](docs/README.md) — Contains the usage tutorial and generated API reference.
- [examples/](examples/README.md) — Provides the synthetic log used in the tutorial and tests.
- [src/](src/README.md) — Implements the parser, summary library, and CLI.
- [test/](test/README.md) — Tests library behaviour and the actual command-line process.
- [scripts/](scripts/README.md) — Checks folder inventories and local documentation links.
- [.github/](.github/) — Contains [CODEOWNERS](.github/CODEOWNERS), [issue templates](.github/ISSUE_TEMPLATE/README.md), [pull request templates](.github/PULL_REQUEST_TEMPLATE/README.md), and the [CI workflow](.github/workflows/README.md); this dot-prefixed folder has no README of its own.

## Files

- [README.md](README.md) — Introduces the example and lists its contents.
- [BRANCHES.md](BRANCHES.md) — Describes the long-lived branches and contribution destinations.
- [CLAUDE.md](CLAUDE.md) — Gives coding agents the repository's scope and validation rules.
- [CONFIGURATION.md](CONFIGURATION.md) — Documents runtime and build configuration.
- [CONTRIBUTING.md](CONTRIBUTING.md) — Explains development, checks, and review.
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — States expected behaviour and the private reporting route.
- [SECURITY.md](SECURITY.md) — Explains supported code and private vulnerability reporting.
- [LICENSE](LICENSE) — Contains the BSD 3-Clause licence.
- [.env.example](.env.example) — Provides the single optional runtime setting with a safe value.
- [.gitignore](.gitignore) — Excludes dependencies, build output, local settings, and compiler cache.
- [package.json](package.json) — Defines scripts, entry points, and development dependencies.
- [package-lock.json](package-lock.json) — Pins the dependency tree used by `npm ci`.
- [tsconfig.json](tsconfig.json) — Configures TypeScript compilation.
- [typedoc.json](typedoc.json) — Configures API-reference generation.

## Support

For questions, bugs, or proposals, [open an issue](https://github.com/devdocsorg/qli2-example-repo/issues/new/choose).
For vulnerabilities, use the private route in [SECURITY.md](SECURITY.md).
This example has no guaranteed response window.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) and send changes to `main` in this repository.

## Licence

The example is distributed under the [BSD 3-Clause licence](LICENSE).
