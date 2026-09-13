# qli-buildlog-summary

Public API of the QLI Build Log Summarizer.

## Interfaces

### BuildSummary

Defined in: [src/summary.ts:6](https://github.com/devdocsorg/qli2-example-repo/blob/main/summary.ts#L6)

Aggregated summary of a build log.

#### Properties

##### failedTasks

> **failedTasks**: [`TaskRecord`](#taskrecord)[]

Defined in: [src/summary.ts:10](https://github.com/devdocsorg/qli2-example-repo/blob/main/summary.ts#L10)

Tasks whose final event was `Failed`, in log order.

##### incompleteTasks

> **incompleteTasks**: [`TaskRecord`](#taskrecord)[]

Defined in: [src/summary.ts:12](https://github.com/devdocsorg/qli2-example-repo/blob/main/summary.ts#L12)

Tasks whose latest attempt has no completion event, in first-seen order.

##### skippedLines

> **skippedLines**: `number`

Defined in: [src/summary.ts:18](https://github.com/devdocsorg/qli2-example-repo/blob/main/summary.ts#L18)

Number of log lines the parser skipped, copied from the parse result.

##### slowestTasks

> **slowestTasks**: [`TaskRecord`](#taskrecord)[]

Defined in: [src/summary.ts:14](https://github.com/devdocsorg/qli2-example-repo/blob/main/summary.ts#L14)

The longest-running tasks, slowest first.

##### taskCount

> **taskCount**: `number`

Defined in: [src/summary.ts:8](https://github.com/devdocsorg/qli2-example-repo/blob/main/summary.ts#L8)

Total number of tasks found in the log.

##### totalDurationSeconds

> **totalDurationSeconds**: `number`

Defined in: [src/summary.ts:16](https://github.com/devdocsorg/qli2-example-repo/blob/main/summary.ts#L16)

Sum of measured latest-attempt durations in seconds, not wall-clock time.

***

### ParseResult

Defined in: [src/parser.ts:32](https://github.com/devdocsorg/qli2-example-repo/blob/main/parser.ts#L32)

The result of parsing a build log.

#### Properties

##### skippedLines

> **skippedLines**: `number`

Defined in: [src/parser.ts:36](https://github.com/devdocsorg/qli2-example-repo/blob/main/parser.ts#L36)

Nonblank lines rejected for invalid syntax, dates, or event order.

##### tasks

> **tasks**: [`TaskRecord`](#taskrecord)[]

Defined in: [src/parser.ts:34](https://github.com/devdocsorg/qli2-example-repo/blob/main/parser.ts#L34)

Every task found in the log, ordered by its first event.

***

### TaskRecord

Defined in: [src/parser.ts:11](https://github.com/devdocsorg/qli2-example-repo/blob/main/parser.ts#L11)

The latest attempt at one recipe/task pair, reconstructed in input order.

#### Properties

##### durationSeconds?

> `optional` **durationSeconds?**: `number`

Defined in: [src/parser.ts:26](https://github.com/devdocsorg/qli2-example-repo/blob/main/parser.ts#L26)

Elapsed time between `startedAt` and `endedAt`, in seconds.
Absent when either timestamp is missing.

##### endedAt?

> `optional` **endedAt?**: `Date`

Defined in: [src/parser.ts:21](https://github.com/devdocsorg/qli2-example-repo/blob/main/parser.ts#L21)

When the task finished. Absent for `incomplete` tasks.

##### recipe

> **recipe**: `string`

Defined in: [src/parser.ts:13](https://github.com/devdocsorg/qli2-example-repo/blob/main/parser.ts#L13)

Recipe that the task belongs to, for example `pkg-fastrpc`.

##### startedAt?

> `optional` **startedAt?**: `Date`

Defined in: [src/parser.ts:19](https://github.com/devdocsorg/qli2-example-repo/blob/main/parser.ts#L19)

When the task started. Absent when the log has no `Started` event for it.

##### status

> **status**: [`TaskStatus`](#taskstatus)

Defined in: [src/parser.ts:17](https://github.com/devdocsorg/qli2-example-repo/blob/main/parser.ts#L17)

Final status of the task.

##### task

> **task**: `string`

Defined in: [src/parser.ts:15](https://github.com/devdocsorg/qli2-example-repo/blob/main/parser.ts#L15)

Task name, for example `do_compile`.

## Type Aliases

### TaskStatus

> **TaskStatus** = `"succeeded"` \| `"failed"` \| `"incomplete"`

Defined in: [src/parser.ts:6](https://github.com/devdocsorg/qli2-example-repo/blob/main/parser.ts#L6)

The outcome of a single build task, as recorded in the log.

`incomplete` means the latest attempt has started but has no completion event.

## Functions

### formatSummary()

> **formatSummary**(`summary`, `format?`): `string`

Defined in: [src/summary.ts:77](https://github.com/devdocsorg/qli2-example-repo/blob/main/summary.ts#L77)

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

#### Throws

TypeError When format is neither text nor json.

#### Example

```ts
console.log(formatSummary(summarizeBuild(parseBuildLog(""))));
// Tasks: 0 (0 failed, 0 incomplete)
// Total task time: 0s
```

***

### parseBuildLog()

> **parseBuildLog**(`text`): [`ParseResult`](#parseresult)

Defined in: [src/parser.ts:69](https://github.com/devdocsorg/qli2-example-repo/blob/main/parser.ts#L69)

Parse the example log format into the latest attempt for each recipe/task pair.

Each line contains a UTC timestamp, recipe, task, and Started/Succeeded/Failed.
Timestamps use YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ. This is
the repository's sample format; raw BitBake output requires conversion.

A new Started event resets that task's previous attempt. A completion without
a start is retained without a duration. Invalid dates, out-of-order events
for the same task, and repeated completion events increment skippedLines.
Blank lines are ignored. Different tasks may overlap in time.

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
console.log(result.tasks[0]?.durationSeconds); // 54
```

***

### summarizeBuild()

> **summarizeBuild**(`result`, `options?`): [`BuildSummary`](#buildsummary)

Defined in: [src/summary.ts:36](https://github.com/devdocsorg/qli2-example-repo/blob/main/summary.ts#L36)

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

#### Throws

RangeError When slowestCount is not a non-negative safe integer.

#### Example

```ts
const summary = summarizeBuild(parseBuildLog(""), { slowestCount: 0 });
console.log(summary.taskCount); // 0
```
