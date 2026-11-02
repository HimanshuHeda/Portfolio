// Bundle gate for the home page. Run after `npm run build`:
//   npm run check:bundle
// Fails (exit 1) if the first-load JS for "/" or the lazy 3D chunk is over budget.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const FIRST_LOAD_BUDGET_KB = 195; // gzipped JS referenced by the "/" HTML
const SCENE_BUDGET_KB = 400; // gzipped lazy chunk(s) that contain three.js

const root = process.cwd();
const htmlPath = path.join(root, ".next/server/app/index.html");
if (!fs.existsSync(htmlPath)) {
  console.error("No .next/server/app/index.html. Run `npm run build` first.");
  process.exit(1);
}

const gzKB = (file) => zlib.gzipSync(fs.readFileSync(file)).length / 1024;
const toFile = (url) => path.join(root, ".next", url.replace(/^\/_next/, ""));

const html = fs.readFileSync(htmlPath, "utf8");
const firstLoad = [...new Set([...html.matchAll(/\/_next\/static\/[^"' ]+?\.js/g)].map((m) => m[0]))];
const firstLoadKB = firstLoad.reduce((sum, url) => sum + gzKB(toFile(url)), 0);

// Lazy 3D chunks: any static chunk that bundles the three.js renderer and is
// not part of the first load.
const chunkDir = path.join(root, ".next/static/chunks");
const firstLoadNames = new Set(firstLoad.map((u) => path.basename(u)));
const sceneChunks = fs
  .readdirSync(chunkDir)
  .filter((f) => f.endsWith(".js") && !firstLoadNames.has(f))
  .filter((f) => /WebGLRenderer|@react-three|useFrame/.test(fs.readFileSync(path.join(chunkDir, f), "utf8")));
const sceneKB = sceneChunks.reduce((sum, f) => sum + gzKB(path.join(chunkDir, f)), 0);

const leaked = firstLoad.filter((url) => /WebGLRenderer/.test(fs.readFileSync(toFile(url), "utf8")));

const line = (label, kb, budget) =>
  `${kb <= budget ? "PASS" : "FAIL"}  ${label.padEnd(26)} ${kb.toFixed(1).padStart(6)} KB gz  (budget ${budget} KB)`;

console.log(line("First-load JS for /", firstLoadKB, FIRST_LOAD_BUDGET_KB), `- ${firstLoad.length} files`);
console.log(line("Lazy 3D chunk(s)", sceneKB, SCENE_BUDGET_KB), `- ${sceneChunks.length} files`);
if (leaked.length) console.log(`FAIL  three.js found in first-load JS: ${leaked.join(", ")}`);

const ok = firstLoadKB <= FIRST_LOAD_BUDGET_KB && sceneKB <= SCENE_BUDGET_KB && leaked.length === 0;
process.exit(ok ? 0 : 1);
