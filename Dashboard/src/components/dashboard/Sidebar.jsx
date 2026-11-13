import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/AuthContext";
import { Image } from "@/components/ui/image";
import { GRIFFIN_EMBLEM } from "@/lib/defaultContent";
import {
  BookOpen,
  Building2,
  FileText,
  Gauge,
  Image as ImageIcon,
  Inbox,
  LayoutTemplate,
  LogOut,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

const GROUPS = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", to: "/dashboard", icon: Gauge }],
  },
  {
    label: "Website Content",
    items: [
      { label: "Home Page", to: "/dashboard/pages/home", icon: LayoutTemplate },
      { label: "About Page", to: "/dashboard/pages/about", icon: FileText },
      { label: "Services", to: "/dashboard/services", icon: Building2 },
      { label: "Projects", to: "/dashboard/projects", icon: Building2 },
      { label: "Team", to: "/dashboard/team", icon: Users },
      { label: "Blog", to: "/dashboard/blog", icon: BookOpen },
      { label: "Contact Page", to: "/dashboard/pages/contact", icon: FileText },
      { label: "Privacy Policy", to: "/dashboard/pages/privacy-policy", icon: ShieldCheck },
      { label: "Terms & Conditions", to: "/dashboard/pages/terms", icon: ShieldCheck },
    ],
  },
  {
    label: "Communication",
    items: [{ label: "Contact Inquiries", to: "/dashboard/inquiries", icon: Inbox }],
  },
  {
    label: "Assets",
    items: [{ label: "Media Library", to: "/dashboard/media", icon: ImageIcon }],
  },
  {
    label: "Configuration",
    items: [
      { label: "SEO Settings", to: "/dashboard/seo", icon: Search },
      { label: "Website Settings", to: "/dashboard/settings", icon: Settings },
      { label: "User Management", to: "/dashboard/users", icon: Users, adminOnly: true },
      { label: "Activity Logs", to: "/dashboard/activity", icon: BookOpen },
    ],
  },
];

export default function Sidebar({ open, onClose, isAdmin }) {
  const { logout } = useAuth();
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-navy/50 lg:hidden" onClick={onClose} aria-hidden="true" />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-primary text-primary-foreground transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <Image src={GRIFFIN_EMBLEM} alt="" className="h-8 w-8 rounded" />
            <span className="leading-tight">
              <span className="block font-heading text-[15px] font-semibold">Griffin CMS</span>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-white/45">Construction</span>
            </span>
          </Link>
          <button type="button" onClick={onClose} className="text-white/60 hover:text-white lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {GROUPS.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">{group.label}</p>
              {group.items
                .filter((item) => !item.adminOnly || isAdmin)
                .map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    activeProps={{ className: "bg-accent text-accent-foreground font-semibold" }}
                    inactiveProps={{ className: "text-white/70 hover:bg-white/5 hover:text-white" }}
                    className="mb-0.5 flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] transition-colors"
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                ))}
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3 space-y-1">
          <Link
            to="/dashboard/api-docs"
            onClick={onClose}
            className="block rounded-md px-3 py-2 text-[13px] text-white/70 hover:bg-white/5 hover:text-white"
          >
            API &amp; Integration
          </Link>
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="block rounded-md border border-white/15 px-3 py-2 text-center text-[13px] text-white/80 hover:border-accent hover:text-accent transition-colors"
          >
            View website
          </a>
          <button
            type="button"
            onClick={async () => {
              onClose?.();
              await logout();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-300 px-3 py-2 text-[13px] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}