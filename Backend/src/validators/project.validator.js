import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(2, "Project name is required").trim(),
  slug: z.string().optional(),
  category: z.string().min(2, "Category is required"),
  location: z.string().min(2, "Location is required"),
  clientName: z.string().optional().nullable(),
  status: z.enum(["PLANNING", "ONGOING", "COMPLETED", "ON_HOLD"]).default("ONGOING"),
  startDate: z.string().or(z.date()).optional().nullable(),
  completionDate: z.string().or(z.date()).optional().nullable(),
  shortDescription: z.string().min(10, "Short description is required"),
  fullDescription: z.string().optional().nullable(),
  coverImage: z.string().min(1, "Cover image is required"),
  gallery: z.array(z.string()).optional().default([]),
  displayOrder: z.number().int().optional().default(0),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
});

export const updateProjectSchema = createProjectSchema.partial();

