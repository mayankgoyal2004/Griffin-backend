import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { slugify } from "../utils/slugify.js";
import { normalizeService } from "../utils/serializer.js";

function parseServiceData(body) {
  const data = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.slug !== undefined) data.slug = slugify(body.slug || body.title);
  if (body.category !== undefined) data.category = body.category;
  if (body.shortDescription !== undefined || body.short_description !== undefined) {
    data.shortDescription = body.shortDescription ?? body.short_description;
  }
  if (body.fullDescription !== undefined || body.full_description !== undefined) {
    data.fullDescription = body.fullDescription ?? body.full_description;
  }
  if (body.icon !== undefined) data.icon = body.icon;
  if (body.card_image !== undefined || body.cardImage !== undefined) {
    data.cardImage = body.card_image !== undefined ? body.card_image : body.cardImage;
  }
  if (body.hero_image !== undefined || body.heroImage !== undefined) {
    data.heroImage = body.hero_image !== undefined ? body.hero_image : body.heroImage;
  }
  if (body.overview_image !== undefined || body.overviewImage !== undefined) {
    data.overviewImage = body.overview_image !== undefined ? body.overview_image : body.overviewImage;
  }
  if (body.keyFeatures !== undefined || body.key_features !== undefined) {
    data.keyFeatures = body.keyFeatures ?? body.key_features;
  }
  if (body.displayOrder !== undefined || body.display_order !== undefined) {
    data.displayOrder = parseInt(body.displayOrder ?? body.display_order ?? 0, 10);
  }
  if (body.featured !== undefined) data.featured = Boolean(body.featured);
  if (body.published !== undefined) data.published = Boolean(body.published);
  return data;
}

export const getServices = asyncHandler(async (req, res) => {
  const { category, featured, published, search, page = 1, limit = 50 } = req.query;

  const where = {};
  if (category && category !== "all") where.category = category;
  if (featured !== undefined && featured !== "all") {
    where.featured = featured === "true" || featured === true;
  }

  const hasAuth = Boolean(req.headers.authorization);
  if (published !== undefined && published !== "all") {
    where.published = published === "true" || published === true;
  } else if (!hasAuth && (published === undefined || published === "")) {
    where.published = true;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { shortDescription: { contains: search, mode: "insensitive" } },
    ];
  }

  const take = parseInt(limit, 10);
  const skip = (parseInt(page, 10) - 1) * take;

  const [total, services] = await Promise.all([
    prisma.service.count({ where }),
    prisma.service.findMany({
      where,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      skip,
      take,
    }),
  ]);

  const items = services.map(normalizeService);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        items,
        pagination: {
          total,
          page: parseInt(page, 10),
          limit: take,
          totalPages: Math.ceil(total / take),
        },
      },
      "Services fetched successfully."
    )
  );
});

export const getServiceBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const service = await prisma.service.findUnique({ where: { slug } });

  if (!service) {
    throw new ApiError(404, `Service '${slug}' not found.`);
  }

  return res.status(200).json(new ApiResponse(200, normalizeService(service), "Service fetched successfully."));
});

export const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await prisma.service.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });

  if (!service) {
    throw new ApiError(404, `Service not found.`);
  }

  return res.status(200).json(new ApiResponse(200, normalizeService(service), "Service fetched successfully."));
});

export const createService = asyncHandler(async (req, res) => {
  const data = parseServiceData(req.body);
  const slug = data.slug || slugify(data.title || "service");

  const existing = await prisma.service.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const service = await prisma.service.create({
    data: {
      ...data,
      title: data.title || "Untitled Service",
      category: data.category || "Commercial",
      shortDescription: data.shortDescription || "",
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

  return res.status(201).json(new ApiResponse(201, normalizeService(service), "Service created successfully."));
});

export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = parseServiceData(req.body);

  const existing = await prisma.service.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });
  if (!existing) {
    throw new ApiError(404, "Service not found to update.");
  }

  if (data.slug && data.slug !== existing.slug) {
    const slugExists = await prisma.service.findFirst({
      where: { slug: data.slug, id: { not: existing.id } },
    });
    if (slugExists) {
      throw new ApiError(409, "That URL slug is already used by another service.");
    }
  }

  const updated = await prisma.service.update({
    where: { id: existing.id },
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

  return res.status(200).json(new ApiResponse(200, normalizeService(updated), "Service updated successfully."));
});

export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await prisma.service.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });
  if (!existing) {
    throw new ApiError(404, "Service not found to delete.");
  }

  const deleted = await prisma.service.delete({ where: { id: existing.id } });

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

