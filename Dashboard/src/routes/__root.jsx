import { useEffect } from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/AuthContext";
import { useSiteSettings } from "@/lib/useSiteSettings";

export const Route = createRootRouteWithContext()({
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const settings = useSiteSettings();

  useEffect(() => {
    const faviconUrl = settings?.favicon || "/favicon.png";
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = faviconUrl;

    const companyName = settings?.company_name || settings?.companyName || "Griffin Construction";
    if (companyName) {
      document.title = `${companyName} — CMS Dashboard`;
    }
  }, [settings?.favicon, settings?.company_name, settings?.companyName]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
