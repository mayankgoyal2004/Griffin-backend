/**
 * Normalization utilities ensuring API responses provide both camelCase and snake_case
 * fields so that both Dashboard and Frontend components seamlessly consume backend data.
 */

export function normalizeProject(p) {
  if (!p) return null;
  return {
    ...p,
    client_name: p.clientName ?? p.client_name ?? null,
    start_date: p.startDate ?? p.start_date ?? null,
    completion_date: p.completionDate ?? p.completion_date ?? null,
    short_description: p.shortDescription ?? p.short_description ?? "",
    full_description: p.fullDescription ?? p.full_description ?? "",
    cover_image: p.coverImage ?? p.cover_image ?? "",
    display_order: p.displayOrder ?? p.display_order ?? 0,
    created_date: p.createdAt ?? p.created_date ?? new Date().toISOString(),
    updated_date: p.updatedAt ?? p.updated_date ?? new Date().toISOString(),
  };
}

export function normalizeService(s) {
  if (!s) return null;
  return {
    ...s,
    short_description: s.shortDescription ?? s.short_description ?? "",
    full_description: s.fullDescription ?? s.full_description ?? "",
    card_image: s.cardImage ?? s.card_image ?? null,
    hero_image: s.heroImage ?? s.hero_image ?? null,
    overview_image: s.overviewImage ?? s.overview_image ?? null,
    key_features: s.keyFeatures ?? s.key_features ?? [],
    display_order: s.displayOrder ?? s.display_order ?? 0,
    created_date: s.createdAt ?? s.created_date ?? new Date().toISOString(),
    updated_date: s.updatedAt ?? s.updated_date ?? new Date().toISOString(),
  };
}

export function normalizeBlogPost(b) {
  if (!b) return null;
  return {
    ...b,
    featured_image: b.featuredImage ?? b.featured_image ?? null,
    reading_time: b.readingTime ?? b.reading_time ?? 5,
    publication_date: b.publicationDate ?? b.publication_date ?? null,
    created_date: b.createdAt ?? b.created_date ?? new Date().toISOString(),
    updated_date: b.updatedAt ?? b.updated_date ?? new Date().toISOString(),
  };
}

export function normalizeInquiry(i) {
  if (!i) return null;
  return {
    ...i,
    full_name: i.fullName ?? i.full_name ?? "",
    project_type: i.projectType ?? i.project_type ?? null,
    assigned_to: i.assignedTo ?? i.assigned_to ?? null,
    created_date: i.createdAt ?? i.created_date ?? new Date().toISOString(),
    updated_date: i.updatedAt ?? i.updated_date ?? new Date().toISOString(),
  };
}

export function normalizeTeamMember(t) {
  if (!t) return null;
  return {
    ...t,
    full_name: t.fullName ?? t.full_name ?? "",
    short_bio: t.shortBio ?? t.short_bio ?? "",
    linkedin_url: t.linkedinUrl ?? t.linkedin_url ?? null,
    display_order: t.displayOrder ?? t.display_order ?? 0,
    created_date: t.createdAt ?? t.created_date ?? new Date().toISOString(),
    updated_date: t.updatedAt ?? t.updated_date ?? new Date().toISOString(),
  };
}

export function normalizeSiteSettings(s) {
  if (!s) return null;
  return {
    ...s,
    company_name: s.companyName ?? s.company_name ?? "Griffin Construction",
    phone_display: s.phoneDisplay ?? s.phone_display ?? s.phone,
    working_hours: s.workingHours ?? s.working_hours ?? "",
    website_url: s.websiteUrl ?? s.website_url ?? "",
    header_cta_text: s.headerCtaText ?? s.header_cta_text ?? "",
    header_cta_link: s.headerCtaLink ?? s.header_cta_link ?? "",
    footer_description: s.footerDescription ?? s.footer_description ?? "",
    copyright_text: s.copyrightText ?? s.copyright_text ?? "",
    updated_date: s.updatedAt ?? s.updated_date ?? new Date().toISOString(),
  };
}

export function normalizeMediaAsset(m) {
  if (!m) return null;
  return {
    ...m,
    file_url: m.fileUrl ?? m.file_url ?? "",
    file_type: m.fileType ?? m.file_type ?? "Image",
    mime_type: m.mimeType ?? m.mime_type ?? null,
    alt_text: m.altText ?? m.alt_text ?? null,
    created_date: m.createdAt ?? m.created_date ?? new Date().toISOString(),
    updated_date: m.updatedAt ?? m.updated_date ?? new Date().toISOString(),
  };
}

export function normalizeActivityLog(a) {
  if (!a) return null;
  return {
    ...a,
    entity_type: a.entityType ?? a.entity_type ?? "",
    entity_title: a.entityTitle ?? a.entity_title ?? "",
    user_email: a.userEmail ?? a.user_email ?? null,
    user_name: a.userName ?? a.user_name ?? null,
    created_date: a.createdAt ?? a.created_date ?? new Date().toISOString(),
  };
}

export function normalizeUser(u) {
  if (!u) return null;
  return {
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    full_name: u.fullName,
    role: u.role ? u.role.toLowerCase() : "user",
    phone: u.phone ?? null,
    avatar: u.avatar ?? null,
    created_date: u.createdAt ?? new Date().toISOString(),
    updated_date: u.updatedAt ?? new Date().toISOString(),
  };
}

