import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeNewsletterSubscriber } from "../utils/serializer.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Public subscription endpoint
 * POST /api/v1/newsletter/subscribe
 */
export const subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email, source = "blog" } = req.body;

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    throw new ApiError(400, "Please provide a valid email address.");
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanSource = String(source).slice(0, 50);

  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email: cleanEmail },
  });

  if (existing) {
    if (existing.status === "UNSUBSCRIBED") {
      const reactivated = await prisma.newsletterSubscriber.update({
        where: { id: existing.id },
        data: { status: "SUBSCRIBED", source: cleanSource },
      });
      return res
        .status(200)
        .json(new ApiResponse(200, normalizeNewsletterSubscriber(reactivated), "Welcome back! Your subscription has been reactivated."));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, normalizeNewsletterSubscriber(existing), "You are already subscribed to our newsletter!"));
  }

  const subscriber = await prisma.newsletterSubscriber.create({
    data: {
      email: cleanEmail,
      status: "SUBSCRIBED",
      source: cleanSource,
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "received",
      entityType: "Newsletter",
      entityTitle: cleanEmail,
      userEmail: "system@griffinconstruction.in",
      userName: "Website Visitor",
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, normalizeNewsletterSubscriber(subscriber), "Thank you for subscribing to our newsletter!"));
});

/**
 * Admin: Get all subscribers
 * GET /api/v1/newsletter
 */
export const getSubscribers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50, search, status } = req.query;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, Math.min(200, parseInt(limit, 10) || 50));
  const skip = (pageNum - 1) * limitNum;

  const where = {};
  if (status && status !== "all") {
    where.status = String(status).toUpperCase();
  }
  if (search) {
    where.email = { contains: String(search).trim().toLowerCase(), mode: "insensitive" };
  }

  const [total, subscribers] = await Promise.all([
    prisma.newsletterSubscriber.count({ where }),
    prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limitNum,
    }),
  ]);

  const totalPages = Math.ceil(total / limitNum) || 1;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        items: subscribers.map(normalizeNewsletterSubscriber),
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages,
        },
      },
      "Subscribers fetched successfully."
    )
  );
});

/**
 * Admin: Update subscriber status
 * PATCH /api/v1/newsletter/:id/status
 */
export const updateSubscriberStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["SUBSCRIBED", "UNSUBSCRIBED"].includes(String(status).toUpperCase())) {
    throw new ApiError(400, "Valid status ('SUBSCRIBED' or 'UNSUBSCRIBED') is required.");
  }

  const existing = await prisma.newsletterSubscriber.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(404, "Subscriber not found.");
  }

  const updated = await prisma.newsletterSubscriber.update({
    where: { id },
    data: { status: String(status).toUpperCase() },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, normalizeNewsletterSubscriber(updated), "Subscriber status updated successfully."));
});

/**
 * Admin: Delete subscriber
 * DELETE /api/v1/newsletter/:id
 */
export const deleteSubscriber = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existing = await prisma.newsletterSubscriber.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(404, "Subscriber not found.");
  }

  await prisma.newsletterSubscriber.delete({ where: { id } });

  await prisma.activityLog.create({
    data: {
      action: "deleted",
      entityType: "Newsletter",
      entityTitle: existing.email,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, { id }, "Subscriber deleted successfully."));
});
