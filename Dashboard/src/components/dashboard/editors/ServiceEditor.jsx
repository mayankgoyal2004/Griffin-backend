import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import Field from "@/components/dashboard/Field";
import ImageField from "@/components/dashboard/ImageField";
import GalleryField from "@/components/dashboard/GalleryField";
import RepeaterField from "@/components/dashboard/RepeaterField";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { logActivity } from "@/lib/activity";
import { slugify } from "@/lib/format";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

const BLANK = {
  title: "",
  slug: "",
  short_description: "",
  full_description: "",
  icon: "Building2",
  card_image: "",
  hero_image: "",
  overview_image: "",
  supporting_images: [],
  gallery: [],
  display_order: 0,
  featured: false,
  published: false,
  hero_subtitle: "",
  primary_cta_text: "Request a consultation",
  primary_cta_link: "/contact",
  secondary_cta_text: "View projects",
  secondary_cta_link: "/projects",
  overview_heading: "",
  offers_heading: "What we offer",
  features: [],
  process_heading: "Our process",
  process: [],
  why_heading: "Why choose Griffin",
  why_description: "",
  why_image: "",
  advantages: [],
  related_project_ids: [],
  faqs: [],
  cta_heading: "",
  cta_description: "",
  cta_button_label: "Talk to our team",
  cta_button_link: "/contact",
  seo_title: "",
  seo_description: "",
};

