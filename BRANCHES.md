# Branches

This file on `main` describes the repository's long-lived branches. The
[README's branch table](README.md#choose-a-branch) also lists temporary branches.

| Branch | Purpose | Status | Build or use? | Contributions | Relationship to main |
| --- | --- | --- | --- | --- | --- |
| `main` | Current working example | Active | Yes | Open | Authoritative; all changes land here |
| `release/1.0` | Preserve the initial example | Frozen | Historical comparison only | Closed | Stays at `v1.0.0`; receives no fixes and is not merged back |

## main

Use this branch for the CLI, library, and documentation. Its CI checks compilation,
behaviour, the tutorial output, generated-reference drift, and local documentation
links. A passing run applies to that commit, not to later changes.

Development versions in `package.json` are not release announcements. Release tags
identify snapshots; a new tag is created only when a release is deliberately cut.
Send contributions to `main` using [CONTRIBUTING.md](CONTRIBUTING.md).

## release/1.0

This branch is retained for readers comparing the current skeleton with the initial
`v1.0.0` example. It is frozen, unsupported, and has no backport schedule. It remains
separate from `main`; fixes and documentation updates belong on `main` only.
