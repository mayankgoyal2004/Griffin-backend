import { z } from "zod";

export const createInquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required").trim(),
  email: z.string().email("Valid email is required").trim(),
  phone: z.string().optional().nullable(),
  subject: z.string().min(3, "Subject is required").trim(),
  projectType: z.string().optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters").trim(),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "CONTACTED", "RESOLVED", "ARCHIVED"]),
  assignedTo: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

