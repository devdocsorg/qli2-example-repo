# Branches

This file describes every long-lived branch in the QLI Build Log Summarizer. It is
maintained on `main`. Short-lived contributor branches are omitted.

Last reviewed: 2026-09-13

## Branch summary

| Branch | Purpose | Status | Build or use this branch? | Contributions | Relationship to `main` |
| --- | --- | --- | --- | --- | --- |
| `main` | Development and releases | Active | Yes — always current | Open — base pull requests here | Authoritative branch |
| `release/1.0` | 1.0.x maintenance line | Maintenance | Yes — for the 1.0.x line without new features | Closed — fixes are merged into `main` and cherry-picked | Maintained separately; receives cherry-picked fixes and is never merged back into `main` |

## `main`

- **Audience:** Users and contributors.
- **What it produces:** The `qli-buildlog-summary` CLI and library, via `npm run build`.
- **Stability:** `npm test` passes on every commit; the latest commit may contain unreleased changes.
- **Contribution route:** Pull requests against `main` in this repository, following [`CONTRIBUTING.md`](CONTRIBUTING.md).
- **Release relationship:** Releases are tagged from `main`; `v1.0.0` is the first.

## `release/1.0`

- **Audience:** Users who need the 1.0.x line without new features.
- **Why it exists:** Maintains the 1.0.x releases while feature work continues on `main`.
- **What it produces:** The same CLI and library at 1.0.x versions.
- **Stability and support window:** Fixes only; supported until 1.1.0 is released.
- **Contribution route:** Closed. Send fixes to `main`; maintainers cherry-pick applicable fixes.
- **Relationship to `main`:** Maintained separately; receives cherry-picked fixes from `main` and is never merged back into `main`.
- **End-of-life condition:** The 1.1.0 release.
