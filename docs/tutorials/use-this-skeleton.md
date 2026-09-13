# Start a repository from the skeleton

This walkthrough creates a repository containing the required documentation and
contribution structure, ready for the project's implementation.

## Prerequisites

- A GitHub account with access to the skeleton.
- Permission to create a repository in the destination account or organisation.
- The project's purpose, maintainers, contribution destination, and approved reporting routes.

## 1. Create the repository

Open [Use this template](https://github.com/devdocsorg/qli2-example-repo/generate),
choose the owner, repository name, and appropriate visibility, then select
**Create repository from template**. Use the `main` branch as the starting point.

GitHub creates a separate repository with the skeleton's files and a fresh commit
history. See [GitHub's template instructions](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

## 2. Make the required files specific to the project

| File | Set for the new repository |
| --- | --- |
| [README.md](../../README.md) | Project name, purpose, actual first-use steps, support channel, branch table, and file inventory. |
| [BRANCHES.md](../../BRANCHES.md) | Each real long-lived branch, its maintenance status, and relationship to `main`. |
| [CONTRIBUTING.md](../../CONTRIBUTING.md) | Contribution destination, real validation commands, and review process. |
| [CODEOWNERS](../../.github/CODEOWNERS) | Visible maintainers and documentation reviewers with write access to the destination repository. |
| [SECURITY.md](../../SECURITY.md) and [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md) | The responsible team's private reporting routes and applicable policies. |
| [LICENSE](../../LICENSE) | The project's approved licence, retaining notices required for material you reuse. |
| [Issue templates](../../.github/ISSUE_TEMPLATE/README.md) and [PR template](../../.github/PULL_REQUEST_TEMPLATE/README.md) | Questions suited to the project and links to its contribution and security policies. |

Search the copied files for `qli2-example-repo`, `DevDocs`, `devdocsorg`, and
`devdocs.work`. Update project identity, contribution links, owner teams, and
reporting contacts to their real destinations. Keep source attribution and licence
notices where they apply. In the contribution link, retain
`template=pr_template.md` while changing the repository destination.

## 3. Add the implementation and its documentation together

Choose the language and tools for the actual project. When adding a folder, include
its `README.md` and update its parent's inventory. Dot-prefixed folders themselves
take no README; list their contents in the nearest parent README.

Document functions and configuration using the
[reference guidance](../reference/README.md). Fill in [.env.example](../../.env.example)
only for settings the project actually uses. Document and verify the first build
or run command when the project has one.

Replace this adoption walkthrough with a tutorial for the project's real output,
including prerequisites, ordered steps, and an observed expected result. Update the
[tutorial index](README.md) when doing so.

## Expected result

The new repository identifies its purpose and maintainers, routes contributions
and private reports correctly, and contains the required documentation locations.
Its initial contents are documentation and repository configuration. The language,
application, dependencies, and build process are decisions for that project.

Before presenting the new repository as checklist-complete, run its documented
first-use steps, publish the reference for any implemented functions, and check
all inventories and links against the
[Required Files Checklist](https://github.com/devdocsorg/qli2-deliverables-portal/blob/a462ebf8ebff6b45f9659349fd725ccca0e19908/docs/qualcomm-developer-ecosystem/github-repositories/audits/required-files-checklist.md).
