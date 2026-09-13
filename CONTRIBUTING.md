# Contributing

Changes to this example belong in this repository, targeting `main`. Read the
[Code of Conduct](CODE_OF_CONDUCT.md) and [branch guidance](BRANCHES.md).
Search existing issues before proposing substantial changes; focused fixes can go
straight to a pull request. Use [SECURITY.md](SECURITY.md) for vulnerabilities.

## Build and check

Use Node.js 22 or newer and npm. From a clone of the repository:

```console
npm ci
npm run check
```

The check compiles TypeScript, runs library and CLI tests, regenerates the API
reference, and checks folder inventories and local Markdown links. Tests execute the
sample command and compare its output with the tutorial. CI runs the same check and
fails if the committed API reference differs from a fresh generation.

## Make a focused change

1. Start from current `main` and create a short-lived branch.
2. Change the code and its documentation together. Add regression coverage for changed behaviour.
3. Update each affected folder's README inventory. Dot-prefixed folders themselves take no README.
4. Run `npm run check` and commit the generated reference with the source change.
5. Sign commits with `git commit -s` to certify the [Developer Certificate of Origin](https://developercertificate.org/).

The example stays small: prefer one clear implementation and documented limits to
extra settings or abstractions. [CONFIGURATION.md](CONFIGURATION.md) explains the toolchain.

## Submit and follow the review

[Open a pull request with the template](https://github.com/devdocsorg/qli2-example-repo/compare?expand=1&template=pr_template.md),
choose `main` as the base, and select your branch as the head. Explain the user-visible
change and record what you actually tested. Mark omitted checks with a reason.

[CODEOWNERS](.github/CODEOWNERS) routes source and documentation reviews to the
responsible teams. Maintainers check the results and documentation before merging;
authorised maintainers may also commit directly to `main`. There is no automated
approval requirement or guaranteed response window. If a review stalls, follow up
on the pull request; keep the next action or any blocking issue visible there.

Changes are accepted under the [BSD 3-Clause licence](LICENSE). There is no separate
contributor licence agreement.
