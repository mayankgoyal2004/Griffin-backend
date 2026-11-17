import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
import { ENV } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeUser } from "../utils/serializer.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    ENV.JWT_SECRET,
    { expiresIn: ENV.JWT_EXPIRES_IN }
  );
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account has been deactivated. Please contact an administrator.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password.");
  }

  // Update last login timestamp
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      action: "logged_in",
      entityType: "User",
      entityTitle: user.fullName,
      userEmail: user.email,
      userName: user.fullName,
      userId: user.id,
    },
  });

  const token = generateToken(user);

  // Set cookie for browser sessions
  res.cookie("token", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const userPayload = normalizeUser(user);

  return res.status(200).json(
    new ApiResponse(
      200,
      { user: userPayload, token },
      "Logged in successfully."
    )
  );
});

export const register = asyncHandler(async (req, res) => {
  const { email, password, fullName, full_name, role = "ADMIN", phone } = req.body;

  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existing) {
    throw new ApiError(409, "A user with this email already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      fullName: fullName || full_name || "Admin User",
      role: (role || "ADMIN").toUpperCase(),
      phone,
    },
  });

  const token = generateToken(newUser);

  return res.status(201).json(
    new ApiResponse(201, { user: normalizeUser(newUser), token }, "User registered successfully.")
  );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, normalizeUser(req.user), "Current user profile fetched successfully.")
  );
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json(new ApiResponse(200, null, "Logged out successfully."));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const name = req.body.fullName || req.body.full_name;
  const phone = req.body.phone;
  const avatar = req.body.avatar;
  const currPass = req.body.currentPassword || req.body.current_password;
  const newPass = req.body.newPassword || req.body.new_password;
  const userId = req.user.id;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new ApiError(404, "User not found.");

  const updateData = {};
  if (name && name.trim().length > 0) updateData.fullName = name.trim();
  if (phone !== undefined) updateData.phone = phone ? phone.trim() : null;
  if (avatar !== undefined) updateData.avatar = avatar ? avatar.trim() : null;

  if (newPass) {
    if (!currPass) {
      throw new ApiError(400, "Current password is required to set a new password.");
    }
    const isMatch = await bcrypt.compare(currPass, user.password);
    if (!isMatch) {
      throw new ApiError(400, "Incorrect current password.");
    }
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(newPass, salt);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      action: "updated",
      entityType: "User",
      entityTitle: updatedUser.fullName,
      userEmail: updatedUser.email,
      userName: updatedUser.fullName,
      userId: updatedUser.id,
    },
  });

  return res.status(200).json(
    new ApiResponse(200, normalizeUser(updatedUser), "Profile updated successfully.")
  );
});

