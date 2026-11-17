import { z } from "zod";

export const createProjectSchema = z
  .object({
    name: z.string().min(2, "Project name is required").trim(),
    slug: z.string().optional(),
    category: z.string().min(2, "Category is required"),
    location: z.string().min(2, "Location is required"),
    clientName: z.string().optional().nullable(),
    client_name: z.string().optional().nullable(),
    status: z.enum(["PLANNING", "ONGOING", "COMPLETED", "ON_HOLD"]).default("ONGOING"),
    startDate: z.string().or(z.date()).optional().nullable(),
    start_date: z.string().or(z.date()).optional().nullable(),
    completionDate: z.string().or(z.date()).optional().nullable(),
    completion_date: z.string().or(z.date()).optional().nullable(),
    shortDescription: z.string().optional(),
    short_description: z.string().optional(),
    fullDescription: z.string().optional().nullable(),
    full_description: z.string().optional().nullable(),
    coverImage: z.string().optional().nullable(),
    cover_image: z.string().optional().nullable(),
    gallery: z.any().optional().default([]),
    displayOrder: z.any().optional().default(0),
    display_order: z.any().optional().default(0),
    featured: z.boolean().optional().default(false),
    published: z.boolean().optional().default(true),
  })
  .passthrough();

export const updateProjectSchema = createProjectSchema.partial().passthrough();

