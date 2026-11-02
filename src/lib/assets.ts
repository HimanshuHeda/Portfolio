import fs from "node:fs";
import path from "node:path";

/**
 * True if a file exists under /public. Runs at build time (server components
 * only) so links to files that are not in the repo yet can be hidden instead
 * of shipping a broken link.
 */
export function publicFileExists(urlPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", decodeURIComponent(urlPath)));
}
