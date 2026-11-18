import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import Field from "@/components/dashboard/Field";
import ImageField from "@/components/dashboard/ImageField";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logActivity } from "@/lib/activity";
import { SITE_DEFAULTS } from "@/lib/defaultContent";
import { invalidateSiteSettings } from "@/lib/useSiteSettings";
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
      .then((rows) => {
        const record = rows[0] || {};
        setForm({ ...SITE_DEFAULTS, ...record });
      })
      .catch(() => setForm({ ...SITE_DEFAULTS }));
  }, []);

  const set = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "company_name") next.companyName = value;
      if (key === "companyName") next.company_name = value;
      if (key === "company_description") next.companyDescription = value;
      if (key === "companyDescription") next.company_description = value;
      if (key === "footer_logo") next.footerLogo = value;
      if (key === "footerLogo") next.footer_logo = value;
      if (key === "maps_link") next.mapsLink = value;
      if (key === "mapsLink") next.maps_link = value;
      if (key === "map_embed_url") next.mapEmbedUrl = value;
      if (key === "mapEmbedUrl") next.map_embed_url = value;
      if (key === "working_hours") next.workingHours = value;
      if (key === "workingHours") next.working_hours = value;
      if (key === "website_url") next.websiteUrl = value;
      if (key === "websiteUrl") next.website_url = value;
      if (key === "header_cta_text") next.headerCtaText = value;
      if (key === "headerCtaText") next.header_cta_text = value;
      if (key === "header_cta_link") next.headerCtaLink = value;
      if (key === "headerCtaLink") next.header_cta_link = value;
      if (key === "footer_description") next.footerDescription = value;
      if (key === "footerDescription") next.footer_description = value;
      if (key === "copyright_text") next.copyrightText = value;
      if (key === "copyrightText") next.copyright_text = value;
      if (key === "privacy_link") next.privacyLink = value;
      if (key === "privacyLink") next.privacy_link = value;
      if (key === "terms_link") next.termsLink = value;
      if (key === "termsLink") next.terms_link = value;
      if (key === "show_projects") next.showProjects = value;
      if (key === "showProjects") next.show_projects = value;
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        companyName: form.company_name ?? form.companyName ?? "",
        company_name: form.company_name ?? form.companyName ?? "",
        companyDescription: form.company_description ?? form.companyDescription ?? "",
        company_description: form.company_description ?? form.companyDescription ?? "",
        logo: form.logo ?? "",
        footerLogo: form.footer_logo ?? form.footerLogo ?? "",
        footer_logo: form.footer_logo ?? form.footerLogo ?? "",
        favicon: form.favicon ?? "",
        mapsLink: form.maps_link ?? form.mapsLink ?? "",
        maps_link: form.maps_link ?? form.mapsLink ?? "",
        mapEmbedUrl: form.map_embed_url ?? form.mapEmbedUrl ?? "",
        map_embed_url: form.map_embed_url ?? form.mapEmbedUrl ?? "",
        websiteUrl: form.website_url ?? form.websiteUrl ?? "",
        website_url: form.website_url ?? form.websiteUrl ?? "",
        workingHours: form.working_hours ?? form.workingHours ?? "",
        working_hours: form.working_hours ?? form.workingHours ?? "",
        phone: form.phone ?? "",
        phoneDisplay: form.phone_display ?? form.phoneDisplay ?? form.phone ?? "",
        phone_display: form.phone_display ?? form.phoneDisplay ?? form.phone ?? "",
        email: form.email ?? "",
        address: form.address ?? "",
        headerCtaText: form.header_cta_text ?? form.headerCtaText ?? "",
        header_cta_text: form.header_cta_text ?? form.headerCtaText ?? "",
        headerCtaLink: form.header_cta_link ?? form.headerCtaLink ?? "",
        header_cta_link: form.header_cta_link ?? form.headerCtaLink ?? "",
        footerDescription: form.footer_description ?? form.footerDescription ?? "",
        footer_description: form.footer_description ?? form.footerDescription ?? "",
        copyrightText: form.copyright_text ?? form.copyrightText ?? "",
        copyright_text: form.copyright_text ?? form.copyrightText ?? "",
        privacyLink: form.privacy_link ?? form.privacyLink ?? "",
        privacy_link: form.privacy_link ?? form.privacyLink ?? "",
        termsLink: form.terms_link ?? form.termsLink ?? "",
        terms_link: form.terms_link ?? form.termsLink ?? "",
        facebook: form.facebook ?? "",
        instagram: form.instagram ?? "",
        linkedin: form.linkedin ?? "",
        twitter: form.twitter ?? "",
        youtube: form.youtube ?? "",
        navItems: form.nav_items ?? form.navItems ?? [],
        nav_items: form.nav_items ?? form.navItems ?? [],
        footerQuickLinks: form.footer_quick_links ?? form.footerQuickLinks ?? [],
        footer_quick_links: form.footer_quick_links ?? form.footerQuickLinks ?? [],
        footerServiceLinks: form.footer_service_links ?? form.footerServiceLinks ?? [],
        footer_service_links: form.footer_service_links ?? form.footerServiceLinks ?? [],
      };
      if (payload.show_projects !== undefined) {
        payload.showProjects = payload.show_projects;
      }
      if (form.id) await base44.entities.SiteSettings.update(form.id, payload);
      else await base44.entities.SiteSettings.create(payload);

      invalidateSiteSettings(payload);
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
            <div className="flex items-center justify-between rounded-lg border border-border p-4 bg-muted/20">
              <div>
                <p className="text-sm font-semibold text-primary">Show Projects on Website</p>
                <p className="text-xs text-muted-foreground">
                  When turned off, the Projects section on the home page, navigation link, and the /projects page are hidden from visitors.
                </p>
              </div>
              <Switch
                checked={form.show_projects !== false && form.showProjects !== false}
                onCheckedChange={(v) => {
                  set("show_projects", v);
                  set("showProjects", v);
                }}
                disabled={!isAdmin}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company name" value={form.company_name ?? ""} onChange={(v) => set("company_name", v)} placeholder="Griffin Construction" />
              <Field label="Website URL" value={form.website_url ?? ""} onChange={(v) => set("website_url", v)} placeholder="https://griffinconstruction.in" />
            </div>
            <Field label="Company description" type="textarea" rows={3} value={form.company_description ?? ""} onChange={(v) => set("company_description", v)} placeholder="Griffin Construction designs, builds and delivers residential..." />
            <ImageField label="Company logo" value={form.logo ?? ""} folder="Logo" onChange={(v) => set("logo", v)} />
            <ImageField label="Footer logo" value={form.footer_logo ?? ""} folder="Logo" onChange={(v) => set("footer_logo", v)} />
            <ImageField label="Favicon" value={form.favicon ?? ""} folder="Logo" onChange={(v) => set("favicon", v)} />
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-0">
          <div className="gc-card space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone number" value={form.phone ?? ""} onChange={(v) => set("phone", v)} placeholder="+91 123 456 7890" />
              <Field label="Email address" type="email" value={form.email ?? ""} onChange={(v) => set("email", v)} placeholder="contact@griffinconstruction.in" />
            </div>
            <Field label="Office address" type="textarea" rows={2} value={form.address ?? ""} onChange={(v) => set("address", v)} placeholder="Mohali, Punjab, India" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Google Maps link"
                value={form.maps_link ?? ""}
                onChange={(v) => set("maps_link", v)}
                placeholder="https://maps.app.goo.gl/..."
                hint="Share link (e.g. https://maps.app.goo.gl/...)"
              />
              <Field label="Working hours" value={form.working_hours ?? ""} onChange={(v) => set("working_hours", v)} placeholder="Mon - Sat: 9:00 AM - 7:00 PM" />
            </div>
            <Field
              label="Map Embed URL or Iframe (Optional)"
              value={form.map_embed_url ?? ""}
              onChange={(v) => set("map_embed_url", v)}
              placeholder="Auto-generated from Google Maps link or paste custom iframe / embed URL"
              hint="Leave blank to automatically generate from your Google Maps link."
            />
          </div>
        </TabsContent>

        <TabsContent value="social" className="mt-0">
          <div className="gc-card grid gap-4 p-5 sm:grid-cols-2">
            <Field label="Facebook URL" value={form.facebook ?? ""} onChange={(v) => set("facebook", v)} placeholder="https://facebook.com/..." />
            <Field label="Instagram URL" value={form.instagram ?? ""} onChange={(v) => set("instagram", v)} placeholder="https://instagram.com/..." />
            <Field label="LinkedIn URL" value={form.linkedin ?? ""} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/company/..." />
            <Field label="YouTube URL" value={form.youtube ?? ""} onChange={(v) => set("youtube", v)} placeholder="https://youtube.com/@..." />
            <Field label="X (Twitter) URL" value={form.twitter ?? ""} onChange={(v) => set("twitter", v)} placeholder="https://x.com/..." />
          </div>
        </TabsContent>

        <TabsContent value="header" className="mt-0">
          <div className="gc-card space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Header CTA text" value={form.header_cta_text ?? ""} onChange={(v) => set("header_cta_text", v)} placeholder="Get a Quote" />
              <Field label="Header CTA link" value={form.header_cta_link ?? ""} onChange={(v) => set("header_cta_link", v)} placeholder="/contact" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="footer" className="mt-0">
          <div className="gc-card space-y-4 p-5">
            <Field label="Footer description" type="textarea" rows={3} value={form.footer_description ?? ""} onChange={(v) => set("footer_description", v)} placeholder="A trusted construction and real estate company..." />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Copyright text" value={form.copyright_text ?? ""} onChange={(v) => set("copyright_text", v)} placeholder="© {year} Griffin Construction. All rights reserved." hint="Use {year} for the current year." />
              <Field label="Privacy policy link" value={form.privacy_link ?? ""} onChange={(v) => set("privacy_link", v)} placeholder="/privacy-policy" />
              <Field label="Terms link" value={form.terms_link ?? ""} onChange={(v) => set("terms_link", v)} placeholder="/terms-and-conditions" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
