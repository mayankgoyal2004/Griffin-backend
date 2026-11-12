import { Router } from "express";
import activityRoutes from "./activity.routes.js";
import authRoutes from "./auth.routes.js";
import blogRoutes from "./blog.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import inquiryRoutes from "./inquiry.routes.js";
import mediaRoutes from "./media.routes.js";
import pageRoutes from "./page.routes.js";
import projectRoutes from "./project.routes.js";
import serviceRoutes from "./service.routes.js";
import settingsRoutes from "./settings.routes.js";
import teamRoutes from "./team.routes.js";

const apiRouter = Router();

// Health check endpoint
apiRouter.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: "Griffin Construction API",
    version: "1.0.0",
  });
});

// Mount modules
apiRouter.use("/auth", authRoutes);
apiRouter.use("/dashboard", dashboardRoutes);
apiRouter.use("/projects", projectRoutes);
apiRouter.use("/services", serviceRoutes);
apiRouter.use("/blog", blogRoutes);
apiRouter.use("/inquiries", inquiryRoutes);
apiRouter.use("/team", teamRoutes);
apiRouter.use("/pages", pageRoutes);
apiRouter.use("/settings", settingsRoutes);
apiRouter.use("/media", mediaRoutes);
apiRouter.use("/activity", activityRoutes);

export default apiRouter;

