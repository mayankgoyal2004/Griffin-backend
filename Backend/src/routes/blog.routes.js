import { Router } from "express";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPostById,
  getBlogPostBySlug,
  getBlogPosts,
  updateBlogPost,
} from "../controllers/blog.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createBlogPostSchema,
  updateBlogPostSchema,
} from "../validators/blog.validator.js";

const router = Router();

// Public routes
router.get("/", getBlogPosts);
router.get("/slug/:slug", getBlogPostBySlug);
router.get("/:id", getBlogPostById);

// Admin-protected routes
router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN", "EDITOR"),
  validate(createBlogPostSchema),
  createBlogPost
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN", "EDITOR"),
  validate(updateBlogPostSchema),
  updateBlogPost
);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteBlogPost);

export default router;

