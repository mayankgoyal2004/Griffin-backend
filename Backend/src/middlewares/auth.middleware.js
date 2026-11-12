import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Verifies JWT token from Authorization header or cookie
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  let token = null;

  // Check Authorization Bearer header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    // Or from signed/plain cookie
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, "Authentication required. Please sign in to continue.");
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      throw new ApiError(401, "User no longer exists or account has been deactivated.");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, "Invalid or expired authentication token.");
  }
});

/**
 * Optional authentication middleware: if token is valid, attaches req.user, else continues as guest
 */
export const optionalAuthenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.cookies?.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, fullName: true, role: true, isActive: true },
      });
      if (user && user.isActive) {
        req.user = user;
      }
    } catch {
      // Ignore token failure for optional auth
    }
  }
  next();
});

/**
 * Role-Based Access Control (RBAC)
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required."));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, `Access denied: role '${req.user.role}' is not authorized.`)
      );
    }

    next();
  };
};

