import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import Field from "@/components/dashboard/Field";
import ImageField from "@/components/dashboard/ImageField";
import RepeaterField from "@/components/dashboard/RepeaterField";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { logActivity } from "@/lib/activity";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/dashboard/pages/$slug")({
  ssr: false,
  head: () => ({ meta: [{ title: "Edit page — Griffin CMS" }] }),
  component: PageEditor,
});

function PageEditor() {
  const { slug } = Route.useParams();
  const { user } = Route.useRouteContext();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    let active = true;
    base44.entities.WebsitePage.filter({ slug }, { limit: 1 })
      .then((page) => {
        if (!active) return;
        const record = page.items?.[0];
        if (record) setForm(record);
        else toast.error("That page record has not been created yet.");
      })
      .catch(() => toast.error("Could not load this page."));
    return () => {
      active = false;
    };
  }, [slug]);

  const set = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "hero_image") next.heroImage = value;
      if (key === "heroImage") next.hero_image = value;
      if (key === "hero_secondary_image") next.heroSecondaryImage = value;
      if (key === "heroSecondaryImage") next.hero_secondary_image = value;
      if (key === "cta_text") next.ctaText = value;
      if (key === "cta_link") next.ctaLink = value;
      if (key === "seo_title") next.seoTitle = value;
      if (key === "seo_description") next.seoDescription = value;
      if (key === "canonical_url") next.canonicalUrl = value;
      if (key === "og_image") next.ogImage = value;
      if (key === "robots_index") next.robotsIndex = value;
      if (key === "last_revised") next.lastRevised = value;
      if (key === "lastRevised") next.last_revised = value;
      return next;
    });
  };

  const setSection = (sectionKey, field, value) => {
    setForm((prev) => {
      const currentSections =
        prev.sections && typeof prev.sections === "object" && !Array.isArray(prev.sections)
          ? { ...prev.sections }
          : {};
      const sectionData = { ...(currentSections[sectionKey] || {}) };
      sectionData[field] = value;
      return {
        ...prev,
        sections: {
          ...currentSections,
          [sectionKey]: sectionData,
        },
      };
    });
  };

  const setStatItem = (index, field, value) => {
    setForm((prev) => {
      const currentStats = Array.isArray(prev.stats) ? [...prev.stats] : [];
      while (currentStats.length <= index) {
        currentStats.push({ value: "", label: "" });
      }
      currentStats[index] = { ...currentStats[index], [field]: value };
      return { ...prev, stats: currentStats };
    });
  };

  const setAdvantageItem = (index, field, value) => {
    setForm((prev) => {
      const currentAdvantages = Array.isArray(prev.advantages) ? [...prev.advantages] : [];
      while (currentAdvantages.length <= index) {
        currentAdvantages.push({ title: "", description: "", icon: "star" });
      }
      currentAdvantages[index] = { ...currentAdvantages[index], [field]: value };
      return { ...prev, advantages: currentAdvantages };
    });
  };

  const save = async (publishValue) => {
    if (!form) return;
    setSaving(true);
    try {
      await base44.entities.WebsitePage.update(form.id, {
        ...form,
        published: publishValue === undefined ? !!form.published : publishValue,
      });
      await logActivity({ action: "updated", entity_type: "Page", entity_title: form.title, user });
      toast.success("Page content saved");
    } catch (error) {
      toast.error(error.message || "Could not save this page.");
    } finally {
      setSaving(false);
    }
  };

  if (!form) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading page…
      </div>
    );
  }

  const isHome = form.slug === "home" || form.page_type === "home";
  const isAbout = form.slug === "about" || form.page_type === "about";
  const isLegal = form.page_type === "legal";

  return (
    <div className="pb-24">
      <PageHeader title={`${form.title} content`} description="Sections are stored independently, so each page can keep its own structure.">
        <Button asChild variant="outline" size="sm">
          <Link to="/dashboard/pages">Back to pages</Link>
        </Button>
        <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving || !isAdmin}>
          Save draft
        </Button>
        <Button size="sm" onClick={() => save(true)} disabled={saving || !isAdmin}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Publish
        </Button>
      </PageHeader>

      {!isAdmin && (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Only administrators can change website pages. You can review the content but not save changes.
        </p>
      )}

      <div className="space-y-4">
        {/* Page basics */}
        <div className="gc-card space-y-4 p-5">
          <h2 className="font-heading text-lg font-semibold text-primary">Page basics</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Page title" value={form.title} onChange={(v) => set("title", v)} />
            <Field label="Slug" value={form.slug} onChange={(v) => set("slug", v)} disabled hint="Changing a slug changes the page key — do it carefully." />
            {!isHome && (
              <>
                <Field label="Page heading" value={form.heading} onChange={(v) => set("heading", v)} className="sm:col-span-2" />
                <Field label="Subtitle" value={form.subtitle} onChange={(v) => set("subtitle", v)} className="sm:col-span-2" />
              </>
            )}
          </div>
          {!isHome && (
            <Field label="Description" type="textarea" rows={4} value={form.description} onChange={(v) => set("description", v)} />
          )}
          <div className="flex items-center gap-2">
            <Switch checked={!!form.published} onCheckedChange={(v) => set("published", v)} disabled={!isAdmin} />
            <Label className="text-sm">Published</Label>
          </div>
        </div>

        {/* Hero Banner Artwork for non-home pages */}
        {!isHome && (
          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-primary">Hero Banner Artwork</h2>
            <p className="-mt-2 text-xs text-muted-foreground">
              The panoramic background artwork displayed behind the page title in the top banner.
            </p>
            <ImageField label="Banner artwork image" value={form.hero_image} folder="Hero Images" onChange={(v) => set("hero_image", v)} />
          </div>
        )}

        {/* Quick link to entity collections for dynamic pages */}
        {form.slug === "blog" && (
          <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-3">
            <span>Articles displayed on the blog page are managed under the Blog section.</span>
            <Button asChild size="sm" variant="outline" className="border-amber-300 bg-white hover:bg-amber-100">
              <Link to="/dashboard/blog">Manage Articles</Link>
            </Button>
          </div>
        )}
        {form.slug === "services" && (
          <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-3">
            <span>Services cards and details are managed under the Services section.</span>
            <Button asChild size="sm" variant="outline" className="border-amber-300 bg-white hover:bg-amber-100">
              <Link to="/dashboard/services">Manage Services</Link>
            </Button>
          </div>
        )}
        {form.slug === "projects" && (
          <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-3">
            <span>Projects in your portfolio are managed under the Projects section.</span>
            <Button asChild size="sm" variant="outline" className="border-amber-300 bg-white hover:bg-amber-100">
              <Link to="/dashboard/projects">Manage Projects</Link>
            </Button>
          </div>
        )}
        {form.slug === "team" && (
          <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-3">
            <span>Team members and leadership profiles are managed under the Team section.</span>
            <Button asChild size="sm" variant="outline" className="border-amber-300 bg-white hover:bg-amber-100">
              <Link to="/dashboard/team">Manage Team</Link>
            </Button>
          </div>
        )}

        {/* Policy / Legal sections (only for legal policy pages) */}
        {isLegal && (
          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-primary">Policy sections</h2>
            <p className="-mt-2 text-xs text-muted-foreground">
              Each entry is a heading and its body copy. Reorder them with the arrows.
            </p>
            <RepeaterField
              label=""
              items={form.sections || []}
              onChange={(v) => set("sections", v)}
              addLabel="Add policy section"
              fields={[
                { key: "heading", label: "Section Heading", placeholder: "e.g. Information We Collect" },
                { key: "description", label: "Section Content / Paragraphs", type: "textarea", rows: 4, placeholder: "Enter paragraph text or bullet points..." },
              ]}
            />
            <Field label="Last revised date" type="date" value={form.last_revised} onChange={(v) => set("last_revised", v)} />
          </div>
        )}

        {/* HOME PAGE DEDICATED FULL DYNAMIC SECTIONS */}
        {isHome && (
          <>
            {/* 1. HERO SECTION */}
            <div className="gc-card space-y-4 p-5">
              <h2 className="font-heading text-lg font-semibold text-primary">1. Hero Section &amp; Top Banner</h2>
              <p className="-mt-2 text-xs text-muted-foreground">
                The main banner displayed at the top of the homepage with the headline, background artwork, and primary call-to-action.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Hero Kicker / Tag"
                  value={form.sections?.hero?.kicker ?? ""}
                  placeholder="BUILDING TOMORROW"
                  onChange={(v) => setSection("hero", "kicker", v)}
                />
                <Field
                  label="Headline (Heading)"
                  value={form.sections?.hero?.headline ?? form.heading ?? ""}
                  placeholder="Your Nest, Our Business."
                  onChange={(v) => {
                    setSection("hero", "headline", v);
                    set("heading", v);
                  }}
                />
              </div>
              <Field
                label="Hero Subtitle / Description"
                type="textarea"
                rows={2}
                value={form.sections?.hero?.subtitle ?? form.subtitle ?? ""}
                placeholder="Construction solutions for residential, commercial and infrastructure projects."
                onChange={(v) => {
                  setSection("hero", "subtitle", v);
                  set("subtitle", v);
                }}
              />
              <ImageField
                label="Panoramic Hero Background Artwork"
                value={form.hero_image ?? ""}
                folder="Hero Images"
                onChange={(v) => set("hero_image", v)}
              />
              <div className="grid gap-4 sm:grid-cols-2 pt-1">
                <Field
                  label="Primary CTA Button Text"
                  value={form.cta_text ?? ""}
                  placeholder="View All Projects"
                  onChange={(v) => set("cta_text", v)}
                />
                <Field
                  label="Primary CTA Button Link"
                  value={form.cta_link ?? ""}
                  placeholder="/projects"
                  onChange={(v) => set("cta_link", v)}
                />
              </div>
            </div>

            {/* 2. HERO COUNTER STATS BAR */}
            <div className="gc-card space-y-4 p-5">
              <h2 className="font-heading text-lg font-semibold text-primary">2. Hero Floating Stats Bar (4 Badges)</h2>
              <p className="-mt-2 text-xs text-muted-foreground">
                The four floating counter badges positioned at the bottom of the hero banner.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Stat #1 (Experience)</span>
                  <Field
                    label="Value"
                    value={form.stats?.[0]?.value ?? ""}
                    placeholder="10+"
                    onChange={(v) => setStatItem(0, "value", v)}
                  />
                  <Field
                    label="Label"
                    value={form.stats?.[0]?.label ?? ""}
                    placeholder="Years of Experience"
                    onChange={(v) => setStatItem(0, "label", v)}
                  />
                </div>
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Stat #2 (Projects)</span>
                  <Field
                    label="Value"
                    value={form.stats?.[1]?.value ?? ""}
                    placeholder="50+"
                    onChange={(v) => setStatItem(1, "value", v)}
                  />
                  <Field
                    label="Label"
                    value={form.stats?.[1]?.label ?? ""}
                    placeholder="Projects Completed"
                    onChange={(v) => setStatItem(1, "label", v)}
                  />
                </div>
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Stat #3 (Clients)</span>
                  <Field
                    label="Value"
                    value={form.stats?.[2]?.value ?? ""}
                    placeholder="100+"
                    onChange={(v) => setStatItem(2, "value", v)}
                  />
                  <Field
                    label="Label"
                    value={form.stats?.[2]?.label ?? ""}
                    placeholder="Happy Clients"
                    onChange={(v) => setStatItem(2, "label", v)}
                  />
                </div>
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Stat #4 (Quality)</span>
                  <Field
                    label="Value"
                    value={form.stats?.[3]?.value ?? ""}
                    placeholder="100%"
                    onChange={(v) => setStatItem(3, "value", v)}
                  />
                  <Field
                    label="Label"
                    value={form.stats?.[3]?.label ?? ""}
                    placeholder="Quality & Safety"
                    onChange={(v) => setStatItem(3, "label", v)}
                  />
                </div>
              </div>
            </div>

            {/* 3. SERVICES SECTION PREVIEW */}
            <div className="gc-card space-y-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-primary">3. Services Section Header</h2>
                  <p className="text-xs text-muted-foreground">
                    Header text for the service cards carousel on the homepage.
                  </p>
                </div>
                <Button asChild size="sm" variant="outline" className="border-amber-300 bg-white hover:bg-amber-50">
                  <Link to="/dashboard/services">Manage Service Items →</Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Section Kicker"
                  value={form.sections?.services_preview?.kicker ?? ""}
                  placeholder="WHAT WE DO"
                  onChange={(v) => setSection("services_preview", "kicker", v)}
                />
                <Field
                  label="Section Heading"
                  value={form.sections?.services_preview?.heading ?? ""}
                  placeholder="Explore Our Services"
                  onChange={(v) => setSection("services_preview", "heading", v)}
                />
              </div>
              <Field
                label="Section Subtitle / Description"
                type="textarea"
                rows={2}
                value={form.sections?.services_preview?.subtitle ?? ""}
                placeholder="We connect places, people and opportunities through reliable and modern construction solutions."
                onChange={(v) => setSection("services_preview", "subtitle", v)}
              />
            </div>

            {/* 4. ABOUT SECTION PREVIEW */}
            <div className="gc-card space-y-4 p-5">
              <h2 className="font-heading text-lg font-semibold text-primary">4. About Griffin Section (Homepage Story)</h2>
              <p className="-mt-2 text-xs text-muted-foreground">
                The 3-column story presentation introducing your brand with dual photos, copy, badges, and metric highlights.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Section Kicker"
                  value={form.sections?.about_preview?.kicker ?? ""}
                  placeholder="About Griffin"
                  onChange={(v) => setSection("about_preview", "kicker", v)}
                />
                <Field
                  label="Section Heading"
                  value={form.sections?.about_preview?.heading ?? ""}
                  placeholder="A Construction Partner Built on Strength & Trust"
                  onChange={(v) => setSection("about_preview", "heading", v)}
                />
              </div>
              <Field
                label="Story Narrative / Paragraph"
                type="textarea"
                rows={3}
                value={form.sections?.about_preview?.description ?? ""}
                placeholder="Griffin Construction is a modern construction and real estate company committed to delivering high-quality, sustainable, and value-driven projects..."
                onChange={(v) => setSection("about_preview", "description", v)}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <ImageField
                  label="Main Polygon Image"
                  value={form.sections?.about_preview?.main_image ?? ""}
                  folder="About"
                  onChange={(v) => setSection("about_preview", "main_image", v)}
                />
                <ImageField
                  label="Overlapping Inset Photo"
                  value={form.sections?.about_preview?.inset_image ?? ""}
                  folder="About"
                  onChange={(v) => setSection("about_preview", "inset_image", v)}
                />
              </div>

              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">4 Highlight Pill Badges</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Field
                    label="Badge 1"
                    value={form.sections?.about_preview?.badge_1 ?? ""}
                    placeholder="Quality First"
                    onChange={(v) => setSection("about_preview", "badge_1", v)}
                  />
                  <Field
                    label="Badge 2"
                    value={form.sections?.about_preview?.badge_2 ?? ""}
                    placeholder="Expert Team"
                    onChange={(v) => setSection("about_preview", "badge_2", v)}
                  />
                  <Field
                    label="Badge 3"
                    value={form.sections?.about_preview?.badge_3 ?? ""}
                    placeholder="Sustainable"
                    onChange={(v) => setSection("about_preview", "badge_3", v)}
                  />
                  <Field
                    label="Badge 4"
                    value={form.sections?.about_preview?.badge_4 ?? ""}
                    placeholder="On-Time Delivery"
                    onChange={(v) => setSection("about_preview", "badge_4", v)}
                  />
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Right Column Metric Highlights (3 Cards)</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                    <Field
                      label="Card #1 Value"
                      value={form.sections?.about_preview?.stat_1_val ?? ""}
                      placeholder="10+"
                      onChange={(v) => setSection("about_preview", "stat_1_val", v)}
                    />
                    <Field
                      label="Card #1 Label"
                      value={form.sections?.about_preview?.stat_1_label ?? ""}
                      placeholder="Years of Experience"
                      onChange={(v) => setSection("about_preview", "stat_1_label", v)}
                    />
                  </div>
                  <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                    <Field
                      label="Card #2 Value"
                      value={form.sections?.about_preview?.stat_2_val ?? ""}
                      placeholder="150+"
                      onChange={(v) => setSection("about_preview", "stat_2_val", v)}
                    />
                    <Field
                      label="Card #2 Label"
                      value={form.sections?.about_preview?.stat_2_label ?? ""}
                      placeholder="Projects Completed"
                      onChange={(v) => setSection("about_preview", "stat_2_label", v)}
                    />
                  </div>
                  <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                    <Field
                      label="Card #3 Value"
                      value={form.sections?.about_preview?.stat_3_val ?? ""}
                      placeholder="500+"
                      onChange={(v) => setSection("about_preview", "stat_3_val", v)}
                    />
                    <Field
                      label="Card #3 Label"
                      value={form.sections?.about_preview?.stat_3_label ?? ""}
                      placeholder="Happy Clients"
                      onChange={(v) => setSection("about_preview", "stat_3_label", v)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-1">
                <Field
                  label="Button Text"
                  value={form.sections?.about_preview?.cta_text ?? ""}
                  placeholder="Learn More"
                  onChange={(v) => setSection("about_preview", "cta_text", v)}
                />
                <Field
                  label="Button Link (e.g. #quote or /about)"
                  value={form.sections?.about_preview?.cta_link ?? ""}
                  placeholder="#quote"
                  onChange={(v) => setSection("about_preview", "cta_link", v)}
                />
              </div>
            </div>

            {/* 5. PROJECTS SECTION PREVIEW */}
            <div className="gc-card space-y-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-primary">5. Projects Section Header</h2>
                  <p className="text-xs text-muted-foreground">
                    Header text for the featured portfolio section on the homepage.
                  </p>
                </div>
                <Button asChild size="sm" variant="outline" className="border-amber-300 bg-white hover:bg-amber-50">
                  <Link to="/dashboard/projects">Manage Projects →</Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Section Kicker"
                  value={form.sections?.projects_preview?.kicker ?? ""}
                  placeholder="OUR WORK"
                  onChange={(v) => setSection("projects_preview", "kicker", v)}
                />
                <Field
                  label="Section Heading"
                  value={form.sections?.projects_preview?.heading ?? ""}
                  placeholder="Featured Projects"
                  onChange={(v) => setSection("projects_preview", "heading", v)}
                />
              </div>
            </div>

            {/* 6. TEAM SECTION PREVIEW */}
            <div className="gc-card space-y-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-primary">6. Team Section Banner</h2>
                  <p className="text-xs text-muted-foreground">
                    The panoramic team card showcasing leadership, mascot artwork, and team member profiles.
                  </p>
                </div>
                <Button asChild size="sm" variant="outline" className="border-amber-300 bg-white hover:bg-amber-50">
                  <Link to="/dashboard/team">Manage Team Members →</Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Section Kicker"
                  value={form.sections?.team_preview?.kicker ?? ""}
                  placeholder="OUR TEAM"
                  onChange={(v) => setSection("team_preview", "kicker", v)}
                />
                <Field
                  label="Section Heading"
                  value={form.sections?.team_preview?.heading ?? ""}
                  placeholder="The People Behind Griffin"
                  onChange={(v) => setSection("team_preview", "heading", v)}
                />
              </div>
              <Field
                label="Section Description"
                type="textarea"
                rows={2}
                value={form.sections?.team_preview?.description ?? ""}
                placeholder="A team of experienced professionals, engineers, and project managers who turn vision into reality."
                onChange={(v) => setSection("team_preview", "description", v)}
              />
              <ImageField
                label="Mascot / Eagle Banner Image"
                value={form.sections?.team_preview?.image ?? ""}
                folder="Team"
                onChange={(v) => setSection("team_preview", "image", v)}
              />
              <div className="grid gap-4 sm:grid-cols-2 pt-1">
                <Field
                  label="Button Text"
                  value={form.sections?.team_preview?.cta_text ?? ""}
                  placeholder="Meet Our Team"
                  onChange={(v) => setSection("team_preview", "cta_text", v)}
                />
                <Field
                  label="Button Link"
                  value={form.sections?.team_preview?.cta_link ?? ""}
                  placeholder="/team"
                  onChange={(v) => setSection("team_preview", "cta_link", v)}
                />
              </div>
            </div>

            {/* 7. WHY CHOOSE US ("THE GRIFFIN ADVANTAGE") */}
            <div className="gc-card space-y-4 p-5">
              <h2 className="font-heading text-lg font-semibold text-primary">7. Why Choose Us (The Griffin Advantage)</h2>
              <p className="-mt-2 text-xs text-muted-foreground">
                The 4 core advantage pillars displayed horizontally across the page.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Section Kicker"
                  value={form.sections?.advantage_section?.kicker ?? ""}
                  placeholder="Why choose us"
                  onChange={(v) => setSection("advantage_section", "kicker", v)}
                />
                <Field
                  label="Section Heading"
                  value={form.sections?.advantage_section?.heading ?? ""}
                  placeholder="The Griffin Advantage"
                  onChange={(v) => setSection("advantage_section", "heading", v)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Pillar #1</span>
                  <Field
                    label="Title"
                    value={form.advantages?.[0]?.title ?? ""}
                    placeholder="End-to-End Solutions"
                    onChange={(v) => setAdvantageItem(0, "title", v)}
                  />
                  <Field
                    label="Description"
                    type="textarea"
                    rows={2}
                    value={form.advantages?.[0]?.description ?? ""}
                    placeholder="From planning to handover."
                    onChange={(v) => setAdvantageItem(0, "description", v)}
                  />
                </div>
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Pillar #2</span>
                  <Field
                    label="Title"
                    value={form.advantages?.[1]?.title ?? ""}
                    placeholder="Trusted Partnerships"
                    onChange={(v) => setAdvantageItem(1, "title", v)}
                  />
                  <Field
                    label="Description"
                    type="textarea"
                    rows={2}
                    value={form.advantages?.[1]?.description ?? ""}
                    placeholder="With leading vendors & experts."
                    onChange={(v) => setAdvantageItem(1, "description", v)}
                  />
                </div>
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Pillar #3</span>
                  <Field
                    label="Title"
                    value={form.advantages?.[2]?.title ?? ""}
                    placeholder="Safety & Compliance"
                    onChange={(v) => setAdvantageItem(2, "title", v)}
                  />
                  <Field
                    label="Description"
                    type="textarea"
                    rows={2}
                    value={form.advantages?.[2]?.description ?? ""}
                    placeholder="Highest industry standards."
                    onChange={(v) => setAdvantageItem(2, "description", v)}
                  />
                </div>
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Pillar #4</span>
                  <Field
                    label="Title"
                    value={form.advantages?.[3]?.title ?? ""}
                    placeholder="Sustainable Build"
                    onChange={(v) => setAdvantageItem(3, "title", v)}
                  />
                  <Field
                    label="Description"
                    type="textarea"
                    rows={2}
                    value={form.advantages?.[3]?.description ?? ""}
                    placeholder="For a better tomorrow."
                    onChange={(v) => setAdvantageItem(3, "description", v)}
                  />
                </div>
              </div>
            </div>

            {/* 8. CALL TO ACTION (CTA) BANNER */}
            <div className="gc-card space-y-4 p-5">
              <h2 className="font-heading text-lg font-semibold text-primary">8. Contact &amp; Consultation Banner (CTA)</h2>
              <p className="-mt-2 text-xs text-muted-foreground">
                The full-width call-to-action banner right before the footer.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Banner Heading"
                  value={form.sections?.cta_banner?.heading ?? ""}
                  placeholder="Let’s Build Your Next Project"
                  onChange={(v) => setSection("cta_banner", "heading", v)}
                />
                <Field
                  label="Subtitle"
                  value={form.sections?.cta_banner?.subtitle ?? ""}
                  placeholder="Get in touch with our team for a consultation and a detailed quote."
                  onChange={(v) => setSection("cta_banner", "subtitle", v)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Button Text"
                  value={form.sections?.cta_banner?.button_text ?? ""}
                  placeholder="Contact Us →"
                  onChange={(v) => setSection("cta_banner", "button_text", v)}
                />
                <Field
                  label="Button Link"
                  value={form.sections?.cta_banner?.button_link ?? ""}
                  placeholder="/contact"
                  onChange={(v) => setSection("cta_banner", "button_link", v)}
                />
              </div>
              <ImageField
                label="Banner Background Image"
                value={form.sections?.cta_banner?.background_image ?? ""}
                folder="Banners"
                onChange={(v) => setSection("cta_banner", "background_image", v)}
              />
            </div>
          </>
        )}

        {/* About Page Custom Dynamic Sections */}
        {isAbout && (
          <>
            {/* 1. OUR STORY SECTION */}
            <div className="gc-card space-y-4 p-5">
              <h2 className="font-heading text-lg font-semibold text-primary">Our Story Section</h2>
              <p className="-mt-2 text-xs text-muted-foreground">
                The top narrative introducing your company history, values, and photo composition.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Section Kicker"
                  value={form.sections?.story?.kicker ?? ""}
                  placeholder="OUR STORY"
                  onChange={(v) => setSection("story", "kicker", v)}
                />
                <Field
                  label="Section Heading"
                  value={form.sections?.story?.heading ?? ""}
                  placeholder="A Trusted Partner in Construction"
                  onChange={(v) => setSection("story", "heading", v)}
                />
              </div>
              <Field
                label="Story Narrative / Paragraph"
                type="textarea"
                rows={4}
                value={form.sections?.story?.description ?? ""}
                placeholder="Griffin Construction is a modern construction and real estate company..."
                onChange={(v) => setSection("story", "description", v)}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <ImageField
                  label="Main Project Image"
                  value={form.sections?.story?.mainPhoto ?? ""}
                  folder="About Page"
                  onChange={(v) => setSection("story", "mainPhoto", v)}
                />
                <ImageField
                  label="Overlapping Site Photo"
                  value={form.sections?.story?.insetPhoto ?? ""}
                  folder="About Page"
                  onChange={(v) => setSection("story", "insetPhoto", v)}
                />
              </div>

              {/* 3 Value Pillars */}
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">3 Value Highlights</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    label="Highlight 1"
                    value={form.sections?.story?.highlights?.[0] ?? ""}
                    placeholder="Quality Construction"
                    onChange={(v) => {
                      const cur = [...(form.sections?.story?.highlights || ["Quality Construction", "Reliable Execution", "Client-Centric Approach"])];
                      cur[0] = v;
                      setSection("story", "highlights", cur);
                    }}
                  />
                  <Field
                    label="Highlight 2"
                    value={form.sections?.story?.highlights?.[1] ?? ""}
                    placeholder="Reliable Execution"
                    onChange={(v) => {
                      const cur = [...(form.sections?.story?.highlights || ["Quality Construction", "Reliable Execution", "Client-Centric Approach"])];
                      cur[1] = v;
                      setSection("story", "highlights", cur);
                    }}
                  />
                  <Field
                    label="Highlight 3"
                    value={form.sections?.story?.highlights?.[2] ?? ""}
                    placeholder="Client-Centric Approach"
                    onChange={(v) => {
                      const cur = [...(form.sections?.story?.highlights || ["Quality Construction", "Reliable Execution", "Client-Centric Approach"])];
                      cur[2] = v;
                      setSection("story", "highlights", cur);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 2. NUMBERS & IMPACT BAR */}
            <div className="gc-card space-y-4 p-5">
              <h2 className="font-heading text-lg font-semibold text-primary">Numbers &amp; Impact Bar (4 Stats)</h2>
              <p className="-mt-2 text-xs text-muted-foreground">
                The high-contrast dark strip highlighting four milestone metrics.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <Field
                    label="Stat 1 Value"
                    value={form.stats?.[0]?.value ?? ""}
                    placeholder="50+"
                    onChange={(v) => setStatItem(0, "value", v)}
                  />
                  <Field
                    label="Stat 1 Label"
                    value={form.stats?.[0]?.label ?? ""}
                    placeholder="Projects Completed"
                    onChange={(v) => setStatItem(0, "label", v)}
                  />
                </div>
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <Field
                    label="Stat 2 Value"
                    value={form.stats?.[1]?.value ?? ""}
                    placeholder="100+"
                    onChange={(v) => setStatItem(1, "value", v)}
                  />
                  <Field
                    label="Stat 2 Label"
                    value={form.stats?.[1]?.label ?? ""}
                    placeholder="Happy Clients"
                    onChange={(v) => setStatItem(1, "label", v)}
                  />
                </div>
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <Field
                    label="Stat 3 Value"
                    value={form.stats?.[2]?.value ?? ""}
                    placeholder="10+"
                    onChange={(v) => setStatItem(2, "value", v)}
                  />
                  <Field
                    label="Stat 3 Label"
                    value={form.stats?.[2]?.label ?? ""}
                    placeholder="Years of Experience"
                    onChange={(v) => setStatItem(2, "label", v)}
                  />
                </div>
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <Field
                    label="Stat 4 Value"
                    value={form.stats?.[3]?.value ?? ""}
                    placeholder="98%"
                    onChange={(v) => setStatItem(3, "value", v)}
                  />
                  <Field
                    label="Stat 4 Label"
                    value={form.stats?.[3]?.label ?? ""}
                    placeholder="Project Success Rate"
                    onChange={(v) => setStatItem(3, "label", v)}
                  />
                </div>
              </div>
            </div>

            {/* 3. MISSION & VISION SECTION */}
            <div className="gc-card space-y-4 p-5">
              <h2 className="font-heading text-lg font-semibold text-primary">Mission &amp; Vision Section</h2>
              <p className="-mt-2 text-xs text-muted-foreground">
                Section highlighting company mission, vision and dual cards.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Section Kicker"
                  value={form.sections?.mission_vision?.kicker ?? ""}
                  placeholder="OUR MISSION & VISION"
                  onChange={(v) => setSection("mission_vision", "kicker", v)}
                />
                <Field
                  label="Section Heading"
                  value={form.sections?.mission_vision?.heading ?? ""}
                  placeholder="Driven by Purpose, Built for the Future"
                  onChange={(v) => setSection("mission_vision", "heading", v)}
                />
              </div>
              <Field
                label="Section Subtitle"
                type="textarea"
                rows={2}
                value={form.sections?.mission_vision?.description ?? ""}
                placeholder="Our mission is to deliver exceptional construction solutions..."
                onChange={(v) => setSection("mission_vision", "description", v)}
              />

              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <Field
                    label="Mission Card Title"
                    value={form.sections?.mission_vision?.mission_title ?? ""}
                    placeholder="Our Mission"
                    onChange={(v) => setSection("mission_vision", "mission_title", v)}
                  />
                  <Field
                    label="Mission Card Text"
                    type="textarea"
                    rows={3}
                    value={form.sections?.mission_vision?.mission_description ?? ""}
                    placeholder="To deliver high-quality, safe, and sustainable construction solutions that exceed client expectations."
                    onChange={(v) => setSection("mission_vision", "mission_description", v)}
                  />
                </div>

                <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <Field
                    label="Vision Card Title"
                    value={form.sections?.mission_vision?.vision_title ?? ""}
                    placeholder="Our Vision"
                    onChange={(v) => setSection("mission_vision", "vision_title", v)}
                  />
                  <Field
                    label="Vision Card Text"
                    type="textarea"
                    rows={3}
                    value={form.sections?.mission_vision?.vision_description ?? ""}
                    placeholder="To be a leading construction company known for trust, innovation, and lasting value."
                    onChange={(v) => setSection("mission_vision", "vision_description", v)}
                  />
                </div>
              </div>
            </div>

            {/* 4. CORE VALUES SECTION */}
            <div className="gc-card space-y-4 p-5">
              <h2 className="font-heading text-lg font-semibold text-primary">Core Values Section</h2>
              <p className="-mt-2 text-xs text-muted-foreground">
                The four guiding principles with titles and descriptions.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Section Kicker"
                  value={form.sections?.core_values?.kicker ?? ""}
                  placeholder="OUR CORE VALUES"
                  onChange={(v) => setSection("core_values", "kicker", v)}
                />
                <Field
                  label="Section Heading"
                  value={form.sections?.core_values?.heading ?? ""}
                  placeholder="The Principles That Guide Us"
                  onChange={(v) => setSection("core_values", "heading", v)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <Field
                    label="Value 1 Title"
                    value={form.sections?.core_values?.items?.[0]?.title ?? ""}
                    placeholder="Integrity"
                    onChange={(v) => {
                      const cur = [...(form.sections?.core_values?.items || [])];
                      while (cur.length < 1) cur.push({});
                      cur[0] = { ...cur[0], title: v, icon: "gem" };
                      setSection("core_values", "items", cur);
                    }}
                  />
                  <Field
                    label="Value 1 Description"
                    type="textarea"
                    rows={2}
                    value={form.sections?.core_values?.items?.[0]?.description ?? ""}
                    placeholder="We build trust through honest and transparent practices."
                    onChange={(v) => {
                      const cur = [...(form.sections?.core_values?.items || [])];
                      while (cur.length < 1) cur.push({});
                      cur[0] = { ...cur[0], description: v, icon: "gem" };
                      setSection("core_values", "items", cur);
                    }}
                  />
                </div>

                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <Field
                    label="Value 2 Title"
                    value={form.sections?.core_values?.items?.[1]?.title ?? ""}
                    placeholder="Quality"
                    onChange={(v) => {
                      const cur = [...(form.sections?.core_values?.items || [])];
                      while (cur.length < 2) cur.push({});
                      cur[1] = { ...cur[1], title: v, icon: "handshake" };
                      setSection("core_values", "items", cur);
                    }}
                  />
                  <Field
                    label="Value 2 Description"
                    type="textarea"
                    rows={2}
                    value={form.sections?.core_values?.items?.[1]?.description ?? ""}
                    placeholder="We never compromise on the quality of our work."
                    onChange={(v) => {
                      const cur = [...(form.sections?.core_values?.items || [])];
                      while (cur.length < 2) cur.push({});
                      cur[1] = { ...cur[1], description: v, icon: "handshake" };
                      setSection("core_values", "items", cur);
                    }}
                  />
                </div>

                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <Field
                    label="Value 3 Title"
                    value={form.sections?.core_values?.items?.[2]?.title ?? ""}
                    placeholder="Sustainability"
                    onChange={(v) => {
                      const cur = [...(form.sections?.core_values?.items || [])];
                      while (cur.length < 3) cur.push({});
                      cur[2] = { ...cur[2], title: v, icon: "leaf" };
                      setSection("core_values", "items", cur);
                    }}
                  />
                  <Field
                    label="Value 3 Description"
                    type="textarea"
                    rows={2}
                    value={form.sections?.core_values?.items?.[2]?.description ?? ""}
                    placeholder="We create spaces that are environmentally responsible and future-ready."
                    onChange={(v) => {
                      const cur = [...(form.sections?.core_values?.items || [])];
                      while (cur.length < 3) cur.push({});
                      cur[2] = { ...cur[2], description: v, icon: "leaf" };
                      setSection("core_values", "items", cur);
                    }}
                  />
                </div>

                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <Field
                    label="Value 4 Title"
                    value={form.sections?.core_values?.items?.[3]?.title ?? ""}
                    placeholder="People First"
                    onChange={(v) => {
                      const cur = [...(form.sections?.core_values?.items || [])];
                      while (cur.length < 4) cur.push({});
                      cur[3] = { ...cur[3], title: v, icon: "users" };
                      setSection("core_values", "items", cur);
                    }}
                  />
                  <Field
                    label="Value 4 Description"
                    type="textarea"
                    rows={2}
                    value={form.sections?.core_values?.items?.[3]?.description ?? ""}
                    placeholder="We value our clients, partners, and team, and grow together with them."
                    onChange={(v) => {
                      const cur = [...(form.sections?.core_values?.items || [])];
                      while (cur.length < 4) cur.push({});
                      cur[3] = { ...cur[3], description: v, icon: "users" };
                      setSection("core_values", "items", cur);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 5. CALL TO ACTION BANNER */}
            <div className="gc-card space-y-4 p-5">
              <h2 className="font-heading text-lg font-semibold text-primary">Call to Action (CTA) Banner</h2>
              <p className="-mt-2 text-xs text-muted-foreground">
                The full-width dark banner at the bottom of the page prompting clients to contact you.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field
                  label="Banner Heading"
                  value={form.sections?.cta?.heading ?? ""}
                  placeholder="Let's Build Something Great Together"
                  onChange={(v) => setSection("cta", "heading", v)}
                />
                <Field
                  label="Button Text"
                  value={form.sections?.cta?.button_text ?? ""}
                  placeholder="Contact Us"
                  onChange={(v) => setSection("cta", "button_text", v)}
                />
                <Field
                  label="Button Link"
                  value={form.sections?.cta?.button_link ?? ""}
                  placeholder="/contact"
                  onChange={(v) => setSection("cta", "button_link", v)}
                />
              </div>
              <Field
                label="Banner Description"
                type="textarea"
                rows={2}
                value={form.sections?.cta?.description ?? ""}
                placeholder="Have a project in mind? Get in touch with our team today."
                onChange={(v) => setSection("cta", "description", v)}
              />
              <ImageField
                label="Building Image"
                value={form.sections?.cta?.image ?? ""}
                folder="About Page"
                onChange={(v) => setSection("cta", "image", v)}
              />
            </div>
          </>
        )}

        {/* SEO & Sharing */}
        <div className="gc-card space-y-4 p-5">
          <h2 className="font-heading text-lg font-semibold text-primary">SEO &amp; sharing</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="SEO title" value={form.seo_title} onChange={(v) => set("seo_title", v)} />
            <Field label="Canonical URL" value={form.canonical_url} onChange={(v) => set("canonical_url", v)} />
          </div>
          <Field label="Meta description" type="textarea" rows={3} value={form.seo_description} onChange={(v) => set("seo_description", v)} />
          <ImageField label="Open Graph image" value={form.og_image} folder="General" onChange={(v) => set("og_image", v)} />
          <div className="flex items-center gap-2">
            <Switch checked={form.robots_index !== false} onCheckedChange={(v) => set("robots_index", v)} disabled={!isAdmin} />
            <Label className="text-sm">Allow search engines to index this page</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
