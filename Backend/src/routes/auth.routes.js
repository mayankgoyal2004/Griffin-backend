import { Router } from "express";
import {
  getCurrentUser,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);
router.post("/logout", logout);
router.get("/me", authenticate, getCurrentUser);
router.put("/profile", authenticate, validate(updateProfileSchema), updateProfile);

export default router;

