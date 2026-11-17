import { Router } from "express";
import {
  deleteUser,
  getUsers,
  inviteUser,
  updateUserRole,
} from "../controllers/user.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, authorizeRoles("ADMIN"), getUsers);
router.post("/", authenticate, authorizeRoles("ADMIN"), inviteUser);
router.post("/invite", authenticate, authorizeRoles("ADMIN"), inviteUser);
router.put("/:id", authenticate, authorizeRoles("ADMIN"), updateUserRole);
router.patch("/:id", authenticate, authorizeRoles("ADMIN"), updateUserRole);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteUser);

export default router;

