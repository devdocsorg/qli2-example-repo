import type { ParseResult, TaskRecord } from "./parser";

/**
 * Aggregated view of one build log.
 */
export interface BuildSummary {
  /** Total number of tasks found in the log. */
  taskCount: number;
  /** Tasks whose final event was `Failed`, in log order. */
  failedTasks: TaskRecord[];
  /** Tasks with no terminal event, in log order. */
  incompleteTasks: TaskRecord[];
  /** The longest-running tasks, slowest first. */
  slowestTasks: TaskRecord[];
  /** Sum of every measured task duration, in seconds. */
  totalDurationSeconds: number;
  /** Number of log lines the parser skipped, copied from the parse result. */
  skippedLines: number;
}

/**
 * Summarize a parsed build log.
 *
 * @param result - Output of {@link parseBuildLog}.
 * @param options - `slowestCount` caps the slowest-task list. Optional;
 *   defaults to 3. Must be a non-negative integer.
 * @returns Counts, failures, and the slowest tasks for the build.
 *
 * @example
 * ```ts
 * const summary = summarizeBuild(parseBuildLog(logText), { slowestCount: 5 });
 * console.log(summary.failedTasks.length); // 1
 * ```
 */
export function summarizeBuild(
  result: ParseResult,
  options: { slowestCount?: number } = {},
): BuildSummary {
  const slowestCount = options.slowestCount ?? 3;
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
 * @param format - `text` for a human-readable report, `json` for
 *   machine-readable output. Optional; defaults to `text`.
 * @returns The rendered summary, without a trailing newline.
 *
 * @example
 * ```ts
 * console.log(formatSummary(summary, "text"));
 * // Tasks: 8 (1 failed, 0 incomplete)
 * // ...
 * ```
 */
export function formatSummary(
  summary: BuildSummary,
  format: "text" | "json" = "text",
): string {
  if (format === "json") {
    return JSON.stringify(summary, null, 2);
  }

  const lines = [
    `Tasks: ${summary.taskCount} (${summary.failedTasks.length} failed, ` +
      `${summary.incompleteTasks.length} incomplete)`,
    `Measured build time: ${summary.totalDurationSeconds}s`,
  ];
  if (summary.failedTasks.length > 0) {
    lines.push("Failed tasks:");
    for (const t of summary.failedTasks) {
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
    lines.push(`Skipped ${summary.skippedLines} unrecognized line(s).`);
  }
  return lines.join("\n");
}
