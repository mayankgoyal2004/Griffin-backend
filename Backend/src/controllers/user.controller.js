import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeUser } from "../utils/serializer.js";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      phone: true,
      avatar: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json(
    new ApiResponse(200, users.map(normalizeUser), "Users retrieved successfully.")
  );
});

export const inviteUser = asyncHandler(async (req, res) => {
  const { email, role = "EDITOR", fullName, full_name, phone } = req.body;

  if (!email || !email.includes("@")) {
    throw new ApiError(400, "A valid email address is required.");
  }

  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (existing) {
    throw new ApiError(409, "A user with this email address already exists.");
  }

  // Generate a random temporary password or standard default
  const defaultPassword = "Admin@" + Math.floor(10000 + Math.random() * 90000);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(defaultPassword, salt);

  const normalizedRole = (role || "EDITOR").toUpperCase();
  const validRole = ["ADMIN", "EDITOR", "USER"].includes(normalizedRole)
    ? normalizedRole
    : "EDITOR";

  const newUser = await prisma.user.create({
    data: {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      fullName: fullName || full_name || email.split("@")[0].replace(/\./g, " "),
      role: validRole,
      phone: phone || null,
      isActive: true,
    },
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      action: "invited",
      entityType: "User",
      entityTitle: newUser.fullName || newUser.email,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      { ...normalizeUser(newUser), tempPassword: defaultPassword },
      "User invited successfully."
    )
  );
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role, isActive, is_active } = req.body;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new ApiError(404, "User not found.");

  const updateData = {};
  if (role) {
    const r = role.toUpperCase();
    if (["ADMIN", "EDITOR", "USER"].includes(r)) {
      updateData.role = r;
    }
  }

  if (isActive !== undefined || is_active !== undefined) {
    updateData.isActive = isActive ?? is_active;
  }

  const updated = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  await prisma.activityLog.create({
    data: {
      action: "updated",
      entityType: "User",
      entityTitle: `${updated.fullName} (role: ${updated.role})`,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(
    new ApiResponse(200, normalizeUser(updated), "User updated successfully.")
  );
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user.id === id) {
    throw new ApiError(400, "You cannot delete your own account.");
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new ApiError(404, "User not found.");

  await prisma.user.delete({ where: { id } });

  await prisma.activityLog.create({
    data: {
      action: "deleted",
      entityType: "User",
      entityTitle: user.fullName || user.email,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(
    new ApiResponse(200, null, "User deleted successfully.")
  );
});

