import { Router } from "express";
import { authRouter } from "./auth.js";
import { createCrudRouter } from "./createCrudRouter.js";
import { dashboardRouter } from "./dashboard.js";
import { zohoRouter } from "./zoho.js";
import { requireAuth } from "../middleware/auth.js";
import { resetDb } from "../store/jsonStore.js";
import { ok } from "../utils/http.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  ok(res, {
    service: "fastonmed-api",
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

apiRouter.use("/auth", authRouter);

apiRouter.use(requireAuth);
apiRouter.use("/dashboard", dashboardRouter);
apiRouter.use("/clients", createCrudRouter("clients"));
apiRouter.use("/people", createCrudRouter("people"));
apiRouter.use("/leads", createCrudRouter("leads"));
apiRouter.use("/products", createCrudRouter("products"));
apiRouter.use("/services", createCrudRouter("services"));
apiRouter.use("/maintenance-contracts", createCrudRouter("maintenanceContracts"));
apiRouter.use("/tasks", createCrudRouter("tasks"));
apiRouter.use("/employees", createCrudRouter("employees"));
apiRouter.use("/invoices", createCrudRouter("invoices"));
apiRouter.use("/zoho", zohoRouter);

apiRouter.post("/admin/reset", async (_req, res) => {
  const db = await resetDb();
  ok(res, {
    clients: db.clients.length,
    leads: db.leads.length,
    invoices: db.invoices.length
  });
});
