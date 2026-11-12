import { createFileRoute } from "@tanstack/react-router";
import ProjectEditor from "@/components/dashboard/editors/ProjectEditor";

export const Route = createFileRoute("/_authed/dashboard/projects/$id")({
  ssr: false,
  head: () => ({ meta: [{ title: "Edit project — Griffin CMS" }] }),
  component: EditProject,
});

function EditProject() {
  const { id } = Route.useParams();
  const { user } = Route.useRouteContext();
  return <ProjectEditor projectId={id} user={user} />;
}