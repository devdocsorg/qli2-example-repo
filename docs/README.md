# Use the repository skeleton

This tutorial creates a repository with the required documentation and contribution
structure, ready for the project's implementation.

## Prerequisites

- A GitHub account with access to the skeleton.
- Permission to create a repository in the destination account or organisation.
- The project's purpose, maintainers, contribution destination, and approved reporting routes.

## 1. Create the repository

Open [Use this template](https://github.com/devdocsorg/qli2-example-repo/generate),
choose the owner, repository name, and appropriate visibility, then select
**Create repository from template**. Use `main` as the starting point.

GitHub creates a separate repository with the skeleton's files and a fresh commit
history. See [GitHub's template instructions](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

## 2. Set the project's identity and maintainers

| File | Set for the new repository |
| --- | --- |
| [README.md](../README.md) | Project name, purpose, actual first-use steps, support channel, branch table, and file inventory. |
| [BRANCHES.md](../BRANCHES.md) | Each real long-lived branch, its maintenance status, and relationship to `main`. |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Contribution destination, real validation commands, and review process. |
| [CODEOWNERS](../.github/CODEOWNERS) | Visible maintainers and documentation reviewers with write access to the destination repository. |
| [SECURITY.md](../SECURITY.md) and [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) | The responsible team's private reporting routes and applicable policies. |
| [LICENSE](../LICENSE) | The project's approved licence, retaining notices required for material you reuse. |
| [Issue templates](../.github/ISSUE_TEMPLATE/) and [PR template](../.github/PULL_REQUEST_TEMPLATE/pr_template.md) | Questions suited to the project and links to its contribution and security policies. |

Search the copied files for `qli2-example-repo`, `DevDocs`, `devdocsorg`, and
`devdocs.work`. Update project identity, contribution links, owner teams, and
reporting contacts to their real destinations. Preserve applicable source
attribution and licence notices. Keep `template=pr_template.md` in the contribution
link while changing the repository destination.

## 3. Add implementation and documentation together

Choose the language and tools for the actual project. Each maintained source folder
needs a `README.md` containing its description and index. Use Folders and Files
sections to link every immediate subfolder and file with a one-sentence purpose,
and keep the index current when contents change. Keep the index inside `README.md`.
Dot-prefixed folders and their descendants take no README; link the hidden folder
from its parent's index. Generated website output keeps its generated navigation;
link the output folder and rebuild instructions from its parent's README.

Document each function, including internal helpers, using the language's standard
comments: purpose, parameter and return types, an example, and relevant failure
behaviour. Choose the language's documentation generator, document its command,
and link the generated reference from the root README. The
[function-documentation requirement](https://github.com/devdocsorg/qli2-deliverables-portal/blob/95b860fa3ed603ca32ee5aa4b1e766384d9c8b4d/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/function-documentation.md)
provides the format. Function documentation becomes applicable when functions exist.

For every configuration setting, document its purpose, type, required or optional
status, behaviour when unset, and a safe value. Use commented
[.env.example](../.env.example) entries for environment settings, and an adjacent
documented schema or example for formats without comments. Verify the actual
loading command and precedence.

Replace this adoption tutorial with a walkthrough of the project's real output,
including prerequisites, ordered steps, and an observed expected result. Update
the root README's links and the file inventory below when doing so.

## Expected result

The new repository identifies its purpose and maintainers, routes contributions
and private reports correctly, and contains the required documentation structure.
Before presenting it as checklist-complete, verify its documented first-use steps,
reference for any implemented functions, file inventories, and links against the
[Required Files Checklist](https://github.com/devdocsorg/qli2-deliverables-portal/blob/95b860fa3ed603ca32ee5aa4b1e766384d9c8b4d/docs/qualcomm-developer-ecosystem/github-repositories/audits/required-files-checklist.md).

## Configuration reference

- [.env.example](../.env.example) defines no variables or loading mechanism; its comments specify the information to provide for each real setting.
- [.gitignore](../.gitignore) excludes `.env` and `.env.*` at any folder depth, with an exception for `.env.example`.
- [CODEOWNERS](../.github/CODEOWNERS) documents path matching and the actual reviewer teams inline.

### Issue templates

GitHub offers the [issue templates](../.github/ISSUE_TEMPLATE/) when someone opens
an issue. Each template's YAML front matter has two required string fields:
`name` labels the template in the chooser, and `about` describes when to use it.
Neither has an implicit value. The remaining Markdown supplies the questions shown
to the reporter.

### Pull request template

[CONTRIBUTING.md](../CONTRIBUTING.md) links to GitHub's compare form using
`template=pr_template.md` to select the [template](../.github/PULL_REQUEST_TEMPLATE/pr_template.md).
Keep that parameter when updating the link for a new repository; otherwise GitHub
may not select this named file.

The issue and pull request forms adapt the
[Qualcomm Linux pkg-fastrpc templates](https://github.com/qualcomm-linux/pkg-fastrpc/tree/9b1a916be3d29fa184feb16995a4db403d91aa59/.github)
to the skeleton's scope. The upstream notice is retained in [LICENSE](../LICENSE).

## Files

- [README.md](README.md) — Provides the required usage tutorial and the skeleton's configuration reference.
