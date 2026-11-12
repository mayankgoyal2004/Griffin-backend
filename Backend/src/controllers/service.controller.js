import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { slugify } from "../utils/slugify.js";

export const getServices = asyncHandler(async (req, res) => {
  const { category, featured, published, search } = req.query;

  const where = {};
  if (category) where.category = category;
  if (featured !== undefined) where.featured = featured === "true";
  if (published !== undefined) where.published = published === "true";

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { shortDescription: { contains: search, mode: "insensitive" } },
    ];
  }

  const services = await prisma.service.findMany({
    where,
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return res.status(200).json(new ApiResponse(200, services, "Services fetched successfully."));
});

export const getServiceBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const service = await prisma.service.findUnique({ where: { slug } });

  if (!service) {
    throw new ApiError(404, `Service '${slug}' not found.`);
  }

  return res.status(200).json(new ApiResponse(200, service, "Service fetched successfully."));
});

export const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) {
    throw new ApiError(404, `Service not found.`);
  }

  return res.status(200).json(new ApiResponse(200, service, "Service fetched successfully."));
});

export const createService = asyncHandler(async (req, res) => {
  const data = req.body;
  const slug = data.slug ? slugify(data.slug) : slugify(data.title);

  const existing = await prisma.service.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const service = await prisma.service.create({
    data: {
      ...data,
      slug: finalSlug,
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "created",
      entityType: "Service",
      entityTitle: service.title,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(201).json(new ApiResponse(201, service, "Service created successfully."));
});

export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (data.slug) {
    data.slug = slugify(data.slug);
  }

  const updated = await prisma.service.update({
    where: { id },
    data,
  });

  await prisma.activityLog.create({
    data: {
      action: "updated",
      entityType: "Service",
      entityTitle: updated.title,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, updated, "Service updated successfully."));
});

export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await prisma.service.delete({ where: { id } });

  await prisma.activityLog.create({
    data: {
      action: "deleted",
      entityType: "Service",
      entityTitle: deleted.title,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, null, "Service deleted successfully."));
});

