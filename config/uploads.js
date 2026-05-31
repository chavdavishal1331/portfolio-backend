import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let cachedDir = null;

/** Writable uploads folder (Render needs /tmp when project disk is read-only). */
export function getUploadsDir() {
  if (cachedDir) return cachedDir;

  const candidates = [
    process.env.UPLOAD_DIR,
    path.join(__dirname, "..", "uploads"),
    path.join(os.tmpdir(), "portfolio-uploads"),
  ].filter(Boolean);

  for (const dir of candidates) {
    try {
      fs.mkdirSync(dir, { recursive: true });
      fs.accessSync(dir, fs.constants.W_OK);
      cachedDir = dir;
      console.log("Uploads directory:", dir);
      return dir;
    } catch {
      /* try next */
    }
  }

  const fallback = path.join(os.tmpdir(), "portfolio-uploads");
  fs.mkdirSync(fallback, { recursive: true });
  cachedDir = fallback;
  console.log("Uploads directory (fallback):", fallback);
  return fallback;
}
