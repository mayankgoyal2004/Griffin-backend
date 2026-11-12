import { Router } from "express";
import {
  getSiteSettings,
  updateSiteSettings,
} from "../controllers/settings.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getSiteSettings);
router.put("/", authenticate, authorizeRoles("ADMIN"), updateSiteSettings);

export default router;

