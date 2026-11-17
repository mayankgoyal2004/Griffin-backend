import { Router } from "express";
import { getActivityLogs, createActivityLog } from "../controllers/activity.controller.js";
import { authenticate, optionalAuthenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, authorizeRoles("ADMIN"), getActivityLogs);
router.post("/", optionalAuthenticate, createActivityLog);

export default router;