export default function ServiceEditor({ serviceId, user }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(BLANK);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(!!serviceId);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const projectRows = await base44.entities.Project.list("display_order", 100);
      if (!active) return;
      setProjects(projectRows);
      if (serviceId) {
        try {
          const record = await base44.entities.Service.get(serviceId);
          if (active) setForm({ ...BLANK, ...record });
        } catch {
          toast.error("That service could not be loaded.");
          navigate({ to: "/dashboard/services" });
        }
      }
      if (active) setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [serviceId, navigate]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const save = async (publishValue) => {
    if (!form.title.trim()) {
      toast.error("A service title is required.");
      return;
    }
    const finalSlug = slugify(form.slug || form.title);
    const duplicates = await base44.entities.Service.filter({ slug: finalSlug }, { limit: 5 });
    if (duplicates.items.some((row) => row.id !== serviceId)) {
      toast.error("That URL slug is already used by another service.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: finalSlug,
        title: form.title.trim(),
        published: publishValue === undefined ? !!form.published : publishValue,
      };
      if (serviceId) {
        await base44.entities.Service.update(serviceId, payload);
        await logActivity({ action: "updated", entity_type: "Service", entity_title: payload.title, user });
      } else {
        await base44.entities.Service.create(payload);
        await logActivity({ action: "created", entity_type: "Service", entity_title: payload.title, user });
      }
      toast.success(serviceId ? "Service saved" : "Service created");
      navigate({ to: "/dashboard/services" });
    } catch (error) {
      toast.error(error.message || "Could not save the service.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading service…
      </div>
    );
  }

  return (
    <div className="pb-24">
      <PageHeader
        title={serviceId ? `Edit service` : "New service"}
        description="Service pages use one reusable template — every section below appears on the live detail page."
      >
        <Button variant="outline" size="sm" onClick={() => navigate({ to: "/dashboard/services" })}>
          Cancel
        </Button>
        <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving}>
          Save draft
        </Button>
        <Button size="sm" onClick={() => save(true)} disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Publish
        </Button>
      </PageHeader>

      <Tabs defaultValue="basics" className="space-y-4">
        <TabsList className="bg-white">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="sections">Page sections</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="mt-0 space-y-4">
          <div className="gc-card space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Service title" required value={form.title} onChange={(v) => set("title", v)} placeholder="Real Estate Development" />
              <Field
                label="URL slug"
                value={form.slug}
                onChange={(v) => set("slug", v)}
                placeholder="real-estate-development"
                hint={`Live URL: /services/${slugify(form.slug || form.title)}`}
              />
            </div>
            <Field label="Short description" type="textarea" rows={2} value={form.short_description} onChange={(v) => set("short_description", v)} />
            <Field label="Full description" type="textarea" rows={5} value={form.full_description} onChange={(v) => set("full_description", v)} />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Card image" value={form.card_image} onChange={(v) => set("card_image", v)} placeholder="Upload below" />
              <Field label="Display order" type="number" value={form.display_order} onChange={(v) => set("display_order", v)} />
              <Field label="Lucide icon name" value={form.icon} onChange={(v) => set("icon", v)} hint="e.g. Building2, Truck, SearchCheck, Monitor" />
            </div>
            <ImageField label="Card image" value={form.card_image} folder="Services" onChange={(v) => set("card_image", v)} />
            <div className="flex flex-wrap items-center gap-6 pt-1">
              <div className="flex items-center gap-2">
                <Switch checked={!!form.featured} onCheckedChange={(v) => set("featured", v)} />
                <Label className="text-sm">Featured on homepage</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={!!form.published} onCheckedChange={(v) => set("published", v)} />
                <Label className="text-sm">Published</Label>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hero" className="mt-0 space-y-4">
          <div className="gc-card space-y-4 p-5">
            <ImageField label="Hero background image" value={form.hero_image} folder="Services" onChange={(v) => set("hero_image", v)} />
            <Field label="Hero subtitle" type="textarea" rows={2} value={form.hero_subtitle} onChange={(v) => set("hero_subtitle", v)} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Primary CTA text" value={form.primary_cta_text} onChange={(v) => set("primary_cta_text", v)} />
              <Field label="Primary CTA link" value={form.primary_cta_link} onChange={(v) => set("primary_cta_link", v)} />
              <Field label="Secondary CTA text" value={form.secondary_cta_text} onChange={(v) => set("secondary_cta_text", v)} />
              <Field label="Secondary CTA link" value={form.secondary_cta_link} onChange={(v) => set("secondary_cta_link", v)} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sections" className="mt-0 space-y-4">
          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-primary">Overview</h2>
            <Field label="Overview heading" value={form.overview_heading} onChange={(v) => set("overview_heading", v)} />
            <ImageField label="Overview image" value={form.overview_image} folder="Services" onChange={(v) => set("overview_image", v)} />
            <GalleryField label="Supporting image" images={form.supporting_images || []} folder="Services" onChange={(v) => set("supporting_images", v)} />
          </div>

          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-primary">What we offer</h2>
            <Field label="Section heading" value={form.offers_heading} onChange={(v) => set("offers_heading", v)} />
            <RepeaterField
              label="Feature cards"
              items={form.features || []}
              onChange={(v) => set("features", v)}
              addLabel="Add feature card"
              fields={[
                { key: "icon", label: "Icon (lucide name)" },
                { key: "title", label: "Title" },
                { key: "description", label: "Description", type: "textarea" },
              ]}
            />
          </div>

          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-primary">Our process</h2>
            <Field label="Section heading" value={form.process_heading} onChange={(v) => set("process_heading", v)} />
            <RepeaterField
              label="Process steps"
              items={form.process || []}
              onChange={(v) => set("process", v)}
              addLabel="Add step"
              fields={[
                { key: "step", label: "Step number" },
                { key: "title", label: "Title" },
                { key: "icon", label: "Icon (lucide name)" },
                { key: "description", label: "Description", type: "textarea" },
              ]}
            />
          </div>

          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-primary">Why choose Griffin</h2>
            <Field label="Section heading" value={form.why_heading} onChange={(v) => set("why_heading", v)} />
            <Field label="Description" type="textarea" value={form.why_description} onChange={(v) => set("why_description", v)} />
            <ImageField label="Supporting image" value={form.why_image} folder="Services" onChange={(v) => set("why_image", v)} />
            <RepeaterField
              label="Advantages"
              items={form.advantages || []}
              onChange={(v) => set("advantages", v)}
              fields={[
                { key: "title", label: "Title" },
                { key: "description", label: "Description", type: "textarea" },
              ]}
            />
          </div>

          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-primary">Related projects</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {projects.length === 0 && <p className="text-xs text-muted-foreground">No projects available yet.</p>}
              {projects.map((project) => {
                const checked = (form.related_project_ids || []).includes(project.id);
                return (
                  <label key={project.id} className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const ids = form.related_project_ids || [];
                        set("related_project_ids", e.target.checked ? [...ids, project.id] : ids.filter((id) => id !== project.id));
                      }}
                      className="h-4 w-4 accent-[hsl(var(--gold))]"
                    />
                    <span className="truncate">{project.name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-primary">FAQs</h2>
            <RepeaterField
              label="Questions"
              items={form.faqs || []}
              onChange={(v) => set("faqs", v)}
              addLabel="Add question"
              fields={[
                { key: "question", label: "Question" },
                { key: "answer", label: "Answer", type: "textarea" },
              ]}
            />
          </div>

          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-primary">Final call to action</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Heading" value={form.cta_heading} onChange={(v) => set("cta_heading", v)} />
              <Field label="Button label" value={form.cta_button_label} onChange={(v) => set("cta_button_label", v)} />
            </div>
            <Field label="Description" type="textarea" rows={2} value={form.cta_description} onChange={(v) => set("cta_description", v)} />
            <Field label="Button link" value={form.cta_button_link} onChange={(v) => set("cta_button_link", v)} />
          </div>
        </TabsContent>

        <TabsContent value="seo" className="mt-0">
          <div className="gc-card space-y-4 p-5">
            <Field label="SEO title" value={form.seo_title} onChange={(v) => set("seo_title", v)} hint="Aim for 50–60 characters." />
            <Field label="Meta description" type="textarea" rows={3} value={form.seo_description} onChange={(v) => set("seo_description", v)} hint="Aim for 150–160 characters." />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}