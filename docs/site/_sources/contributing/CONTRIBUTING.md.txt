# Contributing

Improvements to this skeleton belong in this repository, targeting `main`.
Follow the {download}`Code of Conduct <../../../CODE_OF_CONDUCT.md>`. Use
{download}`SECURITY.md <../../../SECURITY.md>` for private vulnerability reports.

## Scope

Keep the skeleton reusable across implementation languages and projects.
Tie each file to an explicit requirement in the
[checklist](https://github.com/devdocsorg/qli2-deliverables-portal/blob/d64a7e14ffaf3b3632b63e6ee5e1b32f3c2bd17b/docs/qualcomm-developer-ecosystem/github-repositories/audits/required-files-checklist.md).
`.gitignore` is the supporting exception: it keeps local environment settings out
of commits. Consolidate guidance where one file can satisfy multiple requirements.
Application code, sample products, and their toolchains belong in repositories
created from the skeleton.

## Set up your development environment

Follow [DEVELOPMENT.md](DEVELOPMENT.md) for the concrete clone, dependency, build,
and local-browser validation walkthrough. Use it as the example to adapt when
adding the project's implementation toolchain.

## Review a change

- Check the wording against the requirement it implements and the actual repository state.
- Check local links and every affected README's index: link every immediate file and subfolder in its Files and Folders sections, with a one-sentence purpose.
- Use exactly `README.md`; dot-prefixed folders and their descendants take no README. Generated website output keeps its generated navigation.
- Confirm that owner teams and private reporting routes are appropriate.
- Walk through any changed adoption instructions and record the result.
- Preserve existing guide content and notices when moving pages; keep one authoritative home for each procedure.
- When adding implementation functions, install the native extractor, integrate its reference, and add a failing coverage check for undocumented or omitted functions.
- For a Qualcomm component, generate its nearby view from the shared ecosystem map and verify the recorded source revision.

The skeleton contains documentation and repository configuration. Rebuild its
documentation and check navigation and search from `docs/site/index.html` before
submitting. It has no application build or application test command.

## Submit a change

[Open a pull request with the template](https://github.com/devdocsorg/qli2-example-repo/compare?expand=1&template=pr_template.md).
Choose `main` as the base and your change branch as the head. Explain the reason
for the change and what you verified. Maintainers may also commit directly to `main`.
[CODEOWNERS](../../../.github/CODEOWNERS) identifies the source and documentation reviewers.

Changes to the skeleton use the [repository's licence](../../../LICENSE).
