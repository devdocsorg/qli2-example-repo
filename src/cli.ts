#!/usr/bin/env node
/** Command-line entry point for the sample build-log summarizer. */
import { readFileSync } from "node:fs";
import { parseBuildLog } from "./parser";
import { formatSummary, summarizeBuild } from "./summary";

/**
 * Print a summary of one log file, or explain an invalid invocation on stderr.
 *
 * Relative paths resolve from the working directory. SUMMARY_FORMAT selects
 * text (the default) or json. Exit status 0 means a report was produced, even
 * when it describes failed tasks; status 1 means invalid input or a read error.
 * An empty file or a file without recognized tasks is invalid CLI input.
 *
 * @param args - Command-line arguments; defaults to the process arguments.
 * @returns Nothing; writes stdout/stderr and sets process.exitCode on failure.
 *
 * @example
 * ```console
 * node dist/src/cli.js --help
 * Usage: qli-buildlog-summary <log-file>
 * ```
 */
function main(args: string[] = process.argv.slice(2)): void {
  if (args.length === 1 && (args[0] === "--help" || args[0] === "-h")) {
    process.stdout.write(
      "Usage: qli-buildlog-summary <log-file>\n" +
      "Read the example log format; see docs/tutorials/summarize-a-build-log.md.\n" +
      "Set SUMMARY_FORMAT=text (default) or json.\n",
    );
    return;
  }
  const file = args[0];
  if (args.length !== 1 || file === undefined || file.startsWith("-")) {
    process.stderr.write("Usage: qli-buildlog-summary <log-file>\n");
    process.exitCode = 1;
    return;
  }

  try {
    const format = process.env.SUMMARY_FORMAT ?? "text";
    if (format !== "text" && format !== "json") {
      throw new Error("SUMMARY_FORMAT must be text or json");
    }
    const parsed = parseBuildLog(readFileSync(file, "utf8"));
    if (parsed.tasks.length === 0) {
      throw new Error("No tasks found. Use the sample log format shown in the tutorial.");
    }
    process.stdout.write(formatSummary(summarizeBuild(parsed), format) + "\n");
  } catch (error) {
    process.stderr.write(`Error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}
