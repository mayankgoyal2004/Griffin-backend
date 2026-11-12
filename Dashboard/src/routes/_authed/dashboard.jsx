import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { Route as AuthedRoute } from "@/routes/_authed";

export const Route = createFileRoute("/_authed/dashboard")({
  ssr: false,
  component: DashboardLayout,
});

function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { user } = AuthedRoute.useRouteContext();
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen overflow-x-clip bg-cream">
      <Sidebar open={open} onClose={() => setOpen(false)} isAdmin={isAdmin} />
      <div className="lg:pl-64">
        <Topbar onMenu={() => setOpen(true)} />
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}