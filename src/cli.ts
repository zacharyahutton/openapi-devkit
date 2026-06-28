#!/usr/bin/env node
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { generateClient } from "./generate.js";
import { parseSpec } from "./parseSpec.js";

function parseArgs(argv: string[]) {
  const args: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    if (key === "--dry-run") {
      args.dryRun = true;
    } else if (key.startsWith("--") && argv[i + 1]) {
      args[key.slice(2)] = argv[++i];
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const input = String(args.input ?? "examples/petstore.json");
const output = String(args.output ?? "generated/client.ts");
const dryRun = Boolean(args.dryRun);

const spec = parseSpec(readFileSync(resolve(input), "utf8"));
const code = generateClient(spec);

if (dryRun) {
  console.log(`[dry-run] Would write ${output} (${code.split("\n").length} lines)`);
  console.log(code.slice(0, 400) + (code.length > 400 ? "\n..." : ""));
} else {
  mkdirSync(dirname(resolve(output)), { recursive: true });
  writeFileSync(resolve(output), code);
  console.log(`Wrote ${output}`);
}
