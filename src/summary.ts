import type { ParseResult, TaskRecord } from "./parser";

/**
 * Aggregated summary of a build log.
 */
export interface BuildSummary {
  /** Total number of tasks found in the log. */
  taskCount: number;
  /** Tasks whose final event was `Failed`, in log order. */
  failedTasks: TaskRecord[];
  /** Tasks whose latest attempt has no completion event, in first-seen order. */
  incompleteTasks: TaskRecord[];
  /** The longest-running tasks, slowest first. */
  slowestTasks: TaskRecord[];
  /** Sum of measured latest-attempt durations in seconds, not wall-clock time. */
  totalDurationSeconds: number;
  /** Number of log lines the parser skipped, copied from the parse result. */
  skippedLines: number;
}

/**
 * Summarize a parsed build log.
 *
 * @param result - Output of {@link parseBuildLog}.
 * @param options - Optional settings. `slowestCount` limits the number of tasks
 *   in the slowest-task list; it defaults to 3 and must be a non-negative integer.
 * @returns Counts, failures, and the slowest tasks for the build.
 * @throws RangeError When slowestCount is not a non-negative safe integer.
 *
 * @example
 * ```ts
 * const summary = summarizeBuild(parseBuildLog(""), { slowestCount: 0 });
 * console.log(summary.taskCount); // 0
 * ```
 */
export function summarizeBuild(
  result: ParseResult,
  options: { slowestCount?: number } = {},
): BuildSummary {
  const slowestCount = options.slowestCount ?? 3;
  if (!Number.isSafeInteger(slowestCount) || slowestCount < 0) {
    throw new RangeError("slowestCount must be a non-negative safe integer");
  }
  const measured = result.tasks.filter((t) => t.durationSeconds !== undefined);

  return {
    taskCount: result.tasks.length,
    failedTasks: result.tasks.filter((t) => t.status === "failed"),
    incompleteTasks: result.tasks.filter((t) => t.status === "incomplete"),
    slowestTasks: [...measured]
      .sort((a, b) => (b.durationSeconds ?? 0) - (a.durationSeconds ?? 0))
      .slice(0, slowestCount),
    totalDurationSeconds: measured.reduce(
      (sum, t) => sum + (t.durationSeconds ?? 0),
      0,
    ),
    skippedLines: result.skippedLines,
  };
}

/**
 * Render a build summary as text or JSON.
 *
 * @param summary - Output of {@link summarizeBuild}.
 * @param format - `text` for a human-readable report or `json` for
 *   machine-readable output. Optional; defaults to `text`.
 * @returns The rendered summary, without a trailing newline.
 * @throws TypeError When format is neither text nor json.
 *
 * @example
 * ```ts
 * console.log(formatSummary(summarizeBuild(parseBuildLog(""))));
 * // Tasks: 0 (0 failed, 0 incomplete)
 * // Total task time: 0s
 * ```
 */
export function formatSummary(
  summary: BuildSummary,
  format: "text" | "json" = "text",
): string {
  if (format === "json") {
    return JSON.stringify(summary, null, 2);
  }
  if (format !== "text") {
    throw new TypeError("format must be text or json");
  }

  const lines = [
    `Tasks: ${summary.taskCount} (${summary.failedTasks.length} failed, ` +
      `${summary.incompleteTasks.length} incomplete)`,
    `Total task time: ${summary.totalDurationSeconds}s`,
  ];
  if (summary.failedTasks.length > 0) {
    lines.push("Failed tasks:");
    for (const t of summary.failedTasks) {
      lines.push(`  ${t.recipe} ${t.task}`);
    }
  }
  if (summary.incompleteTasks.length > 0) {
    lines.push("Incomplete tasks:");
    for (const t of summary.incompleteTasks) {
      lines.push(`  ${t.recipe} ${t.task}`);
    }
  }
  if (summary.slowestTasks.length > 0) {
    lines.push("Slowest tasks:");
    for (const t of summary.slowestTasks) {
      lines.push(`  ${t.recipe} ${t.task} — ${t.durationSeconds}s`);
    }
  }
  if (summary.skippedLines > 0) {
    lines.push(`Skipped ${summary.skippedLines} invalid or unsupported line(s).`);
  }
  return lines.join("\n");
}
