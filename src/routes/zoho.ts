import { Router } from "express";
import { fetchZohoBooksData } from "../services/zoho.js";
import { readDb, writeDb } from "../store/jsonStore.js";
import { fail, ok } from "../utils/http.js";

export const zohoRouter = Router();

zohoRouter.post("/sync", async (_req, res) => {
  try {
    const zohoData = await fetchZohoBooksData();
    const db = await readDb();
    db.clients = zohoData.clients;
    db.people = zohoData.people;
    db.invoices = zohoData.invoices;
    await writeDb(db);

    return ok(res, {
      clients: db.clients.length,
      people: db.people.length,
      invoices: db.invoices.length
    });
  } catch (error) {
    return fail(res, 400, error instanceof Error ? error.message : "Zoho sync failed");
  }
});
