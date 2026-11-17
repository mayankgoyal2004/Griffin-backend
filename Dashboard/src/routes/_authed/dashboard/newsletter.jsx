import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import Pager from "@/components/dashboard/Pager";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { usePagedList } from "@/lib/usePagedList";
import { downloadCsv, formatDateTime } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Mail, Search, Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/dashboard/newsletter")({
  ssr: false,
  head: () => ({ meta: [{ title: "Newsletter subscribers — Griffin CMS" }] }),
  component: NewsletterPage,
});

function NewsletterPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filter = {};
  if (search.trim()) {
    filter.search = search.trim();
  }
  if (status !== "all") {
    filter.status = status;
  }

  const list = usePagedList("NewsletterSubscriber", { filter, sort: "-created_date", limit: 20 });

  const exportCsv = async () => {
    try {
      const rows = await base44.entities.NewsletterSubscriber.filter(filter, { sort: "-created_date", limit: 500 });
      if (!rows.items?.length) {
        toast.error("No subscribers found to export.");
        return;
      }
      downloadCsv(`griffin-newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`, [
        ["Email", "Status", "Source", "Subscribed Date"],
        ...rows.items.map((row) => [
          row.email,
          row.status,
          row.source || "blog",
          formatDateTime(row.created_date),
        ]),
      ]);
      toast.success("Subscribers CSV exported successfully!");
    } catch (error) {
      toast.error(error.message || "Export failed.");
    }
  };

  const toggleStatus = async (subscriber) => {
    const newStatus = subscriber.status === "SUBSCRIBED" ? "UNSUBSCRIBED" : "SUBSCRIBED";
    try {
      await base44.entities.NewsletterSubscriber.update(subscriber.id, { status: newStatus });
      toast.success(newStatus === "SUBSCRIBED" ? "Subscriber reactivated" : "Subscriber marked as unsubscribed");
      list.refresh();
    } catch (error) {
      toast.error(error.message || "Could not update status.");
    }
  };

  const removeSubscriber = async (subscriber) => {
    if (!window.confirm(`Are you sure you want to remove ${subscriber.email}?`)) return;
    try {
      await base44.entities.NewsletterSubscriber.delete(subscriber.id);
      toast.success("Subscriber removed successfully.");
      list.refresh();
    } catch (error) {
      toast.error(error.message || "Could not remove subscriber.");
    }
  };

  return (
    <div>
      <PageHeader
        title="Newsletter Subscribers"
        description="All website visitors who opted in to receive newsletters, articles, and company announcements."
      >
        <Button size="sm" variant="outline" onClick={exportCsv}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </PageHeader>

      <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email address..."
            className="bg-white pl-9"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 rounded-md border border-input bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All statuses</option>
          <option value="SUBSCRIBED">Subscribed</option>
          <option value="UNSUBSCRIBED">Unsubscribed</option>
        </select>
      </div>

      <div className="gc-card overflow-hidden">
        {list.loading && (
          <div className="px-4 py-12 text-center text-sm text-muted-foreground">
            Loading subscribers…
          </div>
        )}

        {!list.loading && list.items.length === 0 && (
          <EmptyState
            icon={Mail}
            title="No subscribers found"
            description="When users sign up for the newsletter on the website, they will appear here."
          />
        )}

        {!list.loading && list.items.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-sm">
                <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Subscriber Email</th>
                    <th className="px-4 py-3 font-semibold">Source</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Date Subscribed</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {list.items.map((sub) => (
                    <tr key={sub.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium text-primary">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span>{sub.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 capitalize text-muted-foreground">
                        <span className="inline-block px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700">
                          {sub.source || "blog"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          value={sub.status === "SUBSCRIBED" ? "Subscribed" : "Unsubscribed"}
                        />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDateTime(sub.created_date)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleStatus(sub)}
                            title={sub.status === "SUBSCRIBED" ? "Unsubscribe" : "Reactivate"}
                            className="text-xs"
                          >
                            {sub.status === "SUBSCRIBED" ? (
                              <>
                                <XCircle className="mr-1 h-3.5 w-3.5 text-amber-600" /> Unsubscribe
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-1 h-3.5 w-3.5 text-emerald-600" /> Subscribe
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeSubscriber(sub)}
                            className="text-destructive hover:bg-destructive/10"
                            title="Delete subscriber"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager
              page={list.page}
              totalPages={list.totalPages}
              total={list.total}
              onPageChange={list.setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
