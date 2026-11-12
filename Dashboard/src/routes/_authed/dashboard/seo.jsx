import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, ExternalLink, Pencil } from "lucide-react";

export const Route = createFileRoute("/_authed/dashboard/seo")({
  ssr: false,
  head: () => ({ meta: [{ title: "SEO settings — Griffin CMS" }] }),
  component: SeoPage,
});

function SeoPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
    (async () => {
      const [pages, services, projects, posts] = await Promise.all([
        base44.entities.WebsitePage.list("display_order", 100),
        base44.entities.Service.list("display_order", 100),
        base44.entities.Project.list("display_order", 100),
        base44.entities.BlogPost.list("-publication_date", 100),
      ]);
      setRows([
        ...pages.map((row) => ({
          id: row.id,
          kind: "Page",
          title: row.title,
          path: row.slug === "home" ? "/" : `/${row.slug}`,
          seoTitle: row.seo_title,
          description: row.seo_description,
          to: `/dashboard/pages/${row.slug}`,
          published: row.published,
        })),
        ...services.map((row) => ({
          id: row.id,
          kind: "Service",
          title: row.title,
          path: `/services/${row.slug}`,
          seoTitle: row.seo_title,
          description: row.seo_description,
          to: `/dashboard/services/${row.id}`,
          published: row.published,
        })),
        ...projects.map((row) => ({
          id: row.id,
          kind: "Project",
          title: row.name,
          path: `/projects/${row.slug}`,
          seoTitle: row.seo_title,
          description: row.seo_description,
          to: `/dashboard/projects/${row.id}`,
          published: row.published,
        })),
        ...posts.map((row) => ({
          id: row.id,
          kind: "Article",
          title: row.title,
          path: `/blog/${row.slug}`,
          seoTitle: row.seo_title,
          description: row.seo_description,
          to: `/dashboard/blog/${row.id}`,
          published: row.published,
        })),
      ]);
      setLoading(false);
    })();
  }, []);

  const missing = rows.filter((row) => !row.seoTitle || !row.description).length;

  return (
    <div>
      <PageHeader title="SEO settings" description="Metadata for every page, service, project and article. Sitemap and robots.txt are generated from published content.">
        <Button asChild size="sm" variant="outline">
          <a href={`${origin}/api/sitemap`} target="_blank" rel="noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> Sitemap
          </a>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href={`${origin}/api/robots`} target="_blank" rel="noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> robots.txt
          </a>
        </Button>
      </PageHeader>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="gc-card p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Indexable records</p>
          <p className="mt-1 font-heading text-2xl font-semibold text-primary">{rows.length}</p>
        </div>
        <div className="gc-card p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Missing metadata</p>
          <p className="mt-1 font-heading text-2xl font-semibold text-primary">{missing}</p>
        </div>
        <div className="gc-card p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Published only in sitemap</p>
          <p className="mt-1 font-heading text-2xl font-semibold text-primary">{rows.filter((r) => r.published).length}</p>
        </div>
      </div>

      <div className="gc-card overflow-hidden">
        {loading && <div className="px-4 py-10 text-center text-sm text-muted-foreground">Loading metadata…</div>}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Page</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">SEO title</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 text-right font-semibold">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((row) => (
                  <tr key={`${row.kind}-${row.id}`} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <p className="font-medium text-primary">{row.title}</p>
                      <p className="text-xs text-muted-foreground">{row.path}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{row.kind}</td>
                    <td className="max-w-[220px] px-4 py-3">
                      {row.seoTitle ? (
                        <span className="text-foreground/80">{row.seoTitle}</span>
                      ) : (
                        <Badge variant="outline" className="gap-1 border-amber-300 text-amber-700">
                          <AlertTriangle className="h-3 w-3" /> Missing
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {row.description ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Set
                        </span>
                      ) : (
                        <span className="text-xs text-amber-700">Not set</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button asChild size="sm" variant="ghost">
                        <Link to={row.to}>
                          <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                        </Link>
                      </Button>
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