import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import Field from "@/components/dashboard/Field";
import ImageField from "@/components/dashboard/ImageField";
import GalleryField from "@/components/dashboard/GalleryField";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { logActivity } from "@/lib/activity";
import { slugify } from "@/lib/format";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@/lib/defaultContent";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

const BLANK = {
  name: "",
  slug: "",
  short_description: "",
  full_description: "",
  category: "Residential",
  status: "Planning",
  location: "",
  client_name: "",
  start_date: "",
  completion_date: "",
  cover_image: "",
  gallery: [],
  related_service_ids: [],
  features: [],
  featured: false,
  published: false,
  display_order: 0,
  seo_title: "",
  seo_description: "",
};

export default function ProjectEditor({ projectId, user }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(BLANK);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(!!projectId);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const serviceRows = await base44.entities.Service.list("display_order", 100);
      if (!active) return;
      setServices(serviceRows);
      if (projectId) {
        try {
          const record = await base44.entities.Project.get(projectId);
          if (active) setForm({ ...BLANK, ...record });
        } catch {
          toast.error("That project could not be loaded.");
          navigate({ to: "/dashboard/projects" });
        }
      }
      if (active) setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [projectId, navigate]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const save = async (publishValue) => {
    if (!form.name.trim()) {
      toast.error("A project name is required.");
      return;
    }
    const finalSlug = slugify(form.slug || form.name);
    const duplicates = await base44.entities.Project.filter({ slug: finalSlug }, { limit: 5 });
    if (duplicates.items.some((row) => row.id !== projectId)) {
      toast.error("That URL slug is already used by another project.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: finalSlug,
        name: form.name.trim(),
        published: publishValue === undefined ? !!form.published : publishValue,
      };
      if (projectId) {
        await base44.entities.Project.update(projectId, payload);
        await logActivity({ action: "updated", entity_type: "Project", entity_title: payload.name, user });
      } else {
        await base44.entities.Project.create(payload);
        await logActivity({ action: "created", entity_type: "Project", entity_title: payload.name, user });
      }
      toast.success(projectId ? "Project saved" : "Project created");
      navigate({ to: "/dashboard/projects" });
    } catch (error) {
      toast.error(error.message || "Could not save the project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading project…
      </div>
    );
  }

  return (
    <div className="pb-24">
      <PageHeader title={projectId ? "Edit project" : "New project"} description="Project records appear on the projects page, its category filters and the detail page.">
        <Button variant="outline" size="sm" onClick={() => navigate({ to: "/dashboard/projects" })}>
          Cancel
        </Button>
        <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving}>
          Save draft
        </Button>
        <Button size="sm" onClick={() => save(true)} disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Publish
        </Button>
      </PageHeader>

      <div className="space-y-4">
        <div className="gc-card space-y-4 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Project name" required value={form.name} onChange={(v) => set("name", v)} placeholder="Griffin Heights Residences" />
            <Field label="URL slug" value={form.slug} onChange={(v) => set("slug", v)} hint={`Live URL: /projects/${slugify(form.slug || form.name)}`} />
            <Field label="Category" type="select" options={PROJECT_CATEGORIES} value={form.category} onChange={(v) => set("category", v)} />
            <Field label="Project status" type="select" options={PROJECT_STATUSES} value={form.status} onChange={(v) => set("status", v)} />
            <Field label="Location" value={form.location} onChange={(v) => set("location", v)} placeholder="Pune, Maharashtra" />
            <Field label="Client name (optional)" value={form.client_name} onChange={(v) => set("client_name", v)} />
            <Field label="Start date" type="date" value={form.start_date} onChange={(v) => set("start_date", v)} />
            <Field label="Completion date" type="date" value={form.completion_date} onChange={(v) => set("completion_date", v)} />
          </div>
          <Field label="Short description" type="textarea" rows={2} value={form.short_description} onChange={(v) => set("short_description", v)} />
          <Field label="Detailed description" type="textarea" rows={6} value={form.full_description} onChange={(v) => set("full_description", v)} />
          <Field
            label="Project features"
            type="textarea"
            rows={4}
            value={(form.features || []).join("\n")}
            onChange={(v) => set("features", v.split("\n").filter((line) => line.trim()))}
            hint="One feature per line."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Switch checked={!!form.featured} onCheckedChange={(v) => set("featured", v)} />
              <Label className="text-sm">Featured on homepage</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={!!form.published} onCheckedChange={(v) => set("published", v)} />
              <Label className="text-sm">Published</Label>
            </div>
          </div>
          <Field label="Display order" type="number" value={form.display_order} onChange={(v) => set("display_order", v)} className="sm:w-40" />
        </div>

        <div className="gc-card space-y-4 p-5">
          <h2 className="font-heading text-lg font-semibold text-primary">Imagery</h2>
          <ImageField label="Cover image" value={form.cover_image} folder="Projects" onChange={(v) => set("cover_image", v)} />
          <GalleryField label="Gallery" images={form.gallery || []} folder="Projects" onChange={(v) => set("gallery", v)} />
        </div>

        <div className="gc-card space-y-3 p-5">
          <h2 className="font-heading text-lg font-semibold text-primary">Related services</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {services.length === 0 && <p className="text-xs text-muted-foreground">No services available yet.</p>}
            {services.map((service) => {
              const checked = (form.related_service_ids || []).includes(service.id);
              return (
                <label key={service.id} className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      const ids = form.related_service_ids || [];
                      set("related_service_ids", e.target.checked ? [...ids, service.id] : ids.filter((id) => id !== service.id));
                    }}
                    className="h-4 w-4 accent-[hsl(var(--gold))]"
                  />
                  <span className="truncate">{service.title}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="gc-card space-y-4 p-5">
          <h2 className="font-heading text-lg font-semibold text-primary">SEO</h2>
          <Field label="SEO title" value={form.seo_title} onChange={(v) => set("seo_title", v)} />
          <Field label="Meta description" type="textarea" rows={3} value={form.seo_description} onChange={(v) => set("seo_description", v)} />
        </div>
      </div>
    </div>
  );
}