import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { ExternalLink, Pencil } from "lucide-react";

export const Route = createFileRoute("/_authed/dashboard/pages/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Website pages — Griffin CMS" }] }),
  component: PagesPage,
});

const PAGE_ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  projects: "/projects",
  team: "/team",
  blog: "/blog",
  contact: "/contact",
  "privacy-policy": "/privacy-policy",
  terms: "/terms",
};

function PagesPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.WebsitePage.list("display_order", 100)
      .then(setPages)
      .catch(() => setPages([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Website pages" description="Each public page has its own editable content record with independent sections." />

      <div className="gc-card overflow-hidden">
        {loading && <div className="px-4 py-10 text-center text-sm text-muted-foreground">Loading pages…</div>}
        {!loading && pages.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-muted-foreground">No page records yet.</div>
        )}
        {!loading && pages.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Page</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Updated</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <p className="font-medium text-primary">{page.title}</p>
                      <p className="text-xs text-muted-foreground">{PAGE_ROUTES[page.slug] || `/${page.slug}`}</p>
                    </td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">{page.page_type || "—"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge value={page.published ? "Published" : "Draft"} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(page.updated_date)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button asChild size="sm" variant="ghost">
                          <Link to="/dashboard/pages/$slug" params={{ slug: page.slug }}>
                            <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="ghost">
                          <Link to={PAGE_ROUTES[page.slug] || "/"}>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}