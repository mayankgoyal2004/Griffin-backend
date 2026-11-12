import { Router } from "express";
import { getActivityLogs } from "../controllers/activity.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, authorizeRoles("ADMIN"), getActivityLogs);

export default router;

