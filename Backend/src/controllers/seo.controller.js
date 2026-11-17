import { prisma } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getSitemap = asyncHandler(async (req, res) => {
  const [pages, services, projects, posts, settings] = await Promise.all([
    prisma.websitePage.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.service.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.siteSettings.findUnique({
      where: { id: "settings_global" },
      select: { websiteUrl: true },
    }),
  ]);

  const baseUrl = (settings?.websiteUrl || "https://griffinconstruction.in").replace(/\/$/, "");

  let urls = `  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  for (const page of pages) {
    if (page.slug === "home") continue;
    urls += `  <url>\n    <loc>${baseUrl}/${page.slug}</loc>\n    <lastmod>${new Date(page.updatedAt).toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  }

  for (const service of services) {
    urls += `  <url>\n    <loc>${baseUrl}/services/${service.slug}</loc>\n    <lastmod>${new Date(service.updatedAt).toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  }

  for (const project of projects) {
    urls += `  <url>\n    <loc>${baseUrl}/projects/${project.slug}</loc>\n    <lastmod>${new Date(project.updatedAt).toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  }

  for (const post of posts) {
    urls += `  <url>\n    <loc>${baseUrl}/blog/${post.slug}</loc>\n    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>`;

  res.header("Content-Type", "application/xml");
  return res.status(200).send(sitemapXml);
});

export const getRobots = asyncHandler(async (req, res) => {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "settings_global" },
    select: { websiteUrl: true },
  });

  const baseUrl = (settings?.websiteUrl || "https://griffinconstruction.in").replace(/\/$/, "");

  const robotsTxt = `# Griffin Construction robots.txt
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/

Sitemap: ${baseUrl}/api/sitemap
`;

  res.header("Content-Type", "text/plain");
  return res.status(200).send(robotsTxt);
});

