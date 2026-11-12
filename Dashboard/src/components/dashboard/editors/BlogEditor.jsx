import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import Field from "@/components/dashboard/Field";
import ImageField from "@/components/dashboard/ImageField";
import PageHeader from "@/components/dashboard/PageHeader";
import RichTextEditor from "@/components/dashboard/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { logActivity } from "@/lib/activity";
import { readingTime, slugify } from "@/lib/format";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

const BLANK = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featured_image: "",
  author: "Griffin Construction",
  category: "",
  tags: [],
  reading_time: 1,
  publication_date: "",
  seo_title: "",
  seo_description: "",
  og_image: "",
  featured: false,
  published: false,
  display_order: 0,
};

export default function BlogEditor({ postId, user }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(BLANK);
  const [loading, setLoading] = useState(!!postId);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!postId) {
      setForm({ ...BLANK, publication_date: new Date().toISOString().slice(0, 10) });
      return;
    }
    let active = true;
    base44.entities.BlogPost.get(postId)
      .then((record) => {
        if (active) setForm({ ...BLANK, ...record });
      })
      .catch(() => {
        toast.error("That article could not be loaded.");
        navigate({ to: "/dashboard/blog" });
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [postId, navigate]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const save = async (publishValue) => {
    if (!form.title.trim()) {
      toast.error("An article title is required.");
      return;
    }
    const finalSlug = slugify(form.slug || form.title);
    const duplicates = await base44.entities.BlogPost.filter({ slug: finalSlug }, { limit: 5 });
    if (duplicates.items.some((row) => row.id !== postId)) {
      toast.error("That URL slug is already used by another article.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: finalSlug,
        title: form.title.trim(),
        reading_time: form.reading_time || readingTime(form.content),
        published: publishValue === undefined ? !!form.published : publishValue,
      };
      if (postId) {
        await base44.entities.BlogPost.update(postId, payload);
        await logActivity({ action: "updated", entity_type: "Article", entity_title: payload.title, user });
      } else {
        await base44.entities.BlogPost.create(payload);
        await logActivity({ action: "created", entity_type: "Article", entity_title: payload.title, user });
      }
      toast.success(postId ? "Article saved" : "Article created");
      navigate({ to: "/dashboard/blog" });
    } catch (error) {
      toast.error(error.message || "Could not save the article.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading article…
      </div>
    );
  }

  return (
    <div className="pb-24">
      <PageHeader title={postId ? "Edit article" : "New article"} description="Rich text articles with categories, tags and per-article SEO metadata.">
        <Button variant="outline" size="sm" onClick={() => navigate({ to: "/dashboard/blog" })}>
          Cancel
        </Button>
        <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving}>
          Save draft
        </Button>
        <Button size="sm" onClick={() => save(true)} disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Publish
        </Button>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="gc-card space-y-4 p-5">
            <Field label="Title" required value={form.title} onChange={(v) => set("title", v)} placeholder="How we plan a construction programme" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="URL slug" value={form.slug} onChange={(v) => set("slug", v)} hint={`/blog/${slugify(form.slug || form.title)}`} />
              <Field label="Publication date" type="date" value={form.publication_date} onChange={(v) => set("publication_date", v)} />
            </div>
            <Field label="Excerpt" type="textarea" rows={3} value={form.excerpt} onChange={(v) => set("excerpt", v)} hint="Shown in listings and previews." />
          </div>

          <div className="gc-card p-5">
            <h2 className="mb-3 font-heading text-lg font-semibold text-primary">Article content</h2>
            <RichTextEditor value={form.content} onChange={(v) => set("content", v)} />
          </div>

          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-primary">SEO &amp; social</h2>
            <Field label="SEO title" value={form.seo_title} onChange={(v) => set("seo_title", v)} />
            <Field label="Meta description" type="textarea" rows={3} value={form.seo_description} onChange={(v) => set("seo_description", v)} />
            <ImageField label="Open Graph image" value={form.og_image} folder="Blog" onChange={(v) => set("og_image", v)} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="gc-card space-y-4 p-5">
            <h2 className="font-heading text-base font-semibold text-primary">Publishing</h2>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Published</Label>
              <Switch checked={!!form.published} onCheckedChange={(v) => set("published", v)} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Featured article</Label>
              <Switch checked={!!form.featured} onCheckedChange={(v) => set("featured", v)} />
            </div>
            <Field label="Reading time (minutes)" type="number" value={form.reading_time} onChange={(v) => set("reading_time", v)} />
            <Button type="button" variant="outline" size="sm" onClick={() => set("reading_time", readingTime(form.content))}>
              Calculate from content
            </Button>
          </div>

          <div className="gc-card space-y-4 p-5">
            <ImageField label="Featured image" value={form.featured_image} folder="Blog" onChange={(v) => set("featured_image", v)} />
            <Field label="Author" value={form.author} onChange={(v) => set("author", v)} />
            <Field label="Category" value={form.category} onChange={(v) => set("category", v)} placeholder="Insights" />
            <Field
              label="Tags"
              value={(form.tags || []).join(", ")}
              onChange={(v) => set("tags", v.split(",").map((tag) => tag.trim()).filter(Boolean))}
              hint="Separate tags with commas."
            />
          </div>
        </div>
      </div>
    </div>
  );
}