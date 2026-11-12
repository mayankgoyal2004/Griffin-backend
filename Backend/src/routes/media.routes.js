import { Router } from "express";
import {
  createMediaAsset,
  deleteMediaAsset,
  getMediaAssets,
} from "../controllers/media.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getMediaAssets);
router.post("/", authenticate, authorizeRoles("ADMIN", "EDITOR"), createMediaAsset);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteMediaAsset);

export default router;

