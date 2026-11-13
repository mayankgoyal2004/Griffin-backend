import { prisma } from "../config/db.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeActivityLog } from "../utils/serializer.js";

export const getActivityLogs = asyncHandler(async (req, res) => {
  const { limit = 30 } = req.query;

  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: parseInt(limit, 10),
  });

  return res.status(200).json(new ApiResponse(200, logs.map(normalizeActivityLog), "Activity logs fetched."));
});

