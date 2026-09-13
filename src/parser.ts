/**
 * The outcome of a single build task, as recorded in the log.
 *
 * `incomplete` means the latest attempt has started but has no completion event.
 */
export type TaskStatus = "succeeded" | "failed" | "incomplete";

/**
 * The latest attempt at one recipe/task pair, reconstructed in input order.
 */
export interface TaskRecord {
  /** Recipe that the task belongs to, for example `pkg-fastrpc`. */
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
   * Elapsed time between `startedAt` and `endedAt`, in seconds.
   * Absent when either timestamp is missing.
   */
  durationSeconds?: number;
}

/**
 * The result of parsing a build log.
 */
export interface ParseResult {
  /** Every task found in the log, ordered by its first event. */
  tasks: TaskRecord[];
  /** Nonblank lines rejected for invalid syntax, dates, or event order. */
  skippedLines: number;
}

/**
 * Matches the example's UTC log format, with optional millisecond precision.
 * Example: `2026-09-10T14:02:11Z pkg-fastrpc do_compile Started`.
 */
const LINE_PATTERN = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z)\s+([\w.+:-]+)\s+(do_\w+)\s+(Started|Succeeded|Failed)$/;

/**
 * Parse the example log format into the latest attempt for each recipe/task pair.
 *
 * Each line contains a UTC timestamp, recipe, task, and Started/Succeeded/Failed.
 * Timestamps use YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ. This is
 * the repository's sample format; raw BitBake output requires conversion.
 *
 * A new Started event resets that task's previous attempt. A completion without
 * a start is retained without a duration. Invalid dates, out-of-order events
 * for the same task, and repeated completion events increment skippedLines.
 * Blank lines are ignored. Different tasks may overlap in time.
 *
 * @param text - Full contents of the build log.
 * @returns The reconstructed tasks and the number of skipped lines.
 *
 * @example
 * ```ts
 * const result = parseBuildLog(
 *   "2026-09-10T14:02:11Z pkg-fastrpc do_compile Started\n" +
 *     "2026-09-10T14:03:05Z pkg-fastrpc do_compile Succeeded\n",
 * );
 * console.log(result.tasks[0]?.durationSeconds); // 54
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
    const canonicalTimestamp = timestamp.includes(".") ? timestamp : timestamp.replace("Z", ".000Z");
    if (Number.isNaN(at.getTime()) || at.toISOString() !== canonicalTimestamp) {
      skippedLines += 1;
      continue;
    }

    const key = `${recipe} ${task}`;
    let record = tasks.get(key);
    const previousTime = record?.endedAt ?? record?.startedAt;
    if (
      (previousTime !== undefined && at < previousTime) ||
      (event !== "Started" && record?.endedAt !== undefined)
    ) {
      skippedLines += 1;
      continue;
    }
    if (record === undefined) {
      record = { recipe, task, status: "incomplete" };
      tasks.set(key, record);
    }

    if (event === "Started") {
      record.startedAt = at;
      record.status = "incomplete";
      delete record.endedAt;
      delete record.durationSeconds;
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
