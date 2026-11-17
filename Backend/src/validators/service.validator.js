import { z } from "zod";

export const createServiceSchema = z
  .object({
    title: z.string().min(2, "Service title is required").trim(),
    slug: z.string().optional(),
    category: z.string().optional(),
    shortDescription: z.string().optional(),
    short_description: z.string().optional(),
    fullDescription: z.string().optional().nullable(),
    full_description: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
    cardImage: z.string().optional().nullable(),
    card_image: z.string().optional().nullable(),
    heroImage: z.string().optional().nullable(),
    hero_image: z.string().optional().nullable(),
    overviewImage: z.string().optional().nullable(),
    overview_image: z.string().optional().nullable(),
    keyFeatures: z.any().optional(),
    key_features: z.any().optional(),
    displayOrder: z.any().optional(),
    display_order: z.any().optional(),
    featured: z.boolean().optional().default(false),
    published: z.boolean().optional().default(true),
  })
  .passthrough();

export const updateServiceSchema = createServiceSchema.partial().passthrough();

