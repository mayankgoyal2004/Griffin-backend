import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";

export const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errors = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
  }

  // Handle Prisma Known Request Errors
  if (err.code === "P2002") {
    statusCode = 409;
    const target = err.meta?.target ? ` (${err.meta.target})` : "";
    message = `A record with this unique value already exists${target}.`;
  } else if (err.code === "P2025") {
    statusCode = 404;
    message = "Record not found.";
  }

  // Log error in development or server errors
  if (statusCode >= 500) {
    logger.error(`[${req.method} ${req.originalUrl}] Server Error:`, err);
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
};

