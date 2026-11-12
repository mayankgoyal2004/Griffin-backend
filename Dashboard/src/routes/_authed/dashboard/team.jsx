import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import Pager from "@/components/dashboard/Pager";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";
import TeamMemberDialog from "@/components/dashboard/editors/TeamMemberDialog";
import { usePagedList } from "@/lib/usePagedList";
import { logActivity } from "@/lib/activity";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Image } from "@/components/ui/image";
import { Linkedin, Pencil, Plus, Search, Star, Trash2, UserRound } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/dashboard/team")({
  ssr: false,
  head: () => ({ meta: [{ title: "Team — Griffin CMS" }] }),
  component: TeamPage,
});

function TeamPage() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { user } = Route.useRouteContext();

  const filter = {};
  if (search.trim()) filter.full_name = { $regex: search.trim() };

  const list = usePagedList("TeamMember", { filter, sort: "display_order", limit: 12 });

  const togglePublish = async (member) => {
    await base44.entities.TeamMember.update(member.id, { published: !member.published });
    logActivity({ action: member.published ? "unpublished" : "published", entity_type: "Team member", entity_title: member.full_name, user });
    toast.success(member.published ? "Moved to draft" : "Published");
    list.refresh();
  };

  const remove = async (member) => {
    await base44.entities.TeamMember.delete(member.id);
    logActivity({ action: "deleted", entity_type: "Team member", entity_title: member.full_name, user });
    toast.success("Team member removed");
    list.refresh();
  };

  return (
    <div>
      <PageHeader title="Team" description="Manage the people shown on the team page and the homepage team preview.">
        <Button
          size="sm"
          onClick={() => {
            setEditingId(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add member
        </Button>
      </PageHeader>

      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search team members" className="bg-white pl-9" />
      </div>

      {list.loading && <div className="py-10 text-center text-sm text-muted-foreground">Loading team…</div>}
      {!list.loading && list.items.length === 0 && (
        <EmptyState icon={UserRound} title="No team members yet" description="Add the people behind Griffin Construction." />
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.items.map((member) => (
          <div key={member.id} className="gc-card overflow-hidden">
            <div className="flex items-center gap-3 p-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                {member.photo ? (
                  <Image src={member.photo} alt={member.full_name} className="h-full w-full" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <UserRound className="h-6 w-6" />
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 truncate font-medium text-primary">
                  {member.full_name}
                  {member.featured && <Star className="h-3.5 w-3.5 fill-gold text-gold-dark" />}
                </p>
                <p className="truncate text-xs text-muted-foreground">{member.designation}</p>
                {member.linkedin_url && (
                  <a href={member.linkedin_url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-[11px] text-gold-dark">
                    <Linkedin className="h-3 w-3" /> LinkedIn
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Switch checked={!!member.published} onCheckedChange={() => togglePublish(member)} />
                <span className="text-[11px] text-muted-foreground">{member.published ? "Published" : "Draft"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingId(member.id);
                    setDialogOpen(true);
                  }}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <ConfirmDelete title={`Remove ${member.full_name}?`} onConfirm={() => remove(member)}>
                  <Button size="sm" variant="ghost" className="text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </ConfirmDelete>
              </div>
            </div>
          </div>
        ))}
      </div>

      {list.items.length > 0 && (
        <div className="gc-card mt-4">
          <Pager page={list.page} canPrev={list.canPrev} hasNext={list.hasNext} onPrev={list.prev} onNext={list.next} loading={list.loading} />
        </div>
      )}

      <TeamMemberDialog open={dialogOpen} onOpenChange={setDialogOpen} memberId={editingId} user={user} onSaved={list.refresh} />
    </div>
  );
}