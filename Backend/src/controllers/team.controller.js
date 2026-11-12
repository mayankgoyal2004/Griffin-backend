import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getTeamMembers = asyncHandler(async (req, res) => {
  const { featured, published } = req.query;

  const where = {};
  if (featured !== undefined) where.featured = featured === "true";
  if (published !== undefined) where.published = published === "true";

  const members = await prisma.teamMember.findMany({
    where,
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return res.status(200).json(new ApiResponse(200, members, "Team members fetched successfully."));
});

export const getTeamMemberById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const member = await prisma.teamMember.findUnique({ where: { id } });

  if (!member) throw new ApiError(404, "Team member not found.");
  return res.status(200).json(new ApiResponse(200, member, "Team member fetched."));
});

export const createTeamMember = asyncHandler(async (req, res) => {
  const member = await prisma.teamMember.create({
    data: req.body,
  });

  await prisma.activityLog.create({
    data: {
      action: "created",
      entityType: "TeamMember",
      entityTitle: member.fullName,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(201).json(new ApiResponse(201, member, "Team member created successfully."));
});

export const updateTeamMember = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updated = await prisma.teamMember.update({
    where: { id },
    data: req.body,
  });

  await prisma.activityLog.create({
    data: {
      action: "updated",
      entityType: "TeamMember",
      entityTitle: updated.fullName,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, updated, "Team member updated successfully."));
});

export const deleteTeamMember = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await prisma.teamMember.delete({ where: { id } });

  await prisma.activityLog.create({
    data: {
      action: "deleted",
      entityType: "TeamMember",
      entityTitle: deleted.fullName,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, null, "Team member deleted successfully."));
});

