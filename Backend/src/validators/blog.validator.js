import { z } from "zod";

export const createBlogPostSchema = z.object({
  title: z.string().min(3, "Title is required").trim(),
  slug: z.string().optional(),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(10, "Content is required"),
  author: z.string().optional().default("Mayank Goyal"),
  category: z.string().optional().default("Industry Insights"),
  tags: z.array(z.string()).optional().default([]),
  featuredImage: z.string().optional().nullable(),
  readingTime: z.number().int().optional().default(5),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  publicationDate: z.string().or(z.date()).optional().nullable(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

