import { prisma } from "../config/db.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeInquiry, normalizeActivityLog } from "../utils/serializer.js";

export const getDashboardSummary = asyncHandler(async (req, res) => {
  const [
    totalProjects,
    ongoingProjects,
    completedProjects,
    totalServices,
    totalInquiries,
    newInquiries,
    totalBlogPosts,
    recentInquiries,
    recentActivity,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "ONGOING" } }),
    prisma.project.count({ where: { status: "COMPLETED" } }),
    prisma.service.count(),
    prisma.contactInquiry.count(),
    prisma.contactInquiry.count({ where: { status: "NEW" } }),
    prisma.blogPost.count(),
    prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  // Aggregate projects by category
  const projectsByCategory = await prisma.project.groupBy({
    by: ["category"],
    _count: { id: true },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        stats: {
          totalProjects,
          ongoingProjects,
          completedProjects,
          totalServices,
          totalInquiries,
          newInquiries,
          totalBlogPosts,
        },
        projectsByCategory: projectsByCategory.map((p) => ({
          category: p.category,
          count: p._count.id,
        })),
        recentInquiries: recentInquiries.map(normalizeInquiry),
        recentActivity: recentActivity.map(normalizeActivityLog),
      },
      "Dashboard metrics retrieved successfully."
    )
  );
});

