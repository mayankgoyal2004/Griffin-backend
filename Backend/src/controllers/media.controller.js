import { prisma } from "../config/db.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeMediaAsset } from "../utils/serializer.js";

function parseMediaData(body) {
  const data = {};
  if (body.name !== undefined) data.name = body.name;
  if (body.fileUrl !== undefined || body.file_url !== undefined) {
    data.fileUrl = body.fileUrl ?? body.file_url;
  }
  if (body.fileType !== undefined || body.file_type !== undefined) {
    data.fileType = body.fileType ?? body.file_type;
  }
  if (body.mimeType !== undefined || body.mime_type !== undefined) {
    data.mimeType = body.mimeType ?? body.mime_type;
  }
  if (body.size !== undefined) data.size = parseInt(body.size, 10);
  if (body.folder !== undefined) data.folder = body.folder;
  if (body.altText !== undefined || body.alt_text !== undefined) {
    data.altText = body.altText ?? body.alt_text;
  }
  return data;
}

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

  return res.status(200).json(new ApiResponse(200, assets.map(normalizeMediaAsset), "Media assets fetched."));
});

export const createMediaAsset = asyncHandler(async (req, res) => {
  const data = parseMediaData(req.body);
  const asset = await prisma.mediaAsset.create({
    data: {
      ...data,
      name: data.name || "media-asset",
      fileUrl: data.fileUrl || "",
    },
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

  return res.status(201).json(new ApiResponse(201, normalizeMediaAsset(asset), "Media asset recorded."));
});

export const deleteMediaAsset = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.mediaAsset.delete({ where: { id } });

  return res.status(200).json(new ApiResponse(200, null, "Media asset deleted."));
});

