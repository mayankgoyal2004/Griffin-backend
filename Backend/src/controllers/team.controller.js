import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeTeamMember } from "../utils/serializer.js";

function parseTeamData(body) {
  const data = {};
  if (body.fullName !== undefined || body.full_name !== undefined) {
    data.fullName = body.fullName ?? body.full_name;
  }
  if (body.designation !== undefined) data.designation = body.designation;
  if (body.shortBio !== undefined || body.short_bio !== undefined) {
    data.shortBio = body.shortBio ?? body.short_bio;
  }
  if (body.photo !== undefined) data.photo = body.photo;
  if (body.linkedinUrl !== undefined || body.linkedin_url !== undefined) {
    data.linkedinUrl = body.linkedinUrl ?? body.linkedin_url;
  }
  if (body.email !== undefined) data.email = body.email;
  if (body.experience !== undefined) data.experience = body.experience;
  if (body.skills !== undefined) data.skills = body.skills;
  if (body.displayOrder !== undefined || body.display_order !== undefined) {
    data.displayOrder = parseInt(body.displayOrder ?? body.display_order ?? 0, 10);
  }
  if (body.featured !== undefined) data.featured = Boolean(body.featured);
  if (body.published !== undefined) data.published = Boolean(body.published);
  return data;
}

export const getTeamMembers = asyncHandler(async (req, res) => {
  const { featured, published } = req.query;

  const where = {};
  if (featured !== undefined && featured !== "all") where.featured = featured === "true";
  if (published !== undefined && published !== "all") where.published = published === "true";

  const members = await prisma.teamMember.findMany({
    where,
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return res.status(200).json(new ApiResponse(200, members.map(normalizeTeamMember), "Team members fetched successfully."));
});

export const getTeamMemberById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const member = await prisma.teamMember.findUnique({ where: { id } });

  if (!member) throw new ApiError(404, "Team member not found.");
  return res.status(200).json(new ApiResponse(200, normalizeTeamMember(member), "Team member fetched."));
});

export const createTeamMember = asyncHandler(async (req, res) => {
  const data = parseTeamData(req.body);
  const member = await prisma.teamMember.create({
    data: {
      ...data,
      fullName: data.fullName || "Team Member",
      designation: data.designation || "Staff",
    },
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

  return res.status(201).json(new ApiResponse(201, normalizeTeamMember(member), "Team member created successfully."));
});

export const updateTeamMember = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = parseTeamData(req.body);

  const updated = await prisma.teamMember.update({
    where: { id },
    data,
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

  return res.status(200).json(new ApiResponse(200, normalizeTeamMember(updated), "Team member updated successfully."));
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

