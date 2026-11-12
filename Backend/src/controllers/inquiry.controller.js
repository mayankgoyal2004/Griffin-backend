import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getInquiries = asyncHandler(async (req, res) => {
  const { status, projectType, search, page = 1, limit = 50 } = req.query;

  const where = {};
  if (status) where.status = status;
  if (projectType) where.projectType = projectType;

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
        items: inquiries,
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

  return res.status(200).json(new ApiResponse(200, inquiry, "Inquiry fetched successfully."));
});

export const createInquiry = asyncHandler(async (req, res) => {
  const { fullName, email, phone, subject, projectType, message } = req.body;

  const inquiry = await prisma.contactInquiry.create({
    data: {
      fullName,
      email: email.toLowerCase(),
      phone,
      subject,
      projectType,
      message,
      status: "NEW",
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "received",
      entityType: "ContactInquiry",
      entityTitle: `${fullName} - ${subject}`,
      userEmail: email,
      userName: fullName,
    },
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      inquiry,
      "Thank you for contacting Griffin Construction. We have received your inquiry and will be in touch shortly."
    )
  );
});

export const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, assignedTo, notes } = req.body;

  const updateData = {};
  if (status) updateData.status = status;
  if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
  if (notes !== undefined) updateData.notes = notes;

  const updated = await prisma.contactInquiry.update({
    where: { id },
    data: updateData,
  });

  await prisma.activityLog.create({
    data: {
      action: "status_changed",
      entityType: "ContactInquiry",
      entityTitle: `${updated.fullName} (${status})`,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, updated, "Inquiry status updated successfully."));
});

export const deleteInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.contactInquiry.delete({ where: { id } });

  return res.status(200).json(new ApiResponse(200, null, "Inquiry deleted successfully."));
});

