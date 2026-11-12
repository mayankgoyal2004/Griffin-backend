import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getPages = asyncHandler(async (req, res) => {
  const pages = await prisma.websitePage.findMany({
    orderBy: { slug: "asc" },
  });
  return res.status(200).json(new ApiResponse(200, pages, "Pages fetched successfully."));
});

export const getPageBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const page = await prisma.websitePage.findUnique({ where: { slug } });

  if (!page) {
    throw new ApiError(404, `Page '${slug}' not found.`);
  }

  return res.status(200).json(new ApiResponse(200, page, "Page content fetched successfully."));
});

export const updatePage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const data = req.body;

  const page = await prisma.websitePage.upsert({
    where: { slug },
    update: data,
    create: {
      ...data,
      slug,
      title: data.title || slug.toUpperCase(),
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "updated",
      entityType: "WebsitePage",
      entityTitle: page.title,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, page, "Page updated successfully."));
});

