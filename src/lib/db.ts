import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");

export function readJSON<T>(filename: string): T {
  const path = join(DATA_DIR, filename);
  if (!existsSync(path)) return (filename.endsWith(".json") && !filename.includes("settings") && !filename.includes("content") ? [] : {}) as T;
  return JSON.parse(readFileSync(path, "utf-8")) as T;
}

export function writeJSON<T>(filename: string, data: T): void {
  const path = join(DATA_DIR, filename);
  writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
}
