import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config.js";
import { apiRouter } from "./routes/index.js";
import { fail } from "./utils/http.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));

app.use("/api", apiRouter);

app.use((_req, res) => fail(res, 404, "Route not found"));

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = error instanceof Error ? error.message : "Unexpected server error";
  fail(res, 500, message);
});

app.listen(config.port, () => {
  console.log(`Fastonmed API running on http://localhost:${config.port}`);
});
