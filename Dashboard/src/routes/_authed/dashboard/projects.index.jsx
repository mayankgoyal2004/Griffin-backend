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
import { PROJECT_CATEGORIES } from "@/lib/defaultContent";
import { Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/dashboard/projects/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Projects — Griffin CMS" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const context = Route.useRouteContext();

  const filter = {};
  if (search.trim()) filter.name = { $regex: search.trim() };
  if (category !== "all") filter.category = category;
  if (status === "published") filter.published = true;
  if (status === "draft") filter.published = false;

  const list = usePagedList("Project", { filter, sort: "display_order", limit: 10 });

  const togglePublish = async (project) => {
    await base44.entities.Project.update(project.id, { published: !project.published });
    logActivity({
      action: project.published ? "unpublished" : "published",
      entity_type: "Project",
      entity_title: project.name,
      user: context.user,
    });
    toast.success(project.published ? "Project moved to draft" : "Project published");
    list.refresh();
  };

  const remove = async (project) => {
    await base44.entities.Project.delete(project.id);
    logActivity({ action: "deleted", entity_type: "Project", entity_title: project.name, user: context.user });
    toast.success("Project deleted");
    list.refresh();
  };

  return (
    <div>
      <PageHeader title="Projects" description="Portfolio records that power the projects listing, category filters and detail pages.">
        <Button asChild size="sm">
          <Link to="/dashboard/projects/new">
            <Plus className="mr-2 h-4 w-4" /> New project
          </Link>
        </Button>
      </PageHeader>

      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        <div className="relative sm:col-span-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects" className="bg-white pl-9" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 rounded-md border border-input bg-white px-3 text-sm">
          <option value="all">All categories</option>
          {PROJECT_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-md border border-input bg-white px-3 text-sm">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      <div className="gc-card overflow-hidden">
        {list.loading && <div className="px-4 py-10 text-center text-sm text-muted-foreground">Loading projects…</div>}
        {list.error && <div className="px-4 py-10 text-center text-sm text-destructive">Could not load projects.</div>}
        {!list.loading && !list.error && list.items.length === 0 && (
          <div className="p-4">
            <EmptyState title="No projects found" description="Add your first project to build the portfolio.">
              <Button asChild size="sm">
                <Link to="/dashboard/projects/new">Add a project</Link>
              </Button>
            </EmptyState>
          </div>
        )}
        {!list.loading && list.items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Project</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Published</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {list.items.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-16 shrink-0 overflow-hidden rounded border border-border bg-muted">
                          {project.cover_image && <Image src={project.cover_image} alt="" className="h-full w-full" />}
                        </div>
                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 truncate font-medium text-primary">
                            {project.name}
                            {project.featured && <Star className="h-3.5 w-3.5 fill-gold text-gold-dark" />}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">{project.location || `/projects/${project.slug}`}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{project.category || "—"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge value={project.status || "Planning"} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Switch checked={!!project.published} onCheckedChange={() => togglePublish(project)} />
                        <span className="text-xs text-muted-foreground">{project.published ? "Live" : "Draft"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button asChild size="sm" variant="ghost">
                          <Link to="/dashboard/projects/$id" params={{ id: project.id }}>
                            <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                          </Link>
                        </Button>
                        <ConfirmDelete
                          title={`Delete “${project.name}”?`}
                          description="The project and its gallery will be removed from the website."
                          onConfirm={() => remove(project)}
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