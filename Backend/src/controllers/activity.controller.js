import { prisma } from "../config/db.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeActivityLog } from "../utils/serializer.js";

export const getActivityLogs = asyncHandler(async (req, res) => {
  const { limit = 50, page = 1, action, search } = req.query;

  const where = {};
  if (action && action !== "all") {
    where.action = action.toLowerCase();
  }
  if (search) {
    where.OR = [
      { entityTitle: { contains: search, mode: "insensitive" } },
      { userName: { contains: search, mode: "insensitive" } },
      { userEmail: { contains: search, mode: "insensitive" } },
    ];
  }

  const take = parseInt(limit, 10);
  const skip = (parseInt(page, 10) - 1) * take;

  const [total, logs] = await Promise.all([
    prisma.activityLog.count({ where }),
    prisma.activityLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
  ]);

  const items = logs.map(normalizeActivityLog);

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
      "Activity logs fetched."
    )
  );
});

export const createActivityLog = asyncHandler(async (req, res) => {
  const {
    action,
    entity_type,
    entityType,
    entity_title,
    entityTitle,
    user_email,
    userEmail,
    user_name,
    userName,
  } = req.body;

  const log = await prisma.activityLog.create({
    data: {
      action: (action || "updated").toLowerCase(),
      entityType: entity_type || entityType || "System",
      entityTitle: entity_title || entityTitle || "",
      userEmail: user_email || userEmail || req.user?.email || "admin@griffin.com",
      userName: user_name || userName || req.user?.fullName || "Admin",
      userId: req.user?.id || null,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, normalizeActivityLog(log), "Activity logged."));
});
