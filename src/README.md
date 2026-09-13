# Index

## Description

TypeScript source for the QLI Build Log Summarizer: the parsing and summarizing
library, and the command-line entry point. Every exported function carries a
documentation comment; `npm run docs` regenerates the
[API reference](../docs/reference/README.md) from those comments.

## Files

- [README.md](README.md) — Describes this folder and lists its files.
- [`cli.ts`](cli.ts) — Command-line entry point; reads a log file and prints its summary.
- [`index.ts`](index.ts) — The public API, re-exported for library users.
- [`parser.ts`](parser.ts) — Parses raw build-log text into per-task records.
- [`summary.ts`](summary.ts) — Aggregates task records and renders text or JSON summaries.
