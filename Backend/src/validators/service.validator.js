import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().min(2, "Service title is required").trim(),
  slug: z.string().optional(),
  category: z.string().min(2, "Category is required"),
  shortDescription: z.string().min(10, "Short description is required"),
  fullDescription: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  cardImage: z.string().optional().nullable(),
  heroImage: z.string().optional().nullable(),
  overviewImage: z.string().optional().nullable(),
  keyFeatures: z.array(z.string()).optional().default([]),
  displayOrder: z.number().int().optional().default(0),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
});

export const updateServiceSchema = createServiceSchema.partial();

