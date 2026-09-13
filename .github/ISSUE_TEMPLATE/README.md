# Issue templates

GitHub offers these forms when someone opens an issue. Each template's YAML front
matter has two required string fields: `name` labels the template in the chooser,
and `about` describes when to use it. Neither has an implicit value. The remaining
Markdown supplies the questions shown to the reporter.

## Files

- [README.md](README.md) — Describes the templates and their configuration.
- [bug_report.md](bug_report.md) — Collects the problem, reproduction, expected and actual results, and relevant environment.
- [feature_request.md](feature_request.md) — Collects the need, proposed change, alternatives, and expected result.

The forms adapt the
[Qualcomm Linux pkg-fastrpc templates](https://github.com/qualcomm-linux/pkg-fastrpc/tree/9b1a916be3d29fa184feb16995a4db403d91aa59/.github)
to the skeleton's scope. The upstream notice is retained in [LICENSE](../../LICENSE).
