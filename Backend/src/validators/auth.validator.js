import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address format").trim(),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address format").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters").trim(),
  role: z.enum(["ADMIN", "EDITOR", "USER"]).optional(),
  phone: z.string().optional(),
});

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").optional(),
  full_name: z.string().min(2).optional(),
  phone: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  currentPassword: z.string().optional(),
  current_password: z.string().optional(),
  newPassword: z.string().min(6, "New password must be at least 6 characters").optional(),
  new_password: z.string().min(6).optional(),
});

