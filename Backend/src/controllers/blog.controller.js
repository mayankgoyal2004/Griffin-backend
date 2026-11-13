import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { slugify } from "../utils/slugify.js";
import { normalizeBlogPost } from "../utils/serializer.js";

function parseBlogData(body) {
  const data = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.slug !== undefined) data.slug = slugify(body.slug || body.title);
  if (body.excerpt !== undefined) data.excerpt = body.excerpt;
  if (body.content !== undefined) data.content = body.content;
  if (body.author !== undefined) data.author = body.author;
  if (body.category !== undefined) data.category = body.category;
  if (body.tags !== undefined) data.tags = body.tags;
  if (body.featuredImage !== undefined || body.featured_image !== undefined) {
    data.featuredImage = body.featuredImage ?? body.featured_image;
  }
  if (body.readingTime !== undefined || body.reading_time !== undefined) {
    data.readingTime = parseInt(body.readingTime ?? body.reading_time ?? 5, 10);
  }
  if (body.featured !== undefined) data.featured = Boolean(body.featured);
  if (body.published !== undefined) data.published = Boolean(body.published);
  if (body.publicationDate !== undefined || body.publication_date !== undefined) {
    const raw = body.publicationDate ?? body.publication_date;
    data.publicationDate = raw ? new Date(raw) : new Date();
  }
  return data;
}

export const getBlogPosts = asyncHandler(async (req, res) => {
  const { category, featured, published, search, page = 1, limit = 50 } = req.query;

  const where = {};
  if (category && category !== "all") where.category = category;
  if (featured !== undefined && featured !== "all") where.featured = featured === "true";
  if (published !== undefined && published !== "all") where.published = published === "true";

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
        items: posts.map(normalizeBlogPost),
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

  const post = await prisma.blogPost.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });

  if (!post) {
    throw new ApiError(404, `Post '${slug}' not found.`);
  }

  return res.status(200).json(new ApiResponse(200, normalizeBlogPost(post), "Blog post fetched successfully."));
});

export const getBlogPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await prisma.blogPost.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });

  if (!post) {
    throw new ApiError(404, "Blog post not found.");
  }

  return res.status(200).json(new ApiResponse(200, normalizeBlogPost(post), "Blog post fetched successfully."));
});

export const createBlogPost = asyncHandler(async (req, res) => {
  const data = parseBlogData(req.body);
  const slug = data.slug || slugify(data.title || "post");

  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const post = await prisma.blogPost.create({
    data: {
      ...data,
      title: data.title || "Untitled Post",
      content: data.content || "",
      slug: finalSlug,
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

  return res.status(201).json(new ApiResponse(201, normalizeBlogPost(post), "Blog post created successfully."));
});

export const updateBlogPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = parseBlogData(req.body);

  const existing = await prisma.blogPost.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });
  if (!existing) {
    throw new ApiError(404, "Blog post not found to update.");
  }

  const updated = await prisma.blogPost.update({
    where: { id: existing.id },
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

  return res.status(200).json(new ApiResponse(200, normalizeBlogPost(updated), "Blog post updated successfully."));
});

export const deleteBlogPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await prisma.blogPost.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });
  if (!existing) {
    throw new ApiError(404, "Blog post not found to delete.");
  }

  const deleted = await prisma.blogPost.delete({ where: { id: existing.id } });

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

