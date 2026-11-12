import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import Field from "@/components/dashboard/Field";
import ImageField from "@/components/dashboard/ImageField";
import RepeaterField from "@/components/dashboard/RepeaterField";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logActivity } from "@/lib/activity";
import { SITE_DEFAULTS } from "@/lib/defaultContent";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/dashboard/settings")({
  ssr: false,
  head: () => ({ meta: [{ title: "Website settings — Griffin CMS" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = Route.useRouteContext();
  const isAdmin = user?.role === "admin";
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    base44.entities.SiteSettings.list()
      .then((rows) => setForm({ ...SITE_DEFAULTS, ...(rows[0] || {}) }))
      .catch(() => setForm({ ...SITE_DEFAULTS }));
  }, []);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = { ...form };
      if (form.id) await base44.entities.SiteSettings.update(form.id, payload);
      else await base44.entities.SiteSettings.create(payload);
      await logActivity({ action: "updated", entity_type: "Website settings", entity_title: "Global settings", user });
      toast.success("Settings saved — the website updates immediately");
    } catch (error) {
      toast.error(error.message || "Could not save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (!form) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading settings…
      </div>
    );
  }

  return (
    <div className="pb-24">
      <PageHeader title="Website settings" description="Brand identity, contact details, navigation and footer used across every page.">
        <Button size="sm" onClick={save} disabled={saving || !isAdmin}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Save settings
        </Button>
      </PageHeader>

      {!isAdmin && (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Only administrators can change global website settings.
        </p>
      )}

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-white">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0">
          <div className="gc-card space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company name" value={form.company_name} onChange={(v) => set("company_name", v)} />
              <Field label="Website URL" value={form.website_url} onChange={(v) => set("website_url", v)} placeholder="https://griffinconstruction.com" />
            </div>
            <Field label="Company description" type="textarea" rows={3} value={form.company_description} onChange={(v) => set("company_description", v)} />
            <ImageField label="Company logo" value={form.logo} folder="Logo" onChange={(v) => set("logo", v)} />
            <ImageField label="Footer logo" value={form.footer_logo} folder="Logo" onChange={(v) => set("footer_logo", v)} />
            <ImageField label="Favicon" value={form.favicon} folder="Logo" onChange={(v) => set("favicon", v)} />
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-0">
          <div className="gc-card space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone number" value={form.phone} onChange={(v) => set("phone", v)} />
              <Field label="Email address" type="email" value={form.email} onChange={(v) => set("email", v)} />
            </div>
            <Field label="Office address" type="textarea" rows={2} value={form.address} onChange={(v) => set("address", v)} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Google Maps link" value={form.maps_link} onChange={(v) => set("maps_link", v)} />
              <Field label="Working hours" value={form.working_hours} onChange={(v) => set("working_hours", v)} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="social" className="mt-0">
          <div className="gc-card grid gap-4 p-5 sm:grid-cols-2">
            <Field label="Facebook URL" value={form.facebook} onChange={(v) => set("facebook", v)} />
            <Field label="Instagram URL" value={form.instagram} onChange={(v) => set("instagram", v)} />
            <Field label="LinkedIn URL" value={form.linkedin} onChange={(v) => set("linkedin", v)} />
            <Field label="YouTube URL" value={form.youtube} onChange={(v) => set("youtube", v)} />
          </div>
        </TabsContent>

        <TabsContent value="header" className="mt-0">
          <div className="gc-card space-y-4 p-5">
            <RepeaterField
              label="Navigation items"
              items={form.nav_items || []}
              onChange={(v) => set("nav_items", v)}
              addLabel="Add navigation item"
              fields={[
                { key: "label", label: "Label" },
                { key: "link", label: "Link", placeholder: "/services" },
              ]}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Header CTA text" value={form.header_cta_text} onChange={(v) => set("header_cta_text", v)} />
              <Field label="Header CTA link" value={form.header_cta_link} onChange={(v) => set("header_cta_link", v)} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="footer" className="mt-0">
          <div className="gc-card space-y-4 p-5">
            <Field label="Footer description" type="textarea" rows={3} value={form.footer_description} onChange={(v) => set("footer_description", v)} />
            <RepeaterField
              label="Quick links"
              items={form.footer_quick_links || []}
              onChange={(v) => set("footer_quick_links", v)}
              fields={[
                { key: "label", label: "Label" },
                { key: "link", label: "Link" },
              ]}
            />
            <RepeaterField
              label="Service links"
              items={form.footer_service_links || []}
              onChange={(v) => set("footer_service_links", v)}
              fields={[
                { key: "label", label: "Label" },
                { key: "link", label: "Link" },
              ]}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Copyright text" value={form.copyright_text} onChange={(v) => set("copyright_text", v)} hint="Use {year} for the current year." />
              <Field label="Privacy policy link" value={form.privacy_link} onChange={(v) => set("privacy_link", v)} placeholder="/privacy-policy" />
              <Field label="Terms link" value={form.terms_link} onChange={(v) => set("terms_link", v)} placeholder="/terms" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}