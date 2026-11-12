import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "@/components/dashboard/PageHeader";
import Pager from "@/components/dashboard/Pager";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { usePagedList } from "@/lib/usePagedList";
import { formatDateTime } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_authed/dashboard/activity")({
  ssr: false,
  head: () => ({ meta: [{ title: "Activity logs — Griffin CMS" }] }),
  component: ActivityPage,
});

function ActivityPage() {
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("all");

  const filter = {};
  if (search.trim()) filter.entity_title = { $regex: search.trim() };
  if (action !== "all") filter.action = action;

  const list = usePagedList("ActivityLog", { filter, sort: "-created_date", limit: 20 });

  return (
    <div>
      <PageHeader title="Activity logs" description="An audit trail of content changes made from the dashboard." />

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by record name" className="bg-white pl-9" />
        </div>
        <select value={action} onChange={(e) => setAction(e.target.value)} className="h-10 rounded-md border border-input bg-white px-3 text-sm">
          <option value="all">All actions</option>
          <option value="created">Created</option>
          <option value="updated">Updated</option>
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
          <option value="deleted">Deleted</option>
          <option value="invited">Invited</option>
        </select>
      </div>

      <div className="gc-card overflow-hidden">
        {list.loading && <div className="px-4 py-10 text-center text-sm text-muted-foreground">Loading activity…</div>}
        {!list.loading && list.items.length === 0 && <div className="px-4 py-10 text-center text-sm text-muted-foreground">No activity recorded yet.</div>}
        {list.items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">When</th>
                  <th className="px-4 py-3 font-semibold">Staff</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                  <th className="px-4 py-3 font-semibold">Record</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {list.items.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-xs text-muted-foreground">{formatDateTime(log.created_date)}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-primary">{log.user_name || "Staff"}</p>
                      <p className="text-xs text-muted-foreground">{log.user_email}</p>
                    </td>
                    <td className="px-4 py-3 capitalize">
                      <StatusBadge value={log.action} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground">{log.entity_type}:</span>{" "}
                      <span className="text-foreground/85">{log.entity_title || "—"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pager page={list.page} canPrev={list.canPrev} hasNext={list.hasNext} onPrev={list.prev} onNext={list.next} loading={list.loading} />
      </div>
    </div>
  );
}