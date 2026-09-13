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
  assert.match(text, /Skipped 1 invalid or unsupported line\(s\)\./);

  const json = JSON.parse(formatSummary(summary, "json")) as {
    taskCount: number;
  };
  assert.equal(json.taskCount, 4);
});


test("a restarted task cannot retain the previous attempt's result or duration", () => {
  const result = parseBuildLog([
    "2026-09-10T00:00:00Z recipe do_build Started",
    "2026-09-10T00:01:00Z recipe do_build Failed",
    "2026-09-10T00:02:00Z recipe do_build Started",
  ].join("\n"));
  assert.equal(result.tasks.length, 1);
  assert.equal(result.tasks[0]?.status, "incomplete");
  assert.equal(result.tasks[0]?.endedAt, undefined);
  assert.equal(result.tasks[0]?.durationSeconds, undefined);
  assert.equal(summarizeBuild(result).totalDurationSeconds, 0);
});

test("invalid calendar dates, backwards events, and duplicate completions are skipped", () => {
  const result = parseBuildLog([
    "2026-02-30T00:00:00Z recipe do_build Started",
    "2026-09-10T00:01:00Z recipe do_build Started",
    "2026-09-10T00:00:00Z recipe do_build Failed",
    "2026-09-10T00:02:00Z recipe do_build Succeeded",
    "2026-09-10T00:03:00Z recipe do_build Failed",
    "123 recipe do_other Started",
  ].join("\r\n"));
  assert.equal(result.skippedLines, 4);
  assert.equal(result.tasks.length, 1);
  assert.equal(result.tasks[0]?.status, "succeeded");
  assert.equal(result.tasks[0]?.durationSeconds, 60);
});

test("missing starts and millisecond timestamps retain only measurable durations", () => {
  const result = parseBuildLog([
    "2026-09-10T00:00:00Z recipe do_configure Succeeded",
    "2026-09-10T00:00:00.100Z recipe do_build Started",
    "2026-09-10T00:00:01.350Z recipe do_build Succeeded",
    "",
  ].join("\n"));
  assert.equal(result.skippedLines, 0);
  assert.equal(result.tasks[0]?.durationSeconds, undefined);
  assert.equal(result.tasks[1]?.durationSeconds, 1.25);
  assert.equal(summarizeBuild(result).totalDurationSeconds, 1.25);
});

test("empty library input and zero slowest count have defined results", () => {
  const empty = summarizeBuild(parseBuildLog(" \n"));
  assert.equal(empty.taskCount, 0);
  assert.equal(empty.totalDurationSeconds, 0);
  assert.deepEqual(empty.slowestTasks, []);
  const parsed = parseBuildLog(LOG);
  const before = JSON.stringify(parsed);
  assert.deepEqual(summarizeBuild(parsed, { slowestCount: 0 }).slowestTasks, []);
  assert.equal(JSON.stringify(parsed), before);
});

test("JavaScript callers receive errors for invalid summary options and formats", () => {
  const parsed = parseBuildLog(LOG);
  for (const slowestCount of [-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => summarizeBuild(parsed, { slowestCount }), RangeError);
  }
  // Simulate a JavaScript caller bypassing the TypeScript union.
  assert.throws(() => formatSummary(summarizeBuild(parsed), "yaml" as "text"), TypeError);
});
