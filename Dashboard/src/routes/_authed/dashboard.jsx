import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { useSiteSettings, normalizeWebsiteUrl, resolveWebsiteLink } from "@/lib/useSiteSettings";
import { Route as AuthedRoute } from "@/routes/_authed";

export const Route = createFileRoute("/_authed/dashboard")({
  ssr: false,
  component: DashboardLayout,
});

function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { user } = AuthedRoute.useRouteContext();
  const isAdmin = user?.role === "admin";
  const settings = useSiteSettings();

  const companyName = settings?.company_name || settings?.companyName || "Griffin Construction";
  const websiteUrl = normalizeWebsiteUrl(settings?.website_url || settings?.websiteUrl);
  const currentYear = new Date().getFullYear();
  const copyrightText = settings?.copyright_text || settings?.copyrightText
    ? (settings.copyright_text || settings.copyrightText).replace("{year}", currentYear)
    : `© ${currentYear} ${companyName}. All rights reserved.`;
  const privacyLink = resolveWebsiteLink(settings?.privacy_link || settings?.privacyLink, "/privacy-policy", websiteUrl);
  const termsLink = resolveWebsiteLink(settings?.terms_link || settings?.termsLink, "/terms-and-conditions", websiteUrl);

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream">
      <Sidebar open={open} onClose={() => setOpen(false)} isAdmin={isAdmin} />
      <div className="flex min-h-screen min-w-0 flex-col lg:pl-64">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="mx-auto w-full max-w-[1400px] min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
        <footer className="mt-auto border-t border-border bg-white/70 px-4 py-4 sm:px-6 lg:px-8 text-xs text-muted-foreground">
          <div className="mx-auto flex max-w-[1400px] flex-col sm:flex-row items-center justify-between gap-2">
            <p>{copyrightText}</p>
            <div className="flex items-center gap-3 font-medium">
              <a href={privacyLink} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <span className="text-border">|</span>
              <a href={termsLink} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
