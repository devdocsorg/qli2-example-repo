# Index

## Description

TypeScript source for the QLI Build Log Summarizer's parsing and summarizing library
and command-line entry point. Every exported function has a documentation comment;
`npm run docs` regenerates the
[API reference](../docs/reference/README.md) from those comments.

## Files

- [README.md](README.md) — Describes this folder and lists its files.
- [`cli.ts`](cli.ts) — Reads a log file and prints its summary through the command-line interface.
- [`index.ts`](index.ts) — Re-exports the public API for library users.
- [`parser.ts`](parser.ts) — Parses raw build-log text into per-task records.
- [`summary.ts`](summary.ts) — Aggregates task records and renders text or JSON summaries.
