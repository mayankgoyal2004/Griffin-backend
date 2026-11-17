import { z } from "zod";

export const createBlogPostSchema = z
  .object({
    title: z.string().min(3, "Title is required").trim(),
    slug: z.string().optional(),
    excerpt: z.string().optional().nullable(),
    content: z.string().min(10, "Content is required"),
    author: z.string().optional().default("Admin"),
    category: z.string().optional().default("Industry Insights"),
    tags: z.any().optional().default([]),
    featuredImage: z.string().optional().nullable(),
    featured_image: z.string().optional().nullable(),
    readingTime: z.any().optional().default(5),
    reading_time: z.any().optional().default(5),
    featured: z.boolean().optional().default(false),
    published: z.boolean().optional().default(true),
    publicationDate: z.string().or(z.date()).optional().nullable(),
    publication_date: z.string().or(z.date()).optional().nullable(),
  })
  .passthrough();

export const updateBlogPostSchema = createBlogPostSchema.partial().passthrough();
