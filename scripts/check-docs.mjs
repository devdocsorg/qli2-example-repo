import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, basename, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const files = new Set(execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"], {
  cwd: root, encoding: "utf8",
}).split("\0").filter(Boolean));
const folders = new Set(["."]);
for (const file of files) {
  for (let folder = dirname(file); folder !== "."; folder = dirname(folder)) folders.add(folder);
}
const errors = [];

/**
 * Read Markdown without fenced examples, so example links are not validated.
 * @param {string} file - Repository-relative Markdown path.
 * @returns {string} Prose to inspect; filesystem errors propagate.
 * @example prose("README.md").includes("Get started"); // true
 */
function prose(file) {
  return readFileSync(resolve(root, file), "utf8").replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, "");
}

/**
 * Extract the inline links used by this repository's Markdown.
 * @param {string} markdown - Prose with fenced examples removed.
 * @returns {string[]} Link destinations; reference-style links are not inspected.
 * @example links("[source](src/README.md)"); // ["src/README.md"]
 */
function links(markdown) {
  return [...markdown.matchAll(/\[[^\]\n]*\]\(([^\s)]+)\)/g)].map(match => match[1]);
}

/**
 * Collect GitHub-style heading anchors, including repeated heading suffixes.
 * @param {string} markdown - Prose with fenced examples removed.
 * @returns {Set<string>} Anchors for the plain headings used in this repository.
 * @example anchors("## Get started").has("get-started"); // true
 */
function anchors(markdown) {
  const seen = new Set();
  for (const match of markdown.matchAll(/^#{1,6}\s+(.+?)\s*#*$/gm)) {
    const base = match[1].toLowerCase().replace(/[^\p{L}\p{N}\p{M}\s_-]/gu, "").replace(/ /g, "-");
    let anchor = base;
    for (let suffix = 1; seen.has(anchor); suffix++) anchor = `${base}-${suffix}`;
    seen.add(anchor);
  }
  return seen;
}

const markdown = new Map([...files].filter(file => file.endsWith(".md")).map(file => [file, prose(file)]));
for (const folder of folders) {
  const readme = folder === "." ? "README.md" : `${folder}/README.md`;
  if (folder !== "." && basename(folder).startsWith(".")) {
    if (files.has(readme)) errors.push(`${readme}: dot-prefixed folders must not contain a README`);
    continue;
  }
  if (!files.has(readme)) {
    errors.push(`${folder}: missing README.md`);
    continue;
  }
  const destinations = links(markdown.get(readme)).map(link => resolve(root, folder, link.split("#")[0]));
  for (const entry of [...files, ...folders]) {
    if (entry === "." || dirname(entry) !== folder) continue;
    if (!destinations.includes(resolve(root, entry)) && !destinations.includes(resolve(root, entry, "README.md"))) {
      errors.push(`${readme}: inventory is missing a link to ${entry}`);
    }
  }
}

for (const [file, content] of markdown) {
  for (const link of links(content)) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(link)) continue;
    const [path, fragment] = decodeURIComponent(link).split("#");
    const target = path ? relative(root, resolve(root, dirname(file), path)).replaceAll("\\", "/") || "." : file;
    if (!files.has(target) && !folders.has(target)) {
      errors.push(`${file}: missing link target ${link}`);
    } else if (fragment && markdown.has(target) && !anchors(markdown.get(target)).has(fragment)) {
      errors.push(`${file}: missing heading ${link}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Documentation OK: ${markdown.size} Markdown files, ${folders.size} folder inventories.`);
}
