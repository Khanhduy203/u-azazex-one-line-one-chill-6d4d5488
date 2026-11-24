import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line of horror: a child's drawing of the family, with one figure too many.
// The dread is what the line withholds — who the fifth person is — and the
// last three words land the blow.
const LINE =
  "My daughter drew our family again tonight, and this time she drew five of us.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  console.error(`entry must be 1-200 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("entry must be a single line");
  process.exit(1);
}
if (LINE.trim() !== LINE) {
  console.error("entry must not have leading or trailing whitespace");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.txt");
writeFileSync(dest, LINE, "utf8");

// Verify the write landed byte-identical: re-read and compare.
const written = readFileSync(dest, "utf8");
if (written !== LINE) {
  console.error("entry.txt contents differ from the entry line");
  process.exit(1);
}
console.log(`wrote ${dest} (${Buffer.byteLength(written, "utf8")} bytes)`);
