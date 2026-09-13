import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { test } from "node:test";

const root = resolve(__dirname, "../..");
const cli = join(root, "dist/src/cli.js");
const sample = "examples/sample-build.log";

/**
 * Execute the built CLI from the repository root with a controlled output format.
 * @param args - Arguments passed after the executable path.
 * @param env - Optional environment overrides; SUMMARY_FORMAT defaults to text.
 * @returns Captured stdout, stderr, and exit status.
 * @example runCli(["--help"]).status; // 0
 */
function runCli(args: string[], env: NodeJS.ProcessEnv = {}) {
  return spawnSync(process.execPath, [cli, ...args], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, SUMMARY_FORMAT: "text", ...env },
    timeout: 5000,
  });
}

test("the tutorial's complete report matches the CLI and committed sample", () => {
  const tutorial = readFileSync(join(root, "docs/tutorials/summarize-a-build-log.md"), "utf8");
  const expected = /Expected output:\s*```text\n([\s\S]*?)```/.exec(tutorial)?.[1];
  assert.ok(expected, "the tutorial must contain its expected report");
  const result = runCli([sample]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  assert.equal(result.stdout, expected);
});

test("JSON is a complete report and failed tasks do not change the CLI exit status", () => {
  const result = runCli([sample], { SUMMARY_FORMAT: "json" });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  const summary = JSON.parse(result.stdout);
  assert.equal(summary.taskCount, 5);
  assert.equal(summary.failedTasks.length, 1);
  assert.equal(summary.totalDurationSeconds, 898);
  assert.equal(summary.slowestTasks[0].durationSeconds, 525);
});

test("help works, while missing, extra, and unknown arguments fail", () => {
  for (const flag of ["--help", "-h"]) {
    const result = runCli([flag]);
    assert.equal(result.status, 0);
    assert.match(result.stdout, /^Usage:/);
  }
  for (const args of [[], [sample, "extra"], ["--unknown"]]) {
    const result = runCli(args);
    assert.equal(result.status, 1);
    assert.equal(result.stdout, "");
    assert.match(result.stderr, /^Usage:/);
  }
});

test("invalid configuration and unreadable paths fail without a misleading report", () => {
  for (const value of ["", "JSON", "yaml"]) {
    const result = runCli([sample], { SUMMARY_FORMAT: value });
    assert.equal(result.status, 1);
    assert.equal(result.stdout, "");
    assert.match(result.stderr, /SUMMARY_FORMAT must be text or json/);
  }
  const missing = runCli(["examples/does-not-exist.log"]);
  assert.equal(missing.status, 1);
  assert.equal(missing.stdout, "");
  assert.match(missing.stderr, /ENOENT/);
});

test("empty and unrecognized input fail; a partial log reports skipped lines", () => {
  const dir = mkdtempSync(join(tmpdir(), "qli-example-"));
  const file = join(dir, "log with spaces.log");
  try {
    for (const input of ["", "raw output with no recognizable events\n"]) {
      writeFileSync(file, input);
      const result = runCli([file]);
      assert.equal(result.status, 1);
      assert.equal(result.stdout, "");
      assert.match(result.stderr, /No tasks found/);
    }
    writeFileSync(file, "noise\n2026-09-10T00:00:00Z recipe do_build Started\n");
    const partial = runCli([file]);
    assert.equal(partial.status, 0);
    assert.match(partial.stdout, /1 incomplete/);
    assert.match(partial.stdout, /Incomplete tasks:\n  recipe do_build/);
    assert.match(partial.stdout, /Skipped 1/);
  } finally {
    rmSync(dir, { recursive: true });
  }
});

test("the library can be imported without executing the CLI", () => {
  const result = spawnSync(process.execPath, ["-e", "require('./dist/src/index.js'); require('./dist/src/cli.js')"], {
    cwd: root, encoding: "utf8", timeout: 5000,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "");
  assert.equal(result.stderr, "");
});

test("the documented environment file is loadable by Node", () => {
  const env = { ...process.env };
  delete env.SUMMARY_FORMAT;
  const result = spawnSync(process.execPath, ["--env-file=.env.example", cli, sample], {
    cwd: root, encoding: "utf8", env, timeout: 5000,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /^Tasks: 5/);
});
