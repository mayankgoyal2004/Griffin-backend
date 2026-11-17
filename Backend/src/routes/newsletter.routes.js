import { Router } from "express";
import {
  subscribeNewsletter,
  getSubscribers,
  updateSubscriberStatus,
  deleteSubscriber,
} from "../controllers/newsletter.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// Public subscription route
router.post("/subscribe", subscribeNewsletter);

// Admin-only management routes
router.use(authenticate, authorizeRoles("ADMIN"));

router.route("/").get(getSubscribers);
router.route("/:id/status").patch(updateSubscriberStatus);
router
  .route("/:id")
  .put(updateSubscriberStatus)
  .patch(updateSubscriberStatus)
  .delete(deleteSubscriber);

export default router;
