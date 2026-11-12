import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import Pager from "@/components/dashboard/Pager";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { usePagedList } from "@/lib/usePagedList";
import { logActivity } from "@/lib/activity";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Image } from "@/components/ui/image";
import { Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/dashboard/services/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Services — Griffin CMS" }] }),
  component: ServicesPage,
});

function ServicesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const context = Route.useRouteContext();

  const filter = {};
  if (search.trim()) filter.title = { $regex: search.trim() };
  if (status === "published") filter.published = true;
  if (status === "draft") filter.published = false;
  if (status === "featured") filter.featured = true;

  const list = usePagedList("Service", { filter, sort: "display_order", limit: 10 });

  const togglePublish = async (service) => {
    await base44.entities.Service.update(service.id, { published: !service.published });
    logActivity({
      action: service.published ? "unpublished" : "published",
      entity_type: "Service",
      entity_title: service.title,
      user: context.user,
    });
    toast.success(service.published ? "Service moved to draft" : "Service published");
    list.refresh();
  };

  const remove = async (service) => {
    await base44.entities.Service.delete(service.id);
    logActivity({ action: "deleted", entity_type: "Service", entity_title: service.title, user: context.user });
    toast.success("Service deleted");
    list.refresh();
  };

  return (
    <div>
      <PageHeader title="Services" description="Create and manage every service page on the website, including its detail-page sections.">
        <Button asChild size="sm">
          <Link to="/dashboard/services/new">
            <Plus className="mr-2 h-4 w-4" /> New service
          </Link>
        </Button>
      </PageHeader>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services by title"
            className="bg-white pl-9"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 rounded-md border border-input bg-white px-3 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
          <option value="featured">Featured</option>
        </select>
      </div>

      <div className="gc-card overflow-hidden">
        {list.loading && <div className="px-4 py-10 text-center text-sm text-muted-foreground">Loading services…</div>}
        {list.error && <div className="px-4 py-10 text-center text-sm text-destructive">Could not load services. Please retry.</div>}

        {!list.loading && !list.error && list.items.length === 0 && (
          <div className="p-4">
            <EmptyState
              title="No services found"
              description="Create your first service page. Each service gets its own dynamic detail page on the website."
            >
              <Button asChild size="sm">
                <Link to="/dashboard/services/new">Add a service</Link>
              </Button>
            </EmptyState>
          </div>
        )}

        {!list.loading && list.items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Featured</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {list.items.map((service) => (
                  <tr key={service.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-16 shrink-0 overflow-hidden rounded border border-border bg-muted">
                          {service.card_image && <Image src={service.card_image} alt="" className="h-full w-full" />}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-primary">{service.title}</p>
                          <p className="truncate text-xs text-muted-foreground">/services/{service.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{service.display_order ?? 0}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Switch checked={!!service.published} onCheckedChange={() => togglePublish(service)} />
                        <StatusBadge value={service.published ? "Published" : "Draft"} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {service.featured ? <Star className="h-4 w-4 fill-gold text-gold-dark" /> : <span className="text-xs text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button asChild size="sm" variant="ghost">
                          <Link to="/dashboard/services/$id" params={{ id: service.id }}>
                            <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                          </Link>
                        </Button>
                        <ConfirmDelete
                          title={`Delete “${service.title}”?`}
                          description="The service page and its sections will be removed from the website."
                          onConfirm={() => remove(service)}
                        >
                          <Button size="sm" variant="ghost" className="text-destructive">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </ConfirmDelete>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pager
          page={list.page}
          canPrev={list.canPrev}
          hasNext={list.hasNext}
          onPrev={list.prev}
          onNext={list.next}
          loading={list.loading}
          total={list.items.length}
        />
      </div>
    </div>
  );
}