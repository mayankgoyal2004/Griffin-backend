import { Router } from "express";
import {
  createService,
  deleteService,
  getServiceById,
  getServiceBySlug,
  getServices,
  updateService,
} from "../controllers/service.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createServiceSchema,
  updateServiceSchema,
} from "../validators/service.validator.js";

const router = Router();

// Public routes
router.get("/", getServices);
router.get("/slug/:slug", getServiceBySlug);
router.get("/:id", getServiceById);

// Admin-protected routes
router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN", "EDITOR"),
  validate(createServiceSchema),
  createService
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN", "EDITOR"),
  validate(updateServiceSchema),
  updateService
);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteService);

export default router;

