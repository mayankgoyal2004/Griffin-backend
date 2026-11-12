import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { slugify } from "../utils/slugify.js";

export const getProjects = asyncHandler(async (req, res) => {
  const { category, status, featured, published, search, page = 1, limit = 50 } = req.query;

  const where = {};
  if (category) where.category = category;
  if (status) where.status = status;
  if (featured !== undefined) where.featured = featured === "true";
  if (published !== undefined) where.published = published === "true";

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { location: { contains: search, mode: "insensitive" } },
      { shortDescription: { contains: search, mode: "insensitive" } },
    ];
  }

  const take = parseInt(limit, 10);
  const skip = (parseInt(page, 10) - 1) * take;

  const [total, projects] = await Promise.all([
    prisma.project.count({ where }),
    prisma.project.findMany({
      where,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      skip,
      take,
    }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        items: projects,
        pagination: {
          total,
          page: parseInt(page, 10),
          limit: take,
          totalPages: Math.ceil(total / take),
        },
      },
      "Projects fetched successfully."
    )
  );
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    throw new ApiError(404, `Project with slug '${slug}' not found.`);
  }

  return res.status(200).json(new ApiResponse(200, project, "Project fetched successfully."));
});

export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    throw new ApiError(404, `Project not found.`);
  }

  return res.status(200).json(new ApiResponse(200, project, "Project fetched successfully."));
});

export const createProject = asyncHandler(async (req, res) => {
  const data = req.body;
  const slug = data.slug ? slugify(data.slug) : slugify(data.name);

  // Check unique slug
  const existing = await prisma.project.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const project = await prisma.project.create({
    data: {
      ...data,
      slug: finalSlug,
      startDate: data.startDate ? new Date(data.startDate) : null,
      completionDate: data.completionDate ? new Date(data.completionDate) : null,
    },
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      action: "created",
      entityType: "Project",
      entityTitle: project.name,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(201).json(new ApiResponse(201, project, "Project created successfully."));
});

export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (data.slug) {
    data.slug = slugify(data.slug);
  }
  if (data.startDate) data.startDate = new Date(data.startDate);
  if (data.completionDate) data.completionDate = new Date(data.completionDate);

  const updated = await prisma.project.update({
    where: { id },
    data,
  });

  await prisma.activityLog.create({
    data: {
      action: "updated",
      entityType: "Project",
      entityTitle: updated.name,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, updated, "Project updated successfully."));
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await prisma.project.delete({ where: { id } });

  await prisma.activityLog.create({
    data: {
      action: "deleted",
      entityType: "Project",
      entityTitle: deleted.name,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, null, "Project deleted successfully."));
});

