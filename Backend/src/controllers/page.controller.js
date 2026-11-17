import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeWebsitePage } from "../utils/serializer.js";

function parsePageData(body) {
  const data = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.page_type !== undefined) {
    data.pageType = body.page_type;
  } else if (body.pageType !== undefined) {
    data.pageType = body.pageType;
  }
  if (body.heading !== undefined) data.heading = body.heading;
  if (body.subtitle !== undefined) data.subtitle = body.subtitle;
  if (body.description !== undefined) data.description = body.description;

  if (body.hero_image !== undefined) {
    data.heroImage = body.hero_image;
  } else if (body.heroImage !== undefined) {
    data.heroImage = body.heroImage;
  }

  if (body.hero_secondary_image !== undefined) {
    data.heroSecondaryImage = body.hero_secondary_image;
  } else if (body.heroSecondaryImage !== undefined) {
    data.heroSecondaryImage = body.heroSecondaryImage;
  }

  if (body.cta_text !== undefined) {
    data.ctaText = body.cta_text;
  } else if (body.ctaText !== undefined) {
    data.ctaText = body.ctaText;
  }

  if (body.cta_link !== undefined) {
    data.ctaLink = body.cta_link;
  } else if (body.ctaLink !== undefined) {
    data.ctaLink = body.ctaLink;
  }

  if (body.seo_title !== undefined) {
    data.seoTitle = body.seo_title;
  } else if (body.seoTitle !== undefined) {
    data.seoTitle = body.seoTitle;
  }

  if (body.seo_description !== undefined) {
    data.seoDescription = body.seo_description;
  } else if (body.seoDescription !== undefined) {
    data.seoDescription = body.seoDescription;
  }

  if (body.canonical_url !== undefined) {
    data.canonicalUrl = body.canonical_url;
  } else if (body.canonicalUrl !== undefined) {
    data.canonicalUrl = body.canonicalUrl;
  }

  if (body.og_image !== undefined) {
    data.ogImage = body.og_image;
  } else if (body.ogImage !== undefined) {
    data.ogImage = body.ogImage;
  }

  if (body.robots_index !== undefined) {
    data.robotsIndex = Boolean(body.robots_index);
  } else if (body.robotsIndex !== undefined) {
    data.robotsIndex = Boolean(body.robotsIndex);
  }

  if (body.sections !== undefined) data.sections = body.sections;
  if (body.stats !== undefined) data.stats = body.stats;
  if (body.advantages !== undefined) data.advantages = body.advantages;
  if (body.last_revised !== undefined) {
    data.lastRevised = body.last_revised;
  } else if (body.lastRevised !== undefined) {
    data.lastRevised = body.lastRevised;
  }
  if (body.published !== undefined) data.published = Boolean(body.published);
  return data;
}

export const getPages = asyncHandler(async (req, res) => {
  const pages = await prisma.websitePage.findMany({
    orderBy: { slug: "asc" },
  });
  return res.status(200).json(new ApiResponse(200, pages.map(normalizeWebsitePage), "Pages fetched successfully."));
});

export const getPageBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
  const page = await prisma.websitePage.findFirst({
    where: isUuid ? { OR: [{ id: slug }, { slug }] } : { slug },
  });

  if (!page) {
    throw new ApiError(404, `Page '${slug}' not found.`);
  }

  return res.status(200).json(new ApiResponse(200, normalizeWebsitePage(page), "Page content fetched successfully."));
});

export const updatePage = asyncHandler(async (req, res) => {
  const { slug: identifier } = req.params;
  const updateData = parsePageData(req.body);

  const targetSlug = req.body.slug || (!(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier)) ? identifier : null);

  const existing = await prisma.websitePage.findFirst({
    where: {
      OR: [
        { id: identifier },
        ...(targetSlug ? [{ slug: targetSlug }] : []),
        { slug: identifier },
      ],
    },
  });

  let page;
  if (existing) {
    page = await prisma.websitePage.update({
      where: { id: existing.id },
      data: updateData,
    });
  } else {
    const finalSlug = targetSlug || identifier;
    page = await prisma.websitePage.create({
      data: {
        ...updateData,
        slug: finalSlug,
        title: updateData.title || finalSlug.toUpperCase(),
      },
    });
  }

  await prisma.activityLog.create({
    data: {
      action: "updated",
      entityType: "WebsitePage",
      entityTitle: page.title,
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, normalizeWebsitePage(page), "Page updated successfully."));
});

