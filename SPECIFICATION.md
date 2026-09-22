# Repository documentation specification

## Scope and authority

This is the canonical specification for upgrading Qualcomm implementation
repositories and adopting this skeleton. It defines the minimum useful result:
readers can understand, use, and contribute to a repository, browse its generated
documentation locally, and understand its place in the Qualcomm ecosystem.
**Must** identifies an acceptance requirement; examples illustrate implementations.

Maintain this file only in
[the skeleton repository](https://github.com/devdocsorg/qli2-example-repo/blob/main/SPECIFICATION.md).
Other repositories, portal pages, skills, and PRs must link here instead of copying
it. A repository created from the template must remove its copied
`SPECIFICATION.md` and retain a link to this canonical version. Record the spec
commit used in the upgrade PR so the result can be reviewed against a fixed version.
Requirements describe the adopted repository. A review proposal uses working links
to its proposed files; it does not link to files that do not yet exist on `main` or
change another branch merely to satisfy their eventual placement.

Keep the implementation small: reuse working documentation and tools, add only
applicable scaffolding, and give each subject and command one maintained home.
MVP scope does not permit losing content, skipping required files, or omitting
known repository connections. This specification does not require changing product
behaviour, building an entire OS image for a documentation change, introducing
another documentation framework, or publishing a website.

## Required files checklist

The table below copies the complete required-files checklist from the
[Required Files Checklist in the deliverables portal](https://qli2-deliverables-portal.vercel.app/qualcomm-developer-ecosystem/github-repositories/audits/required-files-checklist/).
Its [source revision](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/audits/required-files-checklist.md)
identifies the incorporated text. Template links are examples; the requirements
are maintained here.

| Required File | Purpose and required content |
| --- | --- |
| [Overall README](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/readme.md) | Introduce the repository: its purpose, first build or run step, and support channel. Explain **every branch**, including its purpose, status, and whether to build from it or send contributions to it. Link to `BRANCHES.md` on `main`, reference documentation and tutorial. Include the root folder's index in Folders and Files sections, linking every root item with a one-sentence purpose. |
| [Folder index in `README.md`](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/folder-readme.md) in every eligible folder | Describe the folder and include its index in Folders and Files sections. Link to every immediate file and subfolder and explain its purpose in one sentence. Update the index when contents change. At the root, include it in the project README. Folders prefixed with `.`, such as `.github/`, and their descendants take no README; list the hidden folder in its parent's README instead. |
| [`BRANCHES.md`](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/branches.md) on `main` | List each long-lived branch, why it exists, and whether it is intended to merge back into `main` or be maintained separately. Link to `BRANCHES.md` from the README. |
| [Function documentation](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/function-documentation.md) | Document each function using the language's standard documentation-comment format, such as JSDoc for JavaScript. Give the function's purpose in one sentence, the relevant parameter and return types, and an example. Install and configure the language-specific extractor and its runtime, then generate a browsable reference from these comments. Pin the toolchain, include internal functions, and make local/CI validation fail on missing documentation or missing reference entries. A prose-only site build does not satisfy this requirement. |
| [Locally browsable documentation site](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/documentation-site.md) | Keep authoritative source and generated output separate. A reader must be able to open the generated `index.html` directly and navigate the site without a local HTTP server. Bundle assets and any search functionality; validate a copied site under `file://` with networking disabled. |
| [Repository ecosystem map and nearby view](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/repository-map.md) | Maintain the full Qualcomm ecosystem Mermaid map in a dedicated private repository's README. At the bottom of each implementation repository's root README, show a Mermaid view with clickable nodes covering every recorded incoming, outgoing, optional, and indirect build/component relationship. Omit standalone automation diagrams and their corresponding text; automation connections may remain in mixed component diagrams. Draw indirect paths through their actual intermediates and use plain-language connection verbs. Audit source references against the dataset; concise presentation must not omit known connections. Keep detailed evidence centrally and link to it once. Record export provenance in metadata. Keep maps out of Sphinx sources and generated websites. |
| [Configuration documentation](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/configuration.md) | Document each configuration line with its purpose, type, optional/default behaviour, and a safe example value. Include a commented `.env.example`. Use an adjacent documented schema or example for formats that do not support comments. |
| **At least one usage tutorial per repository** | Show how to use the repository's output, with prerequisites, ordered steps, and an expected result. The tutorial can live in the product's technical documentation or the repository. |
| [`LICENSE`](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/license.md) | Give readers the project's approved licence text. Keep the file at the repository root. |
| [`CODEOWNERS`](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/codeowners.md) | Identify who reviews documentation changes. Assign the appropriate maintainers to documentation paths. |
| [`CONTRIBUTING.md`](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/contributing.md) | Explain how to contribute and where contributions should be submitted. Link a concrete development-environment walkthrough in the contributor area: checkout, prerequisites and versions, dependency and documentation-tool installation, configuration, build/check commands, and observable expected results. |
| [`CODE_OF_CONDUCT.md`](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/code-of-conduct.md) | State the expected behaviour for participants and how to report conduct concerns. |
| [`SECURITY.md`](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/security.md) | Give readers a private route for reporting vulnerabilities. |
| [`.github/ISSUE_TEMPLATE/`](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/issue-templates.md) | Ask issue reporters for the information maintainers need to understand the problem or request. |
| [`.github/PULL_REQUEST_TEMPLATE/`](https://github.com/devdocsorg/qli2-deliverables-portal/blob/8c358c87e35a25615bfb9703bc7fce7353f40be8/docs/qualcomm-developer-ecosystem/github-repositories/required-file-templates/pull-request-templates.md) | Provide pull request templates that ask contributors for the information needed to review a change. Use a pull request creation link with the `template` URL parameter to select the appropriate file. |

Verify that contacts, reporting forms, owner teams, and contribution destinations
belong to the actual project. Template placeholders are valid in the reusable
skeleton; they must be resolved in an upgraded implementation repository.

## Content ownership and preservation

Before editing, inventory existing guides, examples, references, policies, agent
instructions, skills, configuration, branch guidance, and links. Account for each
item in the upgrade's review record: retained, moved with links repaired, or
consolidated into a named authoritative home. Preserve meaning, useful detail,
licence notices, and correct contribution routing. Compare against the base
revision; an added-file list alone does not demonstrate preservation.

Use this layout unless an established, better-maintained documentation home
already serves the project:

| Home | Responsibility |
| --- | --- |
| Root `README.md` | Project orientation, first use, navigation, folder/file indexes, and the nearby map. |
| `docs/source/` | Authoritative documentation and its build configuration. |
| `docs/source/contributing/` | Contributor setup, contribution procedures, agent instructions, skills, and implementation reference navigation. |
| `docs/source/user/` | Use of the project's output, configuration, and user tutorials. A developer-only tutorial may live with contributor guidance. |
| `docs/site/` | Generated Sphinx HTML and bundled assets, committed with their sources. |
| Required discovery/policy paths | Root governance files, `.github` templates/owners, and concise contribution/agent/skill pointers. |

Keep each procedure and policy in one authored home. Discovery files and relevant
README sections link naturally to that home: contribution text to `CONTRIBUTING.md`,
machine support to its folder, licence text to `LICENSE`, and so on. A path shown
only as code is not a navigation link. Do not duplicate a folder index in `INDEX.md`
or maintain a second API manual beside generated reference pages.

Keep useful existing documentation sites and native reference sites when they are
the better home. Link them and document ownership plus the reproducible build or
export route; do not create a competing site. Generated HTML, API pages, and README
map blocks are derived artifacts, not separate authored responsibilities.

### Folder and branch navigation

Use exactly `README.md` at the root and in every maintained, non-hidden source
folder. Its Folders and Files sections link every immediate tracked item, including
hidden items, with a one-sentence purpose. Dot-prefixed directories and their
descendants take no README. Generated output, caches, and dependencies use their
own navigation and are not maintained source inventories. Link `docs/site/` from
its parent's README to its generated entry point. Omit an empty index section.

The root README accounts for every current branch with purpose, status, use/build
guidance, and contribution destination. `BRANCHES.md` describes long-lived branch
maintenance and merge relationships; link its canonical copy on `main`. Temporary
review branches can be described briefly without duplicating long-lived guidance.

### Organisation defaults and upstream projects

A verified organisation-level public `.github` default may supply contribution,
conduct, security, or issue/PR template content where GitHub supports inheritance.
Record the owning link and applicable default in the review; inherited files are
not present in a clone. Local versions override inherited defaults. Keep root
licence content and valid documentation ownership. Preserve upstream routes for
mirrors and forks; review-only work in a fork does not transfer project ownership.

## Documentation and contributor setup

Use Sphinx for the scaffolded site, with source and output kept separate. The
contributor area must contain a concrete development-environment walkthrough:
checkout, prerequisites and tested versions, dependency/runtime/extractor setup,
configuration, build/check commands, and observable expected results. Link existing
project build procedures instead of rewriting them. Include at least one ordered
usage tutorial for the actual repository output; setup alone is not a user tutorial.

Use one executable build/check entry point locally and in CI. Pin documentation
tools and dependencies, remove stale output during regeneration, retain third-party
asset notices, and commit regenerated output with source changes. Do not hand-edit
HTML or introduce duplicate local/CI command implementations.

### Direct-file browsing

A copied `docs/site/` must work when its `index.html` is opened through `file://`,
without a local HTTP server and with networking disabled. Navigation, relative
`.html` links, heading anchors, assets, and search when offered must work. Bundle
required assets and search data; essential behaviour must not depend on CDNs,
runtime HTTP fetches, or server directory routing. External references may remain
links to their authoritative online homes.

The generated `index.html` may redirect locally to a homepage produced from
`README.md`, with a visible fallback link. That entry point is generated navigation,
not a second authored folder index. For the skeleton's Sphinx setup, disabling
search excerpts avoids fetching local pages while retaining searchable titles.

### Native function reference

Inventory the repository's actual languages and every locally defined function,
including internal helpers and mixed-language files. Use native documentation
comments with purpose, parameter/return types, an example, and relevant failure
behaviour. Install and configure the corresponding extractor and runtime in the
contributor setup, pin them, generate reference entries, and link those entries
from the documentation. Sphinx/MyST rendering prose is not native extraction.

Examples include TypeDoc/JSDoc, Python autodoc, Doxygen, rustdoc, Javadoc, and shdoc.
Choose only tools applicable to the repository. Shell tasks and Python definitions
in BitBake need appropriate handling; calls to upstream functions are not local
definitions. Extraction must not execute build tasks or unsafe module side effects.

Compare an independently discovered function inventory with the extracted entries;
check both missing comments and missing output. Unsupported definitions must fail
with an actionable setup error, not disappear silently. A repository with no
functions can record extraction as inapplicable after inspection and must reassess
when code is added. Do not shape implementation code merely to avoid documentation.

### Configuration

Document every maintained setting's purpose, type/allowed format, required or
optional status, default/unset behaviour, and safe value. Describe loading and
precedence. Use inline comments or one linked reference; formats without comments
need an adjacent schema or example. `.env.example` must contain safe documented
settings, or state that the project has no environment settings. Preserve actual
configuration and secrets handling rather than inventing new runtime controls.

## Repository maps

### Shared ecosystem map

The [Qualcomm repository map](https://github.com/devdocsorg/qualcomm-repository-map)
is a private, map-only repository covering Qualcomm repositories and relevant
external/upstream neighbours. It owns one dataset of repository identities,
relationships, applicability, and evidence. It is not limited to QLI deliverables.
Identify its maintainer and update route; do not apply the implementation-site
scaffold to it or add a docs website.

Its root README contains the full view as several readable Mermaid diagrams grouped
by purpose. Every repository node links to its canonical repository URL. Relationship
records include direction/type, why the connection exists, branch/release or
conditional applicability, and supporting source files pinned to revisions. Do not
infer relationships from names. State inventory and reviewed-relationship coverage
separately; unrecorded does not mean unrelated.

Keep detail in expandable sections, use filenames as evidence-link text, and retain
each distinct evidence destination. Omit standalone automation diagrams and their
corresponding text while preserving their source records. Automation connections
may remain in mixed component diagrams. Use short labels such as “GitHub Actions
integration”; avoid repeating the heading repository or the same explanatory prose.

### Nearby README map

Each implementation repository's local map is the final section of its root
`README.md`, after the file/folder indexes and all other sections. Generate it from
the shared dataset into a marked block, preserving surrounding authored content.
Use clickable Mermaid nodes, highlight the current repository, and link once to
the full map. Do not add a “(private)” suffix to that link.

Include every recorded build/component connection touching the current repository,
in both directions, including optional integrations, consumers, build tools, and
verified indirect paths. Show indirect connections through their actual providers;
each path step must be recorded and evidenced. Do not add a redundant shortcut
arrow when the existing parent path already explains the connection. The scope is
the repository's evidenced neighbourhood, not every dependency of every neighbour.

Audit manifests, included build configurations, selected recipes, workflow
references, and maintained guidance against the dataset before exporting. Follow
includes that determine the build composition, including external hosts. Add missing
verified relationships centrally. Record audited revisions, applicability, and
unresolved coverage; agreement with an incomplete dataset is not source completeness.

Use short verbs describing what endpoints provide, rather than “required” or
“optional” alone. Name each node once per diagram, adding an owner only to resolve
ambiguity. Split large views without dropping known connections. Keep revision and
dataset-digest provenance in a source comment and access/setup details in contributor
guidance. Use the shared repository's existing export and validation commands.

**Maps live only in root READMEs. Sphinx must not read, copy, write, or render them.**
Do not create map source pages, generated site copies, or intermediate map documents.
Map export is independent of documentation generation. The skeleton supplies a
small reusable map with replaceable repository, link, and connection fields; adopted
repositories replace these with verified facts rather than a fictional identity.

## Acceptance

An upgrade is complete when the applicable checks below pass and its PR records
the base revision, specification revision, changes, results, and any real limits.
Record justified inapplicability explicitly; do not report an unrun check as passed.

| Check | Required evidence |
| --- | --- |
| Preservation and scope | Compare original content with named final homes; retain policies, notices, routing, and build behaviour. Review moves/deletions and meaningful source changes. |
| Scaffolding and links | Account for every checklist row, folder index, actual branch, policy/default, and placeholder. Resolve local links and anchors and verify intended external owners/destinations. |
| Contributor and user paths | Exercise documented setup and applicable first-use/check commands, with observable results. Distinguish metadata/build checks from full image or hardware testing. |
| Documentation build | Build strictly from a clean checkout with pinned tools; regenerate the committed site without missing, stale, or unexpected artifacts. CI uses the same executable entry point. |
| Native extraction | Compare discovered functions to documentation and generated entries, including internal/mixed-language definitions. Removing documentation or an entry must fail; newly unsupported definitions must not be silently skipped. |
| Offline browser | Copy only the generated site outside the checkout; open `index.html` in a headless browser with networking disabled. Check navigation, anchors, assets, search when present, browser errors, and network requests. A hosted preview alone is insufficient. |
| Nearby map | Reproduce from its recorded central commit/digest; independently check all incident component relations and indirect paths, source-audit coverage, Mermaid rendering, node links, final README placement, and absence from Sphinx sources/output. |
| Map regressions | Shared checks reject missing incoming, build-tool, optional, and indirect connections, invented edges, and unlinked nodes. A new neighbour appears without an allowlist change. Omitted standalone automation presentation preserves component coverage and retained mixed diagrams. Reuse these checks during recipient updates. |
| Repository checks | Run applicable existing repository/CI checks and report hosted checks separately from local results. Complete test upgrades remain unmerged, reviewable PRs in the authorised fork. |

The [skeleton adoption tutorial](docs/source/user/USAGE.md) provides the working procedure. The
[meta-qcom-3rdparty proposal](https://github.com/devdocsorg/meta-qcom-3rdparty/pull/5)
is an implementation reference, not a second specification.
