import { createFileRoute } from "@tanstack/react-router";
import ServiceEditor from "@/components/dashboard/editors/ServiceEditor";

export const Route = createFileRoute("/_authed/dashboard/services/new")({
  ssr: false,
  head: () => ({ meta: [{ title: "New service — Griffin CMS" }] }),
  component: NewService,
});

function NewService() {
  const { user } = Route.useRouteContext();
  return <ServiceEditor user={user} />;
}