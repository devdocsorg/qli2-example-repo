import assert from "node:assert/strict";
import { test } from "node:test";
import { parseBuildLog } from "../src/parser";
import { formatSummary, summarizeBuild } from "../src/summary";

const LOG = [
  "2026-09-10T14:00:00Z pkg-fastrpc do_fetch Started",
  "2026-09-10T14:00:30Z pkg-fastrpc do_fetch Succeeded",
  "2026-09-10T14:00:31Z pkg-fastrpc do_compile Started",
  "2026-09-10T14:02:31Z pkg-fastrpc do_compile Succeeded",
  "2026-09-10T14:02:32Z meta-qcom do_configure Started",
  "2026-09-10T14:03:02Z meta-qcom do_configure Failed",
  "not a log line",
  "2026-09-10T14:03:03Z meta-qcom do_clean Started",
].join("\n");

test("parseBuildLog pairs events into task records", () => {
  const result = parseBuildLog(LOG);
  assert.equal(result.tasks.length, 4);
  assert.equal(result.skippedLines, 1);

  const compile = result.tasks.find((t) => t.task === "do_compile");
  assert.equal(compile?.status, "succeeded");
  assert.equal(compile?.durationSeconds, 120);

  const configure = result.tasks.find((t) => t.task === "do_configure");
  assert.equal(configure?.status, "failed");

  const clean = result.tasks.find((t) => t.task === "do_clean");
  assert.equal(clean?.status, "incomplete");
  assert.equal(clean?.durationSeconds, undefined);
});

test("summarizeBuild reports counts, failures, and slowest tasks", () => {
  const summary = summarizeBuild(parseBuildLog(LOG), { slowestCount: 2 });
  assert.equal(summary.taskCount, 4);
  assert.equal(summary.failedTasks.length, 1);
  assert.equal(summary.incompleteTasks.length, 1);
  assert.equal(summary.totalDurationSeconds, 180);
  assert.equal(summary.slowestTasks.length, 2);
  assert.equal(summary.slowestTasks[0]?.task, "do_compile");
});

test("formatSummary renders text and JSON", () => {
  const summary = summarizeBuild(parseBuildLog(LOG));
  const text = formatSummary(summary);
  assert.match(text, /^Tasks: 4 \(1 failed, 1 incomplete\)/);
  assert.match(text, /meta-qcom do_configure/);
  assert.match(text, /Skipped 1 unrecognized line\(s\)\./);

  const json = JSON.parse(formatSummary(summary, "json")) as {
    taskCount: number;
  };
  assert.equal(json.taskCount, 4);
});
