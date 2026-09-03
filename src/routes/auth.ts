import { Router } from "express";
import { z } from "zod";
import { demoUsers } from "../data/seed.js";
import { requireAuth, signUser } from "../middleware/auth.js";
import { fail, ok } from "../utils/http.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return fail(res, 400, "Invalid login payload", parsed.error.flatten());

  const user = demoUsers.find(
    (entry) => entry.email === parsed.data.email && entry.password === parsed.data.password
  );

  if (!user) return fail(res, 401, "Invalid email or password");

  const { password: _password, ...safeUser } = user;
  return ok(res, {
    user: safeUser,
    token: signUser(safeUser)
  });
});

authRouter.get("/me", requireAuth, (req, res) => {
  if (!req.user) return fail(res, 401, "Not authenticated");
  return ok(res, req.user);
});
