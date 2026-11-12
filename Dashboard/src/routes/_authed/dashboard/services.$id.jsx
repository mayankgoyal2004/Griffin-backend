import { createFileRoute } from "@tanstack/react-router";
import ServiceEditor from "@/components/dashboard/editors/ServiceEditor";

export const Route = createFileRoute("/_authed/dashboard/services/$id")({
  ssr: false,
  head: () => ({ meta: [{ title: "Edit service — Griffin CMS" }] }),
  component: EditService,
});

function EditService() {
  const { id } = Route.useParams();
  const { user } = Route.useRouteContext();
  return <ServiceEditor serviceId={id} user={user} />;
}