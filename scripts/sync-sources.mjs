#!/usr/bin/env node

import { copyFile, mkdir, readFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const canonicalPath = join(repositoryRoot, "sources.yaml");
const targetPaths = [
  join(repositoryRoot, "skills", "analyze-cfb-lines", "references", "sources.yaml"),
  join(repositoryRoot, "skills", "analyze-cfb-player-props", "references", "sources.yaml"),
  join(repositoryRoot, "skills", "build-cfb-dfs-lineups", "references", "sources.yaml"),
];

const args = process.argv.slice(2);
const checkOnly = args.length === 1 && args[0] === "--check";

if (args.length > 1 || (args.length === 1 && !checkOnly)) {
  console.error("Usage: node scripts/sync-sources.mjs [--check]");
  process.exit(2);
}
const canonical = await readFile(canonicalPath);
const catalogText = canonical.toString("utf8");
const sourceIds = [...catalogText.matchAll(/^  - id:\s*(\S+)\s*$/gm)].map((match) => match[1]);

if (!/^version:\s*1\s*$/m.test(catalogText) || !/^sources:\s*$/m.test(catalogText)) {
  throw new Error("sources.yaml must contain the version 1 catalog.");
}

if (sourceIds.length === 0 || new Set(sourceIds).size !== sourceIds.length) {
  throw new Error("sources.yaml must contain at least one source and unique source IDs.");
}

let mismatches = 0;

for (const targetPath of targetPaths) {
  const label = relative(repositoryRoot, targetPath);

  if (checkOnly) {
    try {
      const bundled = await readFile(targetPath);
      if (!canonical.equals(bundled)) {
        console.error("out of sync: " + label);
        mismatches += 1;
      }
    } catch {
      console.error("missing: " + label);
      mismatches += 1;
    }
    continue;
  }

  await mkdir(dirname(targetPath), { recursive: true });
  await copyFile(canonicalPath, targetPath);
  console.log("synced: " + label);
}

if (checkOnly) {
  if (mismatches > 0) {
    process.exitCode = 1;
  } else {
    console.log("source catalogs are synchronized (" + sourceIds.length + " sources)");
  }
}
