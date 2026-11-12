import { Router } from "express";
import {
  createTeamMember,
  deleteTeamMember,
  getTeamMemberById,
  getTeamMembers,
  updateTeamMember,
} from "../controllers/team.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getTeamMembers);
router.get("/:id", getTeamMemberById);

// Admin-protected routes
router.post("/", authenticate, authorizeRoles("ADMIN"), createTeamMember);
router.put("/:id", authenticate, authorizeRoles("ADMIN"), updateTeamMember);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteTeamMember);

export default router;

