import { Router } from "express";
import { readDb } from "../store/jsonStore.js";
import { ok } from "../utils/http.js";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", async (_req, res) => {
  const db = await readDb();
  const leadValue = db.leads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
  const invoiceValue = db.invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidValue = db.invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  ok(res, {
    clients: db.clients.length,
    leads: db.leads.length,
    openLeads: db.leads.filter((lead) => !["Completed", "Lost Deal"].includes(lead.stage)).length,
    pipelineValue: leadValue,
    invoices: db.invoices.length,
    invoiceValue,
    collectedValue: paidValue,
    serviceTickets: db.services.length,
    openServiceTickets: db.services.filter((ticket) => !["Completed", "Closed"].includes(ticket.status)).length,
    maintenanceContracts: db.maintenanceContracts.length,
    expiringContracts: db.maintenanceContracts.filter((contract) =>
      ["Expiring Soon", "Expired", "Pending Renewal"].includes(contract.status)
    ).length,
    employees: db.employees.length,
    tasksDue: db.tasks.filter((task) => task.status !== "Completed").length
  });
});
