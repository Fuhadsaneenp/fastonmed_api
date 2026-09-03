import { resetDb } from "../store/jsonStore.js";

const db = await resetDb();

console.log("Seeded Fastonmed API database", {
  clients: db.clients.length,
  leads: db.leads.length,
  invoices: db.invoices.length,
  maintenanceContracts: db.maintenanceContracts.length
});
