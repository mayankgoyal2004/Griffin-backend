import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjectBySlug,
  getProjects,
  updateProject,
} from "../controllers/project.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validators/project.validator.js";

const router = Router();

// Public routes (for Frontend & visitors)
router.get("/", getProjects);
router.get("/slug/:slug", getProjectBySlug);
router.get("/:id", getProjectById);

// Admin-protected routes (for Dashboard)
router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN", "EDITOR"),
  validate(createProjectSchema),
  createProject
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN", "EDITOR"),
  validate(updateProjectSchema),
  updateProject
);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteProject);

export default router;

