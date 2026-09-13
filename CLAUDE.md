# Working on this example

Keep the repository a small, complete demonstration of the
[pinned checklist](https://github.com/devdocsorg/qli2-deliverables-portal/blob/a462ebf8ebff6b45f9659349fd725ccca0e19908/docs/qualcomm-developer-ecosystem/github-repositories/audits/required-files-checklist.md).
The synthetic log format is intentionally narrow. Do not imply compatibility with
raw QLI logs or add services, runtime dependencies, or settings without a concrete need.

- Read README.md, CONTRIBUTING.md, and CONFIGURATION.md before changing behaviour.
- Document named functions beside the code, including inputs, outputs, errors, and an example.
- Update the affected folder inventories and tutorial when files or behaviour change.
- Generate docs/reference/API.md with `npm run docs`; do not edit it manually.
- Run `npm run check` before committing. CI also checks that generated docs are committed.
- Preserve the existing licence and verified owner/reporting routes.
- Work on main or a short-lived branch. Do not modify the frozen release/1.0 branch or existing tags.
