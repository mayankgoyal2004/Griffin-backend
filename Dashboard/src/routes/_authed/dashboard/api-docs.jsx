import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "@/components/dashboard/PageHeader";

export const Route = createFileRoute("/_authed/dashboard/api-docs")({
  ssr: false,
  head: () => ({ meta: [{ title: "API & integration — Griffin CMS" }] }),
  component: ApiDocsPage,
});

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/public/content?type=services",
    description: "Published services. Add &slug=real-estate-development for a single service.",
    types: ["services", "projects", "team", "blog"],
  },
  {
    method: "GET",
    path: "/api/public/settings",
    description: "Company identity, contact details, navigation and footer for the public site.",
  },
  {
    method: "POST",
    path: "/api/public/inquiries",
    description: "Creates a contact inquiry from the public contact form.",
    body: {
      full_name: "string (required)",
      email: "string (required)",
      phone: "string",
      subject: "string",
      project_type: "string",
      message: "string (required)",
    },
  },
  { method: "GET", path: "/api/sitemap", description: "XML sitemap of every published page, service, project and article." },
  { method: "GET", path: "/api/robots", description: "robots.txt pointing search engines at the sitemap." },
];

function ApiDocsPage() {
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);

  return (
    <div>
      <PageHeader
        title="API & integration"
        description="Read-only JSON endpoints for the existing React website, plus the contact form endpoint. Administrative writes stay behind dashboard authentication."
      />

      <div className="space-y-4">
        <div className="gc-card p-5">
          <h2 className="font-heading text-base font-semibold text-primary">How to connect the existing website</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Point the website&apos;s data layer at the endpoints below using the published app domain.</li>
            <li>Only published records are returned, so drafts never leak to visitors.</li>
            <li>When content changes in this dashboard, the endpoints return the new values on the next request — no redeploy needed.</li>
            <li>Keep images referenced by URL; the media library returns persistent CDN links.</li>
          </ol>
        </div>

        {ENDPOINTS.map((endpoint) => (
          <div key={endpoint.path} className="gc-card p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-primary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
                {endpoint.method}
              </span>
              <code className="text-sm text-primary">{endpoint.path}</code>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{endpoint.description}</p>
            {endpoint.types && (
              <p className="mt-1 text-xs text-muted-foreground">Accepted type values: {endpoint.types.join(", ")}</p>
            )}
            {endpoint.body && (
              <pre className="mt-3 overflow-x-auto rounded-md bg-primary/95 p-3 text-[11px] leading-relaxed text-white/85">
                {JSON.stringify(endpoint.body, null, 2)}
              </pre>
            )}
            <p className="mt-2 text-[11px] text-muted-foreground">
              Base URL: <code>{origin || "https://your-app-domain"}</code>
            </p>
          </div>
        ))}

        <div className="gc-card p-5">
          <h2 className="font-heading text-base font-semibold text-primary">Example response</h2>
          <pre className="mt-3 overflow-x-auto rounded-md bg-primary/95 p-3 text-[11px] leading-relaxed text-white/85">
{`{
  "data": [
    {
      "title": "Real Estate Development",
      "slug": "real-estate-development",
      "short_description": "…",
      "card_image": "https://media.base44.com/…"
    }
  ],
  "count": 1
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}