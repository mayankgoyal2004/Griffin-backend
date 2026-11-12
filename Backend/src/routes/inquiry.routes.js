import { Router } from "express";
import {
  createInquiry,
  deleteInquiry,
  getInquiryById,
  getInquiries,
  updateInquiryStatus,
} from "../controllers/inquiry.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createInquirySchema,
  updateInquiryStatusSchema,
} from "../validators/inquiry.validator.js";

const router = Router();

// Public: Submit inquiry from contact form on website
router.post("/", validate(createInquirySchema), createInquiry);

// Admin-protected: Manage inquiries
router.get("/", authenticate, authorizeRoles("ADMIN", "EDITOR"), getInquiries);
router.get("/:id", authenticate, authorizeRoles("ADMIN", "EDITOR"), getInquiryById);
router.patch(
  "/:id/status",
  authenticate,
  authorizeRoles("ADMIN", "EDITOR"),
  validate(updateInquiryStatusSchema),
  updateInquiryStatus
);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteInquiry);

export default router;

