---
document_id: qli2-example-tutorial-001
title: Summarize a build log
content_type: tutorial
product_and_release: QLI Build Log Summarizer, v1.0.0
audience: developer with shell access and Node.js 20 or newer
source_repository: https://github.com/devdocsorg/qli2-example-repo
source_revision: v1.0.0
content_owner: DevDocs QLI 2.0 team
review_record: See Source and review record below
last_verified: 2026-09-13
canonical_destination: repository local
---

# Summarize a build log

Produce a text summary of a QLI build log — task counts, failures, and the slowest
tasks — using the sample log shipped with this repository.

## Prerequisites

- A Linux, macOS, or Windows host with a shell
- Node.js 20 or newer (check with `node --version`) and npm
- Git, and access to this repository

## Inputs

- **Log file**: [`examples/sample-build.log`](../../examples/sample-build.log). Every
  line must have the form documented in
  [`parseBuildLog`](../reference/README.md#parsebuildlog).
- **Output format**: the [`SUMMARY_FORMAT`](../../.env.example) environment variable.
  This tutorial uses the default, `text`; set `json` for machine-readable output.

## Steps

1. Clone the repository and install dependencies.

   ```shell
   # Applies to: v1.0.0; source: tag v1.0.0
   # Run from: any working directory
   git clone https://github.com/devdocsorg/qli2-example-repo.git
   cd qli2-example-repo
   npm install
   # Expected result: npm reports the added packages with no errors
   ```

2. Build the command-line tool.

   ```shell
   # Run from: the repository root
   npm run build
   # Expected result: tsc completes with no output and dist/src/cli.js exists
   ```

3. Summarize the sample log.

   ```shell
   # Run from: the repository root
   node dist/src/cli.js examples/sample-build.log
   # Expected result: the summary shown under "Verify the result"
   ```

   If the command prints `Cannot read …`, the path did not resolve — see
   "Recover from failure".

## Verify the result

Step 3 prints exactly:

```text
Tasks: 5 (1 failed, 0 incomplete)
Measured build time: 898s
Failed tasks:
  kernel-modules do_configure
Slowest tasks:
  meta-qcom-image do_rootfs — 525s
  pkg-fastrpc do_compile — 253s
  kernel-modules do_configure — 49s
```

and exits with status 0 (check with `echo $?`).

## Recover from failure

| Signal | Action |
| --- | --- |
| `Usage: qli-buildlog-summary <log-file>` | No log file was given. Pass a path as the first argument. |
| `Cannot read <path>: … ENOENT …` | The path did not resolve. Check the spelling, and unset `QLI_LOG_DIR` — relative paths resolve against it when it is set. |
| `Skipped N unrecognized line(s).` in the output | Lines that do not match `<ISO-8601 timestamp> <recipe> <task> <event>` were skipped. Compare the log against the format in [`parseBuildLog`](../reference/README.md#parsebuildlog). |
| `tsc` errors during `npm run build` | Confirm Node.js 20 or newer, delete `node_modules/`, and re-run `npm install`. |

## Related reference

- [`parseBuildLog`](../reference/README.md#parsebuildlog) — the accepted log-line format
- [`summarizeBuild`](../reference/README.md#summarizebuild) — what the summary contains
- [`formatSummary`](../reference/README.md#formatsummary) — text and JSON rendering
- [`.env.example`](../../.env.example) — the configuration reference

## Source and review record

| Gate | Outcome |
| --- | --- |
| Technical | Commands executed against v1.0.0 on 2026-09-13; the output matched "Verify the result". |
| Intellectual property and legal | Not run. |
| Executive accountability | Not recorded. |
| Maintainer | Merged in the v1.0.0 initial import. |
| Publication | Repository local, v1.0.0, 2026-09-13. |
