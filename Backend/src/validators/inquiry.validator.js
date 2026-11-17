import { z } from "zod";

export const createInquirySchema = z.object({
  fullName: z.string().min(2).optional(),
  name: z.string().min(2).optional(),
  email: z.string().email("Valid email is required").trim(),
  phone: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  projectType: z.string().optional().nullable(),
  project_type: z.string().optional().nullable(),
  message: z.string().min(3, "Message must be at least 3 characters").trim(),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "CONTACTED", "RESOLVED", "ARCHIVED"]),
  assignedTo: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

