# Summarize a build log

Turn the repository's synthetic log into a text report, then read the same result
as JSON. This tutorial follows `main`; the [branch guide](../../BRANCHES.md) identifies
the frozen initial example. No hardware or account credentials are used by the CLI.

## Prerequisites

- Git and access to this repository
- Node.js 22 or newer (`node --version`) and npm
- A terminal; the commands below work in a POSIX shell or PowerShell

## 1. Install and build

```console
git clone https://github.com/devdocsorg/qli2-example-repo.git
cd qli2-example-repo
npm ci
npm run build
```

The compiler exits successfully and creates `dist/src/cli.js` and the library at
`dist/src/index.js`. Run the remaining commands from the repository root.

## 2. Read the sample log

```console
node --env-file=.env.example dist/src/cli.js examples/sample-build.log
```

The [example configuration](../../.env.example) selects text output. Ensure an existing
`SUMMARY_FORMAT` environment variable is unset, since Node gives existing variables
precedence over an environment file.

Expected output:

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

Exit status 0 means the summarizer produced a report. The failed task comes from the
sample input. Total task time is the sum of measured task durations; concurrent tasks
overlap, so this value is not wall-clock build time.

## 3. Select JSON output

Copy `.env.example` to `.env` and change its setting to `SUMMARY_FORMAT=json`, then run:

```console
node --env-file=.env dist/src/cli.js examples/sample-build.log
```

The result is valid JSON with `taskCount: 5`, one entry in `failedTasks`, and
`totalDurationSeconds: 898`. Dates are UTC strings. The complete result shape appears
in [BuildSummary](../reference/API.md#buildsummary). The local `.env` file is ignored by Git.

## Input format

The [sample](../../examples/sample-build.log) contains one event per line:

```text
2026-09-10T14:00:00Z pkg-fastrpc do_fetch Started
2026-09-10T14:00:30Z pkg-fastrpc do_fetch Succeeded
```

Each event has four whitespace-separated fields:

| Field | Accepted values |
| --- | --- |
| Timestamp | A real UTC date in `YYYY-MM-DDTHH:mm:ssZ` or `YYYY-MM-DDTHH:mm:ss.sssZ` form |
| Recipe | Letters, digits, underscore, dot, plus, colon, or hyphen |
| Task | `do_` followed by letters, digits, or underscores |
| Event | `Started`, `Succeeded`, or `Failed` (case-sensitive) |

This is an example format. Raw BitBake output needs conversion before use here.
Blank lines are ignored. Invalid dates or syntax, backwards timestamps for the same
task, and repeated completion events are skipped and counted. A new `Started` resets
the recipe/task pair to a new attempt; only its latest attempt contributes to the
report. A completion without a start has a status but no measured duration.

## Recover from an error

| Signal | Action |
| --- | --- |
| Usage message and exit 1 | Pass exactly one file path; use `--help` to see the syntax. Prefix a path beginning with a hyphen with `./`. |
| File read error and exit 1 | Check the path and permissions. Relative paths start at your current directory. |
| `SUMMARY_FORMAT must be text or json` | Correct the variable; empty and misspelled values are rejected. |
| `No tasks found` and exit 1 | Use a nonempty file containing recognized events in the format above. |
| Skipped-line count in a report | Inspect malformed or out-of-order events. A partial report describes the recognized events only. |

## Use the library

From the repository root, this prints `0` without running the CLI:

```console
node -e "const { parseBuildLog, summarizeBuild } = require('./dist/src/index.js'); console.log(summarizeBuild(parseBuildLog('')).taskCount)"
```

The library accepts empty input. The CLI treats it as a likely wrong-file mistake.
See [API reference](../reference/README.md) and [configuration](../../CONFIGURATION.md).

## Verify changes

Run `npm run check`. The tests execute the CLI against the committed sample and
compare the report with the expected-output block above, including the exit status.
The same checks run in [CI](../../.github/workflows/check.yml).
