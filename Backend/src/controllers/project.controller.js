import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { slugify } from "../utils/slugify.js";
import { normalizeProject } from "../utils/serializer.js";

function parseProjectData(body) {
  const data = {};
  if (body.name !== undefined) data.name = body.name;
  if (body.slug !== undefined) data.slug = slugify(body.slug || body.name);
  if (body.category !== undefined) data.category = body.category;
  if (body.location !== undefined) data.location = body.location;
  if (body.clientName !== undefined || body.client_name !== undefined) {
    data.clientName = body.clientName ?? body.client_name;
  }
  if (body.status !== undefined) {
    const s = String(body.status).toUpperCase();
    data.status = ["PLANNING", "ONGOING", "COMPLETED", "ON_HOLD"].includes(s) ? s : "ONGOING";
  }
  if (body.startDate !== undefined || body.start_date !== undefined) {
    const raw = body.startDate ?? body.start_date;
    data.startDate = raw ? new Date(raw) : null;
  }
  if (body.completionDate !== undefined || body.completion_date !== undefined) {
    const raw = body.completionDate ?? body.completion_date;
    data.completionDate = raw ? new Date(raw) : null;
  }
  if (body.shortDescription !== undefined || body.short_description !== undefined) {
    data.shortDescription = body.shortDescription ?? body.short_description;
  }
  if (body.fullDescription !== undefined || body.full_description !== undefined) {
    data.fullDescription = body.fullDescription ?? body.full_description;
  }
  if (body.coverImage !== undefined || body.cover_image !== undefined) {
    data.coverImage = body.coverImage ?? body.cover_image;
  }
  if (body.gallery !== undefined) data.gallery = body.gallery;
  if (body.displayOrder !== undefined || body.display_order !== undefined) {
    data.displayOrder = parseInt(body.displayOrder ?? body.display_order ?? 0, 10);
  }
  if (body.featured !== undefined) data.featured = Boolean(body.featured);
  if (body.published !== undefined) data.published = Boolean(body.published);
  return data;
}

export const getProjects = asyncHandler(async (req, res) => {
  const { category, status, featured, published, search, page = 1, limit = 50 } = req.query;

  const where = {};
  if (category && category !== "all") where.category = category;
  if (status && status !== "all") {
    const s = String(status).toUpperCase();
    if (["PLANNING", "ONGOING", "COMPLETED", "ON_HOLD"].includes(s)) {
      where.status = s;
    }
  }
  if (featured !== undefined && featured !== "all") where.featured = featured === "true";
  if (published !== undefined && published !== "all") where.published = published === "true";

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
        items: projects.map(normalizeProject),
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

  return res.status(200).json(new ApiResponse(200, normalizeProject(project), "Project fetched successfully."));
});

export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await prisma.project.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });

  if (!project) {
    throw new ApiError(404, `Project not found.`);
  }

  return res.status(200).json(new ApiResponse(200, normalizeProject(project), "Project fetched successfully."));
});

export const createProject = asyncHandler(async (req, res) => {
  const data = parseProjectData(req.body);
  const slug = data.slug || slugify(data.name || "project");

  // Check unique slug
  const existing = await prisma.project.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const project = await prisma.project.create({
    data: {
      ...data,
      name: data.name || "Untitled Project",
      category: data.category || "Commercial",
      location: data.location || "Location",
      shortDescription: data.shortDescription || "",
      coverImage: data.coverImage || "",
      slug: finalSlug,
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

  return res.status(201).json(new ApiResponse(201, normalizeProject(project), "Project created successfully."));
});

export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = parseProjectData(req.body);

  const existing = await prisma.project.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });
  if (!existing) {
    throw new ApiError(404, "Project not found to update.");
  }

  const updated = await prisma.project.update({
    where: { id: existing.id },
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

  return res.status(200).json(new ApiResponse(200, normalizeProject(updated), "Project updated successfully."));
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await prisma.project.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });
  if (!existing) {
    throw new ApiError(404, "Project not found to delete.");
  }

  const deleted = await prisma.project.delete({ where: { id: existing.id } });

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

