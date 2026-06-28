import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("cli lists petstore endpoints", () => {
  const result = spawnSync(
    process.execPath,
    ["dist/cli.js", "--input", "examples/petstore.json", "--list-endpoints"],
    { cwd: root, encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /GET\s+\/pets/);
});
