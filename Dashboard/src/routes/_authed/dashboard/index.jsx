import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate, formatDateTime } from "@/lib/format";
import {
  BookOpen,
  Building2,
  Inbox,
  Layers,
  Loader2,
  MailWarning,
  Plus,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/_authed/dashboard/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Dashboard — Griffin CMS" }] }),
  component: DashboardOverview,
});

const DONUT_COLORS = ["#0C1F38", "#E9A126", "#1CA3C4", "#8B6FB0", "#C98216"];

function monthKey(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function lastMonths(count) {
  const months = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
      label: date.toLocaleDateString("en-GB", { month: "short" }),
    });
  }
  return months;
}

function DashboardOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      const [
        pages,
        servicesPublished,
        servicesDraft,
        projects,
        team,
        blogPublished,
        blogDraft,
        inquiriesNew,
        inquiriesPending,
        recentProjects,
        recentServices,
        recentPosts,
        recentInquiries,
        allInquiries,
        allPosts,
        projectAgg,
        recentLogs,
      ] = await Promise.all([
        base44.entities.WebsitePage.count(),
        base44.entities.Service.count({ published: true }),
        base44.entities.Service.count({ published: false }),
        base44.entities.Project.count(),
        base44.entities.TeamMember.count(),
        base44.entities.BlogPost.count({ published: true }),
        base44.entities.BlogPost.count({ published: false }),
        base44.entities.ContactInquiry.count({ status: "New" }),
        base44.entities.ContactInquiry.count({ status: { $in: ["New", "Contacted", "In Progress"] } }),
        base44.entities.Project.list("-updated_date", 4),
        base44.entities.Service.list("-updated_date", 4),
        base44.entities.BlogPost.list("-updated_date", 4),
        base44.entities.ContactInquiry.list("-created_date", 4),
        base44.entities.ContactInquiry.list("-created_date", 300),
        base44.entities.BlogPost.list("-created_date", 200),
        base44.entities.Project.aggregate({ query: {}, groupBy: "category" }),
        base44.entities.ActivityLog.list("-created_date", 6),
      ]);

      if (!active) return;

      const months = lastMonths(6);
      const inquiryTrend = months.map((month) => ({
        month: month.label,
        inquiries: allInquiries.filter((row) => monthKey(row.created_date) === month.key).length,
      }));
      const blogTrend = months.map((month) => ({
        month: month.label,
        articles: allPosts.filter((row) => monthKey(row.publication_date || row.created_date) === month.key).length,
      }));
      const categories = (projectAgg?.rows || []).map((row) => ({
        name: row.category || row._id || row.key || "Uncategorised",
        value: row.count || 0,
      }));

      setData({
        pages,
        servicesPublished,
        servicesDraft,
        projects,
        team,
        blogPublished,
        blogDraft,
        inquiriesNew,
        inquiriesPending,
        recentProjects,
        recentServices,
        recentPosts,
        recentInquiries,
        inquiryTrend,
        blogTrend,
        categories,
        recentLogs,
        statusMix: ["New", "Contacted", "In Progress", "Converted", "Closed"].map((status) => ({
          status,
          count: allInquiries.filter((row) => (row.status || "New") === status).length,
        })),
      });
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading live statistics…
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Dashboard" description="Live overview of the Griffin Construction website content and client enquiries.">
        <Button asChild size="sm" variant="outline">
          <Link to="/">
            <Layers className="mr-2 h-4 w-4" /> View website
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link to="/dashboard/projects/new">
            <Plus className="mr-2 h-4 w-4" /> New project
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Website pages" value={data.pages} hint="Managed page records" icon={Layers} />
        <StatCard label="Published services" value={data.servicesPublished} hint={`${data.servicesDraft} in draft`} icon={Building2} tone="gold" />
        <StatCard label="Projects" value={data.projects} hint="All categories" icon={Building2} />
        <StatCard label="Team members" value={data.team} hint="Published and draft" icon={Users} />
        <StatCard label="Published blogs" value={data.blogPublished} hint={`${data.blogDraft} in draft`} icon={BookOpen} tone="gold" />
        <StatCard label="New inquiries" value={data.inquiriesNew} hint="Awaiting first contact" icon={Inbox} tone="gold" />
        <StatCard label="Pending inquiries" value={data.inquiriesPending} hint="New, contacted or in progress" icon={MailWarning} />
        <StatCard label="Draft content" value={data.servicesDraft + data.blogDraft} hint="Services and articles not published" icon={BookOpen} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="gc-card p-5 lg:col-span-2">
          <h2 className="font-heading text-base font-semibold text-primary">Enquiry trend</h2>
          <p className="text-xs text-muted-foreground">Contact form submissions over the last six months</p>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.inquiryTrend} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E2D9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#758195" }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#758195" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#E7E2D9" }} />
                <Bar dataKey="inquiries" fill="#0C1F38" radius={[4, 4, 0, 0]} maxBarSize={44} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="gc-card p-5">
          <h2 className="font-heading text-base font-semibold text-primary">Project categories</h2>
          <p className="text-xs text-muted-foreground">Distribution across the portfolio</p>
          <div className="mt-2 h-60">
            {data.categories.length === 0 ? (
              <p className="pt-16 text-center text-xs text-muted-foreground">No projects recorded yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.categories} dataKey="value" nameKey="name" innerRadius={44} outerRadius={72} paddingAngle={2}>
                    {data.categories.map((entry, index) => (
                      <Cell key={entry.name} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#E7E2D9" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="gc-card p-5">
          <h2 className="font-heading text-base font-semibold text-primary">Blog publishing activity</h2>
          <div className="mt-4 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.blogTrend} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E2D9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#758195" }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#758195" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#E7E2D9" }} />
                <Bar dataKey="articles" fill="#E9A126" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="gc-card p-5">
          <h2 className="font-heading text-base font-semibold text-primary">Inquiry pipeline</h2>
          <ul className="mt-3 space-y-2.5">
            {data.statusMix.map((row) => (
              <li key={row.status} className="flex items-center justify-between text-sm">
                <StatusBadge value={row.status} />
                <span className="font-medium text-primary">{row.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="gc-card p-5">
          <h2 className="font-heading text-base font-semibold text-primary">Quick actions</h2>
          <div className="mt-3 grid gap-2">
            <Button asChild variant="outline" size="sm" className="justify-start">
              <Link to="/dashboard/services/new">Add new service</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="justify-start">
              <Link to="/dashboard/projects/new">Add new project</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="justify-start">
              <Link to="/dashboard/blog/new">Write new article</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="justify-start">
              <Link to="/dashboard/team">Add team member</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="justify-start">
              <Link to="/dashboard/inquiries">View contact inquiries</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <RecentList
          title="Recently updated projects"
          items={data.recentProjects.map((row) => ({ id: row.id, label: row.name, meta: row.category, to: `/dashboard/projects/${row.id}` }))}
          emptyText="No projects yet."
        />
        <RecentList
          title="Recently updated services"
          items={data.recentServices.map((row) => ({ id: row.id, label: row.title, meta: row.published ? "Published" : "Draft", to: `/dashboard/services/${row.id}` }))}
          emptyText="No services yet."
        />
        <RecentList
          title="Latest blog posts"
          items={data.recentPosts.map((row) => ({ id: row.id, label: row.title, meta: formatDate(row.publication_date), to: `/dashboard/blog/${row.id}` }))}
          emptyText="No articles yet."
        />
        <RecentList
          title="Latest contact inquiries"
          items={data.recentInquiries.map((row) => ({
            id: row.id,
            label: row.full_name,
            meta: `${row.subject || "General"} · ${formatDateTime(row.created_date)}`,
            to: "/dashboard/inquiries",
          }))}
          emptyText="No inquiries yet."
        />
      </div>

      <div className="gc-card mt-4 p-5">
        <h2 className="font-heading text-base font-semibold text-primary">Recent admin activity</h2>
        <ul className="mt-3 divide-y divide-border text-sm">
          {data.recentLogs.length === 0 && <li className="py-3 text-xs text-muted-foreground">No activity recorded yet.</li>}
          {data.recentLogs.map((log) => (
            <li key={log.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
              <span className="text-foreground/85">
                <span className="font-medium text-primary">{log.user_name || log.user_email || "Staff"}</span> {log.action}{" "}
                {log.entity_type.toLowerCase()}
                {log.entity_title ? ` “${log.entity_title}”` : ""}
              </span>
              <span className="text-xs text-muted-foreground">{formatDateTime(log.created_date)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RecentList({ title, items, emptyText }) {
  return (
    <div className="gc-card p-5">
      <h2 className="font-heading text-base font-semibold text-primary">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-xs text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="mt-3 divide-y divide-border">
          {items.map((item) => (
            <li key={item.id}>
              <Link to={item.to} className="flex items-center justify-between gap-3 py-2.5 text-sm hover:text-gold-dark">
                <span className="truncate font-medium text-foreground/90">{item.label}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{item.meta}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}