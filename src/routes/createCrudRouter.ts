import { Router } from "express";
import { nanoid } from "nanoid";
import type { Database } from "../types.js";
import { readDb, writeDb } from "../store/jsonStore.js";
import { fail, ok, today } from "../utils/http.js";

type CollectionKey = {
  [K in keyof Database]: Database[K] extends Array<Record<string, unknown>> ? K : never;
}[keyof Database];

export function createCrudRouter(collection: CollectionKey) {
  const router = Router();

  router.get("/", async (req, res) => {
    const db = await readDb();
    const search = String(req.query.search || "").toLowerCase();
    let rows = db[collection];

    if (search) {
      rows = rows.filter((row) => JSON.stringify(row).toLowerCase().includes(search)) as typeof rows;
    }

    ok(res, rows);
  });

  router.get("/:id", async (req, res) => {
    const db = await readDb();
    const item = db[collection].find((row) => row.id === req.params.id);
    if (!item) return fail(res, 404, "Record not found");
    return ok(res, item);
  });

  router.post("/", async (req, res) => {
    const db = await readDb();
    const item = {
      id: req.body.id || `${String(collection).slice(0, 3)}-${nanoid(8)}`,
      createdAt: req.body.createdAt || today(),
      ...req.body
    };
    db[collection].unshift(item as never);
    await writeDb(db);
    ok(res, item, 201);
  });

  router.put("/:id", async (req, res) => {
    const db = await readDb();
    const index = db[collection].findIndex((row) => row.id === req.params.id);
    if (index < 0) return fail(res, 404, "Record not found");

    const updated = { ...db[collection][index], ...req.body, id: req.params.id };
    db[collection][index] = updated as never;
    await writeDb(db);
    return ok(res, updated);
  });

  router.delete("/:id", async (req, res) => {
    const db = await readDb();
    const before = db[collection].length;
    const remaining = db[collection].filter((row) => row.id !== req.params.id);
    if (remaining.length === before) return fail(res, 404, "Record not found");
    db[collection] = remaining as never;
    await writeDb(db);
    return ok(res, { id: req.params.id });
  });

  return router;
}
