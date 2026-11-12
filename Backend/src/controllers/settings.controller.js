import { prisma } from "../config/db.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getSiteSettings = asyncHandler(async (req, res) => {
  let settings = await prisma.siteSettings.findUnique({
    where: { id: "settings_global" },
  });

  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: { id: "settings_global" },
    });
  }

  return res.status(200).json(new ApiResponse(200, settings, "Site settings fetched."));
});

export const updateSiteSettings = asyncHandler(async (req, res) => {
  const updated = await prisma.siteSettings.upsert({
    where: { id: "settings_global" },
    update: req.body,
    create: {
      ...req.body,
      id: "settings_global",
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "updated",
      entityType: "SiteSettings",
      entityTitle: "Global Site Settings",
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, updated, "Site settings updated successfully."));
});

