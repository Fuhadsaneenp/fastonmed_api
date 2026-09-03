import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { seedDatabase } from "../data/seed.js";
import type { Database } from "../types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../../data");
const dataFile = path.join(dataDir, "db.json");

let cache: Database | null = null;

async function ensureDatabaseFile() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(dataFile, "utf8");
  } catch {
    await writeFile(dataFile, JSON.stringify(seedDatabase, null, 2));
  }
}

export async function readDb(): Promise<Database> {
  if (cache) return structuredClone(cache);
  await ensureDatabaseFile();
  const raw = await readFile(dataFile, "utf8");
  cache = JSON.parse(raw) as Database;
  return structuredClone(cache);
}

export async function writeDb(db: Database): Promise<Database> {
  cache = structuredClone(db);
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(cache, null, 2));
  return structuredClone(cache);
}

export async function resetDb(): Promise<Database> {
  return writeDb(seedDatabase);
}
