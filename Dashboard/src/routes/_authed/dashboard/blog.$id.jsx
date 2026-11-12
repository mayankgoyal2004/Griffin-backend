import { createFileRoute } from "@tanstack/react-router";
import BlogEditor from "@/components/dashboard/editors/BlogEditor";

export const Route = createFileRoute("/_authed/dashboard/blog/$id")({
  ssr: false,
  head: () => ({ meta: [{ title: "Edit article — Griffin CMS" }] }),
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  const { user } = Route.useRouteContext();
  return <BlogEditor postId={id} user={user} />;
}