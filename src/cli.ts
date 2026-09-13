#!/usr/bin/env node
/**
 * Command-line entry point: `qli-buildlog-summary <log-file>`.
 *
 * Reads the log file, prints a summary to stdout, and exits 0. Exits 1 with
 * a message on stderr when the file cannot be read or no argument is given.
 * Configuration comes from the environment variables documented in
 * `.env.example`: `QLI_LOG_DIR`, `SUMMARY_FORMAT`, and `LOG_LEVEL`.
 */
import { readFileSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";
import { parseBuildLog } from "./parser";
import { formatSummary, summarizeBuild } from "./summary";

/**
 * Resolve a log path against `QLI_LOG_DIR`.
 *
 * @param file - Path given on the command line. Absolute paths are returned
 *   unchanged; relative paths resolve against `QLI_LOG_DIR`, or the current
 *   working directory when `QLI_LOG_DIR` is unset.
 * @returns The absolute path to read.
 *
 * @example
 * ```ts
 * process.env.QLI_LOG_DIR = "/var/log/qli";
 * resolveLogPath("build.log"); // "/var/log/qli/build.log"
 * ```
 */
export function resolveLogPath(file: string): string {
  if (isAbsolute(file)) {
    return file;
  }
  return resolve(process.env.QLI_LOG_DIR ?? process.cwd(), file);
}

function main(): void {
  const file = process.argv[2];
  if (file === undefined) {
    process.stderr.write("Usage: qli-buildlog-summary <log-file>\n");
    process.exitCode = 1;
    return;
  }

  const path = resolveLogPath(file);
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch (error) {
    process.stderr.write(`Cannot read ${path}: ${String(error)}\n`);
    process.exitCode = 1;
    return;
  }

  const parsed = parseBuildLog(text);
  if (process.env.LOG_LEVEL === "debug") {
    process.stderr.write(
      `Parsed ${parsed.tasks.length} task(s), skipped ${parsed.skippedLines} line(s) from ${path}\n`,
    );
  }

  const format = process.env.SUMMARY_FORMAT === "json" ? "json" : "text";
  process.stdout.write(formatSummary(summarizeBuild(parsed), format) + "\n");
}

main();
