import { prisma } from "../config/db.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeSiteSettings } from "../utils/serializer.js";

export async function resolveGoogleMapsEmbed(mapsLink) {
  if (!mapsLink) return null;
  const link = mapsLink.trim();

  // If iframe tag was pasted
  if (link.includes("<iframe") && link.includes("src=")) {
    const match = link.match(/src=["']([^"']+)["']/);
    if (match) return match[1];
  }

  // If already embed URL
  if (link.includes("output=embed") || link.includes("/maps/embed")) {
    return link;
  }

  let targetUrl = link;
  // If shortlink (maps.app.goo.gl or goo.gl/maps)
  if (link.includes("maps.app.goo.gl") || link.includes("goo.gl/maps")) {
    try {
      const res = await fetch(link, { redirect: "manual" });
      const loc = res.headers.get("location");
      if (loc) targetUrl = loc;
    } catch (e) {
      console.warn("Could not resolve Google Maps shortlink:", e.message);
    }
  }

  // Extract !3dlat!4dlng (exact pin coordinates)
  const dMatch = targetUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (dMatch) {
    return `https://maps.google.com/maps?q=${dMatch[1]},${dMatch[2]}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  }

  // Extract @lat,lng
  const atMatch = targetUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (atMatch) {
    return `https://maps.google.com/maps?q=${atMatch[1]},${atMatch[2]}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  }

  // Extract place name
  const placeMatch = targetUrl.match(/\/place\/([^/@?]+)/);
  if (placeMatch) {
    const name = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
    return `https://maps.google.com/maps?q=${encodeURIComponent(name)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  }

  return null;
}

function parseSettingsData(body) {
  const data = {};
  if (body.companyName !== undefined || body.company_name !== undefined) {
    data.companyName = body.companyName ?? body.company_name;
  }
  if (body.tagline !== undefined) data.tagline = body.tagline;
  if (body.companyDescription !== undefined || body.company_description !== undefined) {
    data.companyDescription = body.companyDescription ?? body.company_description;
  }
  if (body.logo !== undefined) data.logo = body.logo;
  if (body.footerLogo !== undefined || body.footer_logo !== undefined) {
    data.footerLogo = body.footerLogo ?? body.footer_logo;
  }
  if (body.favicon !== undefined) data.favicon = body.favicon;
  if (body.phone !== undefined) data.phone = body.phone;
  if (body.phoneDisplay !== undefined || body.phone_display !== undefined) {
    data.phoneDisplay = body.phoneDisplay ?? body.phone_display;
  }
  if (body.email !== undefined) data.email = body.email;
  if (body.address !== undefined) data.address = body.address;
  if (body.mapsLink !== undefined || body.maps_link !== undefined) {
    data.mapsLink = body.mapsLink ?? body.maps_link;
  }
  if (body.mapEmbedUrl !== undefined || body.map_embed_url !== undefined) {
    data.mapEmbedUrl = body.mapEmbedUrl ?? body.map_embed_url;
  }
  if (body.workingHours !== undefined || body.working_hours !== undefined) {
    data.workingHours = body.workingHours ?? body.working_hours;
  }
  if (body.websiteUrl !== undefined || body.website_url !== undefined) {
    data.websiteUrl = body.websiteUrl ?? body.website_url;
  }
  if (body.headerCtaText !== undefined || body.header_cta_text !== undefined) {
    data.headerCtaText = body.headerCtaText ?? body.header_cta_text;
  }
  if (body.headerCtaLink !== undefined || body.header_cta_link !== undefined) {
    data.headerCtaLink = body.headerCtaLink ?? body.header_cta_link;
  }
  if (body.facebook !== undefined) data.facebook = body.facebook;
  if (body.instagram !== undefined) data.instagram = body.instagram;
  if (body.linkedin !== undefined) data.linkedin = body.linkedin;
  if (body.twitter !== undefined) data.twitter = body.twitter;
  if (body.youtube !== undefined) data.youtube = body.youtube;
  if (body.navItems !== undefined || body.nav_items !== undefined) {
    data.navItems = body.navItems ?? body.nav_items;
  }
  if (body.footerDescription !== undefined || body.footer_description !== undefined) {
    data.footerDescription = body.footerDescription ?? body.footer_description;
  }
  if (body.footerQuickLinks !== undefined || body.footer_quick_links !== undefined) {
    data.footerQuickLinks = body.footerQuickLinks ?? body.footer_quick_links;
  }
  if (body.footerServiceLinks !== undefined || body.footer_service_links !== undefined) {
    data.footerServiceLinks = body.footerServiceLinks ?? body.footer_service_links;
  }
  if (body.copyrightText !== undefined || body.copyright_text !== undefined) {
    data.copyrightText = body.copyrightText ?? body.copyright_text;
  }
  if (body.privacyLink !== undefined || body.privacy_link !== undefined) {
    data.privacyLink = body.privacyLink ?? body.privacy_link;
  }
  if (body.termsLink !== undefined || body.terms_link !== undefined) {
    data.termsLink = body.termsLink ?? body.terms_link;
  }
  if (body.show_projects !== undefined) {
    data.showProjects = Boolean(body.show_projects);
  } else if (body.showProjects !== undefined) {
    data.showProjects = Boolean(body.showProjects);
  }
  return data;
}

export const getSiteSettings = asyncHandler(async (req, res) => {
  let settings = await prisma.siteSettings.findUnique({
    where: { id: "settings_global" },
  });

  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: { id: "settings_global" },
    });
  }

  return res.status(200).json(new ApiResponse(200, normalizeSiteSettings(settings), "Site settings fetched."));
});

export const updateSiteSettings = asyncHandler(async (req, res) => {
  const data = parseSettingsData(req.body);
  if (data.mapsLink && (!data.mapEmbedUrl || data.mapEmbedUrl === "")) {
    const autoEmbed = await resolveGoogleMapsEmbed(data.mapsLink);
    if (autoEmbed) data.mapEmbedUrl = autoEmbed;
  }
  const updated = await prisma.siteSettings.upsert({
    where: { id: "settings_global" },
    update: data,
    create: {
      ...data,
      id: "settings_global",
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "updated",
      entityType: "SiteSettings",
      entityTitle: "Global Site Settings",
      userEmail: req.user?.email,
      userName: req.user?.fullName,
      userId: req.user?.id,
    },
  });

  return res.status(200).json(new ApiResponse(200, normalizeSiteSettings(updated), "Site settings updated successfully."));
});

