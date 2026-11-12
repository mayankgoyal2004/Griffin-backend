import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import Pager from "@/components/dashboard/Pager";
import StatusBadge from "@/components/dashboard/StatusBadge";
import InquiryDetail from "@/components/dashboard/InquiryDetail";
import { usePagedList } from "@/lib/usePagedList";
import { downloadCsv, formatDateTime } from "@/lib/format";
import { INQUIRY_STATUSES } from "@/lib/defaultContent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Inbox, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/dashboard/inquiries")({
  ssr: false,
  head: () => ({ meta: [{ title: "Contact inquiries — Griffin CMS" }] }),
  component: InquiriesPage,
});

function InquiriesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [active, setActive] = useState(null);
  const { user } = Route.useRouteContext();

  const filter = {};
  if (search.trim()) {
    filter.$or = [
      { full_name: { $regex: search.trim() } },
      { email: { $regex: search.trim() } },
      { subject: { $regex: search.trim() } },
    ];
  }
  if (status !== "all") filter.status = status;
  if (from || to) {
    filter.created_date = {};
    if (from) filter.created_date.$gte = `${from}T00:00:00.000Z`;
    if (to) filter.created_date.$lte = `${to}T23:59:59.999Z`;
  }

  const list = usePagedList("ContactInquiry", { filter, sort: "-created_date", limit: 12 });

  const exportCsv = async () => {
    try {
      const rows = await base44.entities.ContactInquiry.filter(filter, { sort: "-created_date", limit: 200 });
      if (!rows.items.length) {
        toast.error("Nothing to export for the current filters.");
        return;
      }
      downloadCsv(`griffin-inquiries-${new Date().toISOString().slice(0, 10)}.csv`, [
        ["Name", "Email", "Phone", "Subject", "Project type", "Message", "Status", "Assigned to", "Received"],
        ...rows.items.map((row) => [
          row.full_name,
          row.email,
          row.phone,
          row.subject,
          row.project_type,
          row.message,
          row.status,
          row.assigned_to,
          formatDateTime(row.created_date),
        ]),
      ]);
      toast.success("CSV exported");
    } catch (error) {
      toast.error(error.message || "Export failed.");
    }
  };

  return (
    <div>
      <PageHeader title="Contact inquiries" description="Every submission from the website contact form lands here.">
        <Button size="sm" variant="outline" onClick={exportCsv}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </PageHeader>

      <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, subject" className="bg-white pl-9" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-md border border-input bg-white px-3 text-sm">
          <option value="all">All statuses</option>
          {INQUIRY_STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="bg-white" aria-label="From date" />
        <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="bg-white" aria-label="To date" />
      </div>

      <div className="gc-card overflow-hidden">
        {list.loading && <div className="px-4 py-10 text-center text-sm text-muted-foreground">Loading inquiries…</div>}
        {!list.loading && list.items.length === 0 && (
          <div className="p-4">
            <EmptyState icon={Inbox} title="No inquiries match these filters" description="Try a different status, date range or search term." />
          </div>
        )}
        {!list.loading && list.items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Subject</th>
                  <th className="px-4 py-3 font-semibold">Project type</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Received</th>
                  <th className="px-4 py-3 text-right font-semibold">Open</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {list.items.map((inquiry) => (
                  <tr key={inquiry.id} className="cursor-pointer hover:bg-muted/30" onClick={() => setActive(inquiry)}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-primary">{inquiry.full_name}</p>
                      <p className="text-xs text-muted-foreground">{inquiry.email}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{inquiry.subject || "General enquiry"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{inquiry.project_type || "—"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge value={inquiry.status || "New"} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{formatDateTime(inquiry.created_date)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pager page={list.page} canPrev={list.canPrev} hasNext={list.hasNext} onPrev={list.prev} onNext={list.next} loading={list.loading} total={list.items.length} />
      </div>

      <InquiryDetail
        inquiry={active}
        open={!!active}
        onOpenChange={(open) => !open && setActive(null)}
        user={user}
        onChanged={list.refresh}
      />
    </div>
  );
}