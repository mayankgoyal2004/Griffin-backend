import { prisma } from "../config/db.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  normalizeProject,
  normalizeService,
  normalizeBlogPost,
  normalizeInquiry,
  normalizeActivityLog,
} from "../utils/serializer.js";

function getMonthKey(date) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function getLastMonths(count = 6) {
  const months = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("en-GB", { month: "short" }),
    });
  }
  return months;
}

export const getDashboardSummary = asyncHandler(async (req, res) => {
  const [
    totalPages,
    servicesPublished,
    servicesDraft,
    totalProjects,
    totalTeam,
    blogPublished,
    blogDraft,
    inquiriesNew,
    inquiriesPending,
    totalInquiries,
    recentProjects,
    recentServices,
    recentPosts,
    recentInquiries,
    recentActivity,
    allInquiries,
    allPosts,
    projectsByCategoryGroup,
    inquiriesByStatusGroup,
  ] = await Promise.all([
    prisma.websitePage.count(),
    prisma.service.count({ where: { published: true } }),
    prisma.service.count({ where: { published: false } }),
    prisma.project.count(),
    prisma.teamMember.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.blogPost.count({ where: { published: false } }),
    prisma.contactInquiry.count({ where: { status: "NEW" } }),
    prisma.contactInquiry.count({
      where: { status: { in: ["NEW", "CONTACTED", "IN_PROGRESS"] } },
    }),
    prisma.contactInquiry.count(),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),
    prisma.service.findMany({
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),
    prisma.blogPost.findMany({
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),
    prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.contactInquiry.findMany({
      select: { createdAt: true, status: true },
    }),
    prisma.blogPost.findMany({
      select: { createdAt: true, publicationDate: true },
    }),
    prisma.project.groupBy({
      by: ["category"],
      _count: { id: true },
    }),
    prisma.contactInquiry.groupBy({
      by: ["status"],
      _count: { id: true },
    }),
  ]);

  const months = getLastMonths(6);
  const inquiryTrend = months.map((month) => ({
    month: month.label,
    inquiries: allInquiries.filter(
      (row) => getMonthKey(row.createdAt) === month.key
    ).length,
  }));

  const blogTrend = months.map((month) => ({
    month: month.label,
    articles: allPosts.filter((row) => {
      const dt = row.publicationDate || row.createdAt;
      return getMonthKey(dt) === month.key;
    }).length,
  }));

  const categories = projectsByCategoryGroup.map((p) => ({
    name: p.category || "Uncategorised",
    value: p._count.id,
  }));

  const statusMap = {
    NEW: "New",
    CONTACTED: "Contacted",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Converted",
    ARCHIVED: "Closed",
  };

  const statusMix = ["New", "Contacted", "In Progress", "Converted", "Closed"].map((st) => {
    const match = inquiriesByStatusGroup.find((g) => statusMap[g.status] === st);
    return {
      status: st,
      count: match ? match._count.id : 0,
    };
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        pages: totalPages,
        servicesPublished,
        servicesDraft,
        projects: totalProjects,
        team: totalTeam,
        blogPublished,
        blogDraft,
        inquiriesNew,
        inquiriesPending,
        totalInquiries,
        draftContent: servicesDraft + blogDraft,
        inquiryTrend,
        blogTrend,
        categories,
        statusMix,
        recentProjects: recentProjects.map(normalizeProject),
        recentServices: recentServices.map(normalizeService),
        recentPosts: recentPosts.map(normalizeBlogPost),
        recentInquiries: recentInquiries.map(normalizeInquiry),
        recentLogs: recentActivity.map(normalizeActivityLog),
        stats: {
          totalProjects,
          servicesPublished,
          servicesDraft,
          totalServices: servicesPublished + servicesDraft,
          totalInquiries,
          newInquiries: inquiriesNew,
          totalBlogPosts: blogPublished + blogDraft,
        },
        projectsByCategory: categories.map((c) => ({
          category: c.name,
          count: c.value,
        })),
      },
      "Dashboard metrics retrieved successfully."
    )
  );
});
