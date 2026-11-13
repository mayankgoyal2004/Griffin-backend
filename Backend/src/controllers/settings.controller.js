import { prisma } from "../config/db.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeSiteSettings } from "../utils/serializer.js";

function parseSettingsData(body) {
  const data = {};
  if (body.companyName !== undefined || body.company_name !== undefined) {
    data.companyName = body.companyName ?? body.company_name;
  }
  if (body.tagline !== undefined) data.tagline = body.tagline;
  if (body.phone !== undefined) data.phone = body.phone;
  if (body.phoneDisplay !== undefined || body.phone_display !== undefined) {
    data.phoneDisplay = body.phoneDisplay ?? body.phone_display;
  }
  if (body.email !== undefined) data.email = body.email;
  if (body.address !== undefined) data.address = body.address;
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
  if (body.footerDescription !== undefined || body.footer_description !== undefined) {
    data.footerDescription = body.footerDescription ?? body.footer_description;
  }
  if (body.copyrightText !== undefined || body.copyright_text !== undefined) {
    data.copyrightText = body.copyrightText ?? body.copyright_text;
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

