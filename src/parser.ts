/**
 * The outcome of a single build task, as recorded in the log.
 *
 * `incomplete` means the log contains a `Started` event with no matching
 * `Succeeded` or `Failed` event — usually a build that was interrupted.
 */
export type TaskStatus = "succeeded" | "failed" | "incomplete";

/**
 * One build task reconstructed from the log.
 */
export interface TaskRecord {
  /** Recipe the task belongs to, for example `pkg-fastrpc`. */
  recipe: string;
  /** Task name, for example `do_compile`. */
  task: string;
  /** Final status of the task. */
  status: TaskStatus;
  /** When the task started. Absent when the log has no `Started` event for it. */
  startedAt?: Date;
  /** When the task finished. Absent for `incomplete` tasks. */
  endedAt?: Date;
  /**
   * Wall-clock duration in seconds, `endedAt - startedAt`.
   * Absent when either timestamp is missing.
   */
  durationSeconds?: number;
}

/**
 * The result of parsing a build log.
 */
export interface ParseResult {
  /** Every task found in the log, in the order its first event appears. */
  tasks: TaskRecord[];
  /** Number of lines that did not match the expected format and were skipped. */
  skippedLines: number;
}

/**
 * Matches one log line: `<ISO-8601 timestamp> <recipe> <task> <event>`.
 * Example: `2026-09-10T14:02:11Z pkg-fastrpc do_compile Started`.
 */
const LINE_PATTERN = /^(\S+)\s+(\S+)\s+(do_\w+)\s+(Started|Succeeded|Failed)$/;

/**
 * Parse a QLI build log into per-task records.
 *
 * Each log line must have the form `<ISO-8601 timestamp> <recipe> <task>
 * <Started|Succeeded|Failed>`. Blank lines are ignored. Any other line is
 * counted in {@link ParseResult.skippedLines} and does not stop the parse.
 *
 * @param text - Full contents of the build log.
 * @returns The reconstructed tasks and the count of skipped lines.
 *
 * @example
 * ```ts
 * const result = parseBuildLog(
 *   "2026-09-10T14:02:11Z pkg-fastrpc do_compile Started\n" +
 *     "2026-09-10T14:03:05Z pkg-fastrpc do_compile Succeeded\n",
 * );
 * console.log(result.tasks[0].durationSeconds); // 54
 * ```
 */
export function parseBuildLog(text: string): ParseResult {
  const tasks = new Map<string, TaskRecord>();
  let skippedLines = 0;

  for (const line of text.split("\n")) {
    if (line.trim() === "") {
      continue;
    }
    const match = LINE_PATTERN.exec(line.trim());
    if (match === null) {
      skippedLines += 1;
      continue;
    }
    const [, timestamp = "", recipe = "", task = "", event = ""] = match;
    const at = new Date(timestamp);
    if (Number.isNaN(at.getTime())) {
      skippedLines += 1;
      continue;
    }

    const key = `${recipe} ${task}`;
    let record = tasks.get(key);
    if (record === undefined) {
      record = { recipe, task, status: "incomplete" };
      tasks.set(key, record);
    }

    if (event === "Started") {
      record.startedAt = at;
    } else {
      record.endedAt = at;
      record.status = event === "Succeeded" ? "succeeded" : "failed";
    }
    if (record.startedAt !== undefined && record.endedAt !== undefined) {
      record.durationSeconds =
        (record.endedAt.getTime() - record.startedAt.getTime()) / 1000;
    }
  }

  return { tasks: [...tasks.values()], skippedLines };
}
