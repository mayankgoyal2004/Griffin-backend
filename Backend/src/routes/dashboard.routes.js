import { Router } from "express";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/summary", authenticate, authorizeRoles("ADMIN", "EDITOR"), getDashboardSummary);

export default router;

