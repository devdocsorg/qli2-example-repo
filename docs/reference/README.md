# qli-buildlog-summary

Public API of the QLI Build Log Summarizer.

## Interfaces

### BuildSummary

Defined in: [summary.ts:6](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/summary.ts#L6)

Aggregated summary of a build log.

#### Properties

##### failedTasks

> **failedTasks**: [`TaskRecord`](#taskrecord)[]

Defined in: [summary.ts:10](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/summary.ts#L10)

Tasks whose final event was `Failed`, in log order.

##### incompleteTasks

> **incompleteTasks**: [`TaskRecord`](#taskrecord)[]

Defined in: [summary.ts:12](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/summary.ts#L12)

Tasks with no `Succeeded` or `Failed` event, in log order.

##### skippedLines

> **skippedLines**: `number`

Defined in: [summary.ts:18](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/summary.ts#L18)

Number of log lines the parser skipped, copied from the parse result.

##### slowestTasks

> **slowestTasks**: [`TaskRecord`](#taskrecord)[]

Defined in: [summary.ts:14](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/summary.ts#L14)

The longest-running tasks, slowest first.

##### taskCount

> **taskCount**: `number`

Defined in: [summary.ts:8](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/summary.ts#L8)

Total number of tasks found in the log.

##### totalDurationSeconds

> **totalDurationSeconds**: `number`

Defined in: [summary.ts:16](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/summary.ts#L16)

Sum of all measured task durations, in seconds.

***

### ParseResult

Defined in: [parser.ts:33](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/parser.ts#L33)

The result of parsing a build log.

#### Properties

##### skippedLines

> **skippedLines**: `number`

Defined in: [parser.ts:37](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/parser.ts#L37)

Number of lines skipped because they did not match the expected format.

##### tasks

> **tasks**: [`TaskRecord`](#taskrecord)[]

Defined in: [parser.ts:35](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/parser.ts#L35)

Every task found in the log, ordered by its first event.

***

### TaskRecord

Defined in: [parser.ts:12](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/parser.ts#L12)

One build task reconstructed from the log.

#### Properties

##### durationSeconds?

> `optional` **durationSeconds?**: `number`

Defined in: [parser.ts:27](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/parser.ts#L27)

Elapsed time between `startedAt` and `endedAt`, in seconds.
Absent when either timestamp is missing.

##### endedAt?

> `optional` **endedAt?**: `Date`

Defined in: [parser.ts:22](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/parser.ts#L22)

When the task finished. Absent for `incomplete` tasks.

##### recipe

> **recipe**: `string`

Defined in: [parser.ts:14](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/parser.ts#L14)

Recipe that the task belongs to, for example `pkg-fastrpc`.

##### startedAt?

> `optional` **startedAt?**: `Date`

Defined in: [parser.ts:20](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/parser.ts#L20)

When the task started. Absent when the log has no `Started` event for it.

##### status

> **status**: [`TaskStatus`](#taskstatus)

Defined in: [parser.ts:18](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/parser.ts#L18)

Final status of the task.

##### task

> **task**: `string`

Defined in: [parser.ts:16](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/parser.ts#L16)

Task name, for example `do_compile`.

## Type Aliases

### TaskStatus

> **TaskStatus** = `"succeeded"` \| `"failed"` \| `"incomplete"`

Defined in: [parser.ts:7](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/parser.ts#L7)

The outcome of a single build task, as recorded in the log.

`incomplete` means the log contains a `Started` event with no matching
`Succeeded` or `Failed` event, usually because the build was interrupted.

## Functions

### formatSummary()

> **formatSummary**(`summary`, `format?`): `string`

Defined in: [summary.ts:72](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/summary.ts#L72)

Render a build summary as text or JSON.

#### Parameters

##### summary

[`BuildSummary`](#buildsummary)

Output of [summarizeBuild](#summarizebuild).

##### format?

`"text"` \| `"json"`

`text` for a human-readable report or `json` for
  machine-readable output. Optional; defaults to `text`.

#### Returns

`string`

The rendered summary, without a trailing newline.

#### Example

```ts
console.log(formatSummary(summary, "text"));
// Tasks: 8 (1 failed, 0 incomplete)
// ...
```

***

### parseBuildLog()

> **parseBuildLog**(`text`): [`ParseResult`](#parseresult)

Defined in: [parser.ts:65](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/parser.ts#L65)

Parse a QLI build log into per-task records.

Each log line must have the form `<ISO-8601 timestamp> <recipe> <task>
<Started|Succeeded|Failed>`. Blank lines are ignored. Lines that do not match
are counted in [ParseResult.skippedLines](#skippedlines-1); parsing continues.

#### Parameters

##### text

`string`

Full contents of the build log.

#### Returns

[`ParseResult`](#parseresult)

The reconstructed tasks and the number of skipped lines.

#### Example

```ts
const result = parseBuildLog(
  "2026-09-10T14:02:11Z pkg-fastrpc do_compile Started\n" +
    "2026-09-10T14:03:05Z pkg-fastrpc do_compile Succeeded\n",
);
console.log(result.tasks[0].durationSeconds); // 54
```

***

### summarizeBuild()

> **summarizeBuild**(`result`, `options?`): [`BuildSummary`](#buildsummary)

Defined in: [summary.ts:35](https://github.com/devdocsorg/qli2-example-repo/blob/main/src/summary.ts#L35)

Summarize a parsed build log.

#### Parameters

##### result

[`ParseResult`](#parseresult)

Output of [parseBuildLog](#parsebuildlog).

##### options?

Optional settings. `slowestCount` limits the number of tasks
  in the slowest-task list; it defaults to 3 and must be a non-negative integer.

###### slowestCount?

`number`

#### Returns

[`BuildSummary`](#buildsummary)

Counts, failures, and the slowest tasks for the build.

#### Example

```ts
const summary = summarizeBuild(parseBuildLog(logText), { slowestCount: 5 });
console.log(summary.failedTasks.length); // 1
```
