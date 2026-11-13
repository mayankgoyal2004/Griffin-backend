import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeInquiry } from "../utils/serializer.js";

export const getInquiries = asyncHandler(async (req, res) => {
  const { status, projectType, project_type, search, page = 1, limit = 50 } = req.query;

  const where = {};
  if (status && status !== "all") {
    const s = String(status).toUpperCase();
    if (["NEW", "IN_PROGRESS", "CONTACTED", "RESOLVED", "ARCHIVED"].includes(s)) {
      where.status = s;
    }
  }
  const pType = projectType || project_type;
  if (pType && pType !== "all") where.projectType = pType;

  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { subject: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
    ];
  }

  const take = parseInt(limit, 10);
  const skip = (parseInt(page, 10) - 1) * take;

  const [total, inquiries] = await Promise.all([
    prisma.contactInquiry.count({ where }),
    prisma.contactInquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        items: inquiries.map(normalizeInquiry),
        pagination: {
          total,
          page: parseInt(page, 10),
          limit: take,
          totalPages: Math.ceil(total / take),
        },
      },
      "Inquiries fetched successfully."
    )
  );
});

export const getInquiryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const inquiry = await prisma.contactInquiry.findUnique({ where: { id } });

  if (!inquiry) {
    throw new ApiError(404, "Inquiry not found.");
  }

  return res.status(200).json(new ApiResponse(200, normalizeInquiry(inquiry), "Inquiry fetched successfully."));
});

export const createInquiry = asyncHandler(async (req, res) => {
  const { fullName, full_name, email, phone, subject, projectType, project_type, message } = req.body;

  const inquiry = await prisma.contactInquiry.create({
    data: {
      fullName: fullName || full_name || "Anonymous",
      email: email.toLowerCase(),
      phone,
      subject: subject || "Inquiry",
      projectType: projectType || project_type || null,
      message: message || "",
      status: "NEW",
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "received",
      entityType: "ContactInquiry",
      entityTitle: `${inquiry.fullName} - ${inquiry.subject}`,
      userEmail: email,
      userName: inquiry.fullName,
    },
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      normalizeInquiry(inquiry),
      "Thank you for contacting Griffin Construction. We have received your inquiry and will be in touch shortly."
    )
  );
});

export const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, assignedTo, assigned_to, notes } = req.body;

  const updateData = {};
  if (status) {
    const s = String(status).toUpperCase().replace(/\s+/g, "_");
    if (["NEW", "IN_PROGRESS", "CONTACTED", "RESOLVED", "ARCHIVED"].includes(s)) {
      updateData.status = s;
    }
  }
  if (assignedTo !== undefined || assigned_to !== undefined) {
    updateData.assignedTo = assignedTo ?? assigned_to;
  }
  if (notes !== undefined) updateData.notes = notes;

  const updated = await prisma.contactInquiry.update({
    where: { id },
    data: updateData,
  });

  await prisma.activityLog.create({
    data: {
      action: "status_changed",
      entityType: "ContactInquiry",
      entityTitle: `${updated.fullName} (${updated.status})`,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, normalizeInquiry(updated), "Inquiry status updated successfully."));
});

export const updateInquiry = asyncHandler(async (req, res) => {
  return updateInquiryStatus(req, res);
});

export const deleteInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.contactInquiry.delete({ where: { id } });

  return res.status(200).json(new ApiResponse(200, null, "Inquiry deleted successfully."));
});

