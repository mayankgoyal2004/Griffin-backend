import { createFileRoute } from "@tanstack/react-router";
import BlogEditor from "@/components/dashboard/editors/BlogEditor";

export const Route = createFileRoute("/_authed/dashboard/blog/new")({
  ssr: false,
  head: () => ({ meta: [{ title: "New article — Griffin CMS" }] }),
  component: NewPost,
});

function NewPost() {
  const { user } = Route.useRouteContext();
  return <BlogEditor user={user} />;
}