import { Router } from "express";
import {
  getPageBySlug,
  getPages,
  updatePage,
} from "../controllers/page.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getPages);
router.get("/:slug", getPageBySlug);

// Admin-protected
router.put("/:slug", authenticate, authorizeRoles("ADMIN", "EDITOR"), updatePage);

export default router;

