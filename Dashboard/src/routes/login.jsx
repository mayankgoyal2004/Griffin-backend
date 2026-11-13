import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "@/components/auth/LoginPage";
import { base44 } from "@/api/base44Client";

export const Route = createFileRoute("/login")({
  ssr: false,
  beforeLoad: () => {
    if (base44.auth.hasToken()) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: LoginPage,
});
