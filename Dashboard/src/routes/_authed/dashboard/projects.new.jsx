import { createFileRoute } from "@tanstack/react-router";
import ProjectEditor from "@/components/dashboard/editors/ProjectEditor";

export const Route = createFileRoute("/_authed/dashboard/projects/new")({
  ssr: false,
  head: () => ({ meta: [{ title: "New project — Griffin CMS" }] }),
  component: NewProject,
});

function NewProject() {
  const { user } = Route.useRouteContext();
  return <ProjectEditor user={user} />;
}