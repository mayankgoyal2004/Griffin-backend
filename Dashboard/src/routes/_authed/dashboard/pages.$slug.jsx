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
        <div className="gc-card space-y-4 p-5">
          <h2 className="font-heading text-lg font-semibold text-primary">Page basics</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Page title" value={form.title} onChange={(v) => set("title", v)} />
            <Field label="Slug" value={form.slug} onChange={(v) => set("slug", v)} disabled hint="Changing a slug changes the page key — do it carefully." />
            <Field label="Page heading" value={form.heading} onChange={(v) => set("heading", v)} className="sm:col-span-2" />
            <Field label="Subtitle" value={form.subtitle} onChange={(v) => set("subtitle", v)} className="sm:col-span-2" />
          </div>
          <Field label="Description" type="textarea" rows={4} value={form.description} onChange={(v) => set("description", v)} />
          <div className="flex items-center gap-2">
            <Switch checked={!!form.published} onCheckedChange={(v) => set("published", v)} disabled={!isAdmin} />
            <Label className="text-sm">Published</Label>
          </div>
        </div>

        <div className="gc-card space-y-4 p-5">
          <h2 className="font-heading text-lg font-semibold text-primary">Hero Banner Artwork</h2>
          <p className="-mt-2 text-xs text-muted-foreground">
            The panoramic background artwork displayed behind the page title in the top banner.
          </p>
          <ImageField label="Banner artwork image" value={form.hero_image} folder="Hero Images" onChange={(v) => set("hero_image", v)} />
        </div>

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

        {/* Content sections (only for legal policies or custom home blocks) */}
        {(form.page_type === "legal" || form.slug === "home" || form.page_type === "home") && (
          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-primary">
              {form.page_type === "legal" ? "Policy sections" : "Page sections"}
            </h2>
            <p className="-mt-2 text-xs text-muted-foreground">
              {form.page_type === "legal"
                ? "Each entry is a heading and its body copy. Reorder them with the arrows."
                : "Add, edit and reorder the content blocks that make up this page."}
            </p>
            <RepeaterField
              label=""
              items={form.sections || []}
              onChange={(v) => set("sections", v)}
              addLabel={form.page_type === "legal" ? "Add policy section" : "Add section"}
              fields={
                form.page_type === "legal"
                  ? [
                      { key: "heading", label: "Section Heading", placeholder: "e.g. Information We Collect" },
                      { key: "description", label: "Section Content / Paragraphs", type: "textarea", rows: 4, placeholder: "Enter paragraph text or bullet points..." },
                    ]
                  : [
                      { key: "key", label: "Internal key", placeholder: "why-choose-us" },
                      { key: "heading", label: "Heading" },
                      { key: "subheading", label: "Subheading" },
                      { key: "description", label: "Description", type: "textarea" },
                      { key: "cta_text", label: "CTA text" },
                      { key: "cta_link", label: "CTA link" },
                    ]
              }
            />
            {form.page_type === "legal" && <Field label="Last revised date" type="date" value={form.last_revised} onChange={(v) => set("last_revised", v)} />}
          </div>
        )}

        {/* Statistics & Advantages (only for Home and About pages) */}
        {(form.slug === "home" || form.page_type === "home" || form.slug === "about" || form.page_type === "about") && (
          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-primary">Statistics &amp; advantages</h2>
            <RepeaterField
              label="Statistics"
              items={form.stats || []}
              onChange={(v) => set("stats", v)}
              fields={[
                { key: "value", label: "Value", placeholder: "180+" },
                { key: "label", label: "Label", placeholder: "Projects delivered" },
              ]}
            />
            {(form.page_type === "home" || form.slug === "home") && (
              <RepeaterField
                label="Why choose us advantages"
                items={form.advantages || []}
                onChange={(v) => set("advantages", v)}
                addLabel="Add advantage"
                fields={[
                  { key: "icon", label: "Icon (lucide name)" },
                  { key: "title", label: "Title" },
                  { key: "description", label: "Description", type: "textarea" },
                ]}
              />
            )}
          </div>
        )}

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