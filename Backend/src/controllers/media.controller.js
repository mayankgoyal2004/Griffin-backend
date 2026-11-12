import { prisma } from "../config/db.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getMediaAssets = asyncHandler(async (req, res) => {
  const { folder, search } = req.query;

  const where = {};
  if (folder && folder !== "all") where.folder = folder;
  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  const assets = await prisma.mediaAsset.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return res.status(200).json(new ApiResponse(200, assets, "Media assets fetched."));
});

export const createMediaAsset = asyncHandler(async (req, res) => {
  const asset = await prisma.mediaAsset.create({
    data: req.body,
  });

  await prisma.activityLog.create({
    data: {
      action: "uploaded",
      entityType: "MediaAsset",
      entityTitle: asset.name,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(201).json(new ApiResponse(201, asset, "Media asset recorded."));
});

export const deleteMediaAsset = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.mediaAsset.delete({ where: { id } });

  return res.status(200).json(new ApiResponse(200, null, "Media asset deleted."));
});

