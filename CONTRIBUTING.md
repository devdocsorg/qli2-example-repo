# Contributing to the QLI Build Log Summarizer

Thank you for contributing. This guide explains what this repository accepts and how
maintainers review changes.

## Before you start

- Read the [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
- For usage questions, [open an issue](https://github.com/devdocsorg/qli2-example-repo/issues/new/choose) instead of a pull request.
- For a vulnerability, follow [`SECURITY.md`](SECURITY.md) and do not disclose it publicly.
- Search existing issues and pull requests before starting duplicate work.

Open an issue before starting substantive work so maintainers can confirm the direction.
Small fixes, such as typos and broken links, can go straight to a pull request.

## Where changes belong

This repository is authoritative.

| Change | Destination | Base branch |
| --- | --- | --- |
| Documentation maintained here | https://github.com/devdocsorg/qli2-example-repo | `main` |
| Source maintained here | https://github.com/devdocsorg/qli2-example-repo | `main` |

See [`BRANCHES.md`](BRANCHES.md) before choosing a branch.

## Prepare a development environment

```console
git clone https://github.com/devdocsorg/qli2-example-repo.git
cd qli2-example-repo
npm install
npm run build
```

Expected result: `tsc` completes without errors and creates `dist/src/cli.js`.

## Make and validate a change

1. Create a short-lived branch from `main`.
2. Make one focused change and update the affected documentation, including the folder
   `README.md` lists.
3. Add or update tests in [`test/`](test/README.md).
4. Run the required checks:

   ```console
   npm test
   npm run docs
   ```

   `npm run docs` regenerates [`docs/reference/`](docs/reference/README.md); commit the
   regenerated output with the change.

5. Sign off every commit (`git commit -s`) to certify the
   [Developer Certificate of Origin](https://developercertificate.org/).

## Open a pull request

Use the [pull request form](https://github.com/devdocsorg/qli2-example-repo/compare/main...your-branch?quick_pull=1&template=pr_template.md),
replacing `your-branch` with your branch name. Complete every section, identify what was
not tested, and link the issue or decision that motivated the change.

Maintainers aim to provide a first human response within three business days. If that
window passes, comment on the pull request to bump it.

## Review and acceptance

One maintainer approval is required, and `npm test` must pass on the head commit.
Reviewers are routed by [`.github/CODEOWNERS`](.github/CODEOWNERS); documentation changes
go to the documentation reviewers. A maintainer merges after approval. Respond to
requested changes by pushing new commits to the same branch.

## Licence

Contributions are accepted under the repository's [BSD 3-Clause licence](LICENSE). The
Developer Certificate of Origin sign-off is required; there is no separate contributor
licence agreement.
