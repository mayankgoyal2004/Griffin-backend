import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { slugify } from "../utils/slugify.js";

export const getBlogPosts = asyncHandler(async (req, res) => {
  const { category, featured, published, search, page = 1, limit = 20 } = req.query;

  const where = {};
  if (category) where.category = category;
  if (featured !== undefined) where.featured = featured === "true";
  if (published !== undefined) where.published = published === "true";

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  const take = parseInt(limit, 10);
  const skip = (parseInt(page, 10) - 1) * take;

  const [total, posts] = await Promise.all([
    prisma.blogPost.count({ where }),
    prisma.blogPost.findMany({
      where,
      orderBy: { publicationDate: "desc" },
      skip,
      take,
    }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        items: posts,
        pagination: {
          total,
          page: parseInt(page, 10),
          limit: take,
          totalPages: Math.ceil(total / take),
        },
      },
      "Blog posts fetched successfully."
    )
  );
});

export const getBlogPostBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  // Increment views
  const post = await prisma.blogPost.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });

  if (!post) {
    throw new ApiError(404, `Post '${slug}' not found.`);
  }

  return res.status(200).json(new ApiResponse(200, post, "Blog post fetched successfully."));
});

export const getBlogPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) {
    throw new ApiError(404, "Blog post not found.");
  }

  return res.status(200).json(new ApiResponse(200, post, "Blog post fetched successfully."));
});

export const createBlogPost = asyncHandler(async (req, res) => {
  const data = req.body;
  const slug = data.slug ? slugify(data.slug) : slugify(data.title);

  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const post = await prisma.blogPost.create({
    data: {
      ...data,
      slug: finalSlug,
      publicationDate: data.publicationDate ? new Date(data.publicationDate) : new Date(),
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "created",
      entityType: "BlogPost",
      entityTitle: post.title,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(201).json(new ApiResponse(201, post, "Blog post created successfully."));
});

export const updateBlogPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (data.slug) data.slug = slugify(data.slug);
  if (data.publicationDate) data.publicationDate = new Date(data.publicationDate);

  const updated = await prisma.blogPost.update({
    where: { id },
    data,
  });

  await prisma.activityLog.create({
    data: {
      action: "updated",
      entityType: "BlogPost",
      entityTitle: updated.title,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, updated, "Blog post updated successfully."));
});

export const deleteBlogPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await prisma.blogPost.delete({ where: { id } });

  await prisma.activityLog.create({
    data: {
      action: "deleted",
      entityType: "BlogPost",
      entityTitle: deleted.title,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, null, "Blog post deleted successfully."));
});

