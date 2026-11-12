import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import Pager from "@/components/dashboard/Pager";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";
import { usePagedList } from "@/lib/usePagedList";
import { logActivity } from "@/lib/activity";
import { formatDate } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Image } from "@/components/ui/image";
import { BookOpen, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/dashboard/blog/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Blog — Griffin CMS" }] }),
  component: BlogPage,
});

function BlogPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const { user } = Route.useRouteContext();

  const filter = {};
  if (search.trim()) filter.title = { $regex: search.trim() };
  if (status === "published") filter.published = true;
  if (status === "draft") filter.published = false;
  if (status === "featured") filter.featured = true;

  const list = usePagedList("BlogPost", { filter, sort: "-publication_date", limit: 10 });

  const togglePublish = async (post) => {
    await base44.entities.BlogPost.update(post.id, { published: !post.published });
    logActivity({ action: post.published ? "unpublished" : "published", entity_type: "Article", entity_title: post.title, user });
    toast.success(post.published ? "Article moved to draft" : "Article published");
    list.refresh();
  };

  const remove = async (post) => {
    await base44.entities.BlogPost.delete(post.id);
    logActivity({ action: "deleted", entity_type: "Article", entity_title: post.title, user });
    toast.success("Article deleted");
    list.refresh();
  };

  return (
    <div>
      <PageHeader title="Blog" description="Write, schedule and publish articles for the insights section.">
        <Button asChild size="sm">
          <Link to="/dashboard/blog/new">
            <Plus className="mr-2 h-4 w-4" /> New article
          </Link>
        </Button>
      </PageHeader>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles" className="bg-white pl-9" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-md border border-input bg-white px-3 text-sm">
          <option value="all">All articles</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
          <option value="featured">Featured</option>
        </select>
      </div>

      <div className="gc-card overflow-hidden">
        {list.loading && <div className="px-4 py-10 text-center text-sm text-muted-foreground">Loading articles…</div>}
        {!list.loading && !list.error && list.items.length === 0 && (
          <div className="p-4">
            <EmptyState icon={BookOpen} title="No articles yet" description="Publish your first insight to start the blog.">
              <Button asChild size="sm">
                <Link to="/dashboard/blog/new">Write an article</Link>
              </Button>
            </EmptyState>
          </div>
        )}
        {!list.loading && list.items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Article</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Published on</th>
                  <th className="px-4 py-3 font-semibold">Live</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {list.items.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-16 shrink-0 overflow-hidden rounded border border-border bg-muted">
                          {post.featured_image && <Image src={post.featured_image} alt="" className="h-full w-full" />}
                        </div>
                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 truncate font-medium text-primary">
                            {post.title}
                            {post.featured && <Star className="h-3.5 w-3.5 fill-gold text-gold-dark" />}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">/blog/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{post.category || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(post.publication_date)}</td>
                    <td className="px-4 py-3">
                      <Switch checked={!!post.published} onCheckedChange={() => togglePublish(post)} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button asChild size="sm" variant="ghost">
                          <Link to="/dashboard/blog/$id" params={{ id: post.id }}>
                            <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                          </Link>
                        </Button>
                        <ConfirmDelete title={`Delete “${post.title}”?`} onConfirm={() => remove(post)}>
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
        <Pager page={list.page} canPrev={list.canPrev} hasNext={list.hasNext} onPrev={list.prev} onNext={list.next} loading={list.loading} total={list.items.length} />
      </div>
    </div>
  );
}