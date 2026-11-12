import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/dashboard/PageHeader";
import Field from "@/components/dashboard/Field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { logActivity } from "@/lib/activity";
import { formatDate } from "@/lib/format";
import { Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/dashboard/users")({
  ssr: false,
  head: () => ({ meta: [{ title: "User management — Griffin CMS" }] }),
  component: UsersPage,
});

const ROLE_LABEL = { admin: "Administrator (full access)", user: "Editor (content only)" };

function UsersPage() {
  const { user: currentUser } = Route.useRouteContext();
  const isAdmin = currentUser?.role === "admin";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [invite, setInvite] = useState({ email: "", role: "user" });
  const [inviting, setInviting] = useState(false);

  const load = () => {
    setLoading(true);
    base44.entities.User.list()
      .then((rows) => setUsers(Array.isArray(rows) ? rows : []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const sendInvite = async () => {
    if (!invite.email.trim()) {
      toast.error("Enter an email address.");
      return;
    }
    setInviting(true);
    try {
      await base44.users.inviteUser(invite.email.trim(), invite.role);
      await logActivity({
        action: "invited",
        entity_type: "User",
        entity_title: invite.email.trim(),
        user: currentUser,
      });
      toast.success("Invitation sent");
      setOpen(false);
      setInvite({ email: "", role: "user" });
      load();
    } catch (error) {
      toast.error(error.message || "Could not send the invitation.");
    } finally {
      setInviting(false);
    }
  };

  const changeRole = async (person, role) => {
    try {
      await base44.entities.User.update(person.id, { role });
      toast.success("Role updated");
      load();
    } catch (error) {
      toast.error(error.message || "Could not change that role.");
    }
  };

  return (
    <div>
      <PageHeader title="User management" description="Administrators manage everything; editors can create and edit website content only.">
        <Button size="sm" onClick={() => setOpen(true)} disabled={!isAdmin}>
          <UserPlus className="mr-2 h-4 w-4" /> Invite user
        </Button>
      </PageHeader>

      {!isAdmin && (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Only administrators can invite users or change roles.
        </p>
      )}

      <div className="gc-card overflow-hidden">
        {loading && <div className="px-4 py-10 text-center text-sm text-muted-foreground">Loading users…</div>}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Staff member</th>
                  <th className="px-4 py-3 font-semibold">Joined</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((person) => (
                  <tr key={person.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <p className="font-medium text-primary">{person.full_name || "Pending invite"}</p>
                      <p className="text-xs text-muted-foreground">{person.email}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(person.created_date)}</td>
                    <td className="px-4 py-3">
                      {isAdmin ? (
                        <select
                          value={person.role || "user"}
                          onChange={(e) => changeRole(person, e.target.value)}
                          disabled={person.id === currentUser?.id}
                          className="h-9 rounded-md border border-input bg-white px-2 text-sm"
                        >
                          <option value="admin">Administrator</option>
                          <option value="user">Editor</option>
                        </select>
                      ) : (
                        <span className="text-muted-foreground">{ROLE_LABEL[person.role] || "Editor"}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invite a staff member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Field label="Email address" type="email" value={invite.email} onChange={(v) => setInvite((p) => ({ ...p, email: v }))} />
            <Field
              label="Role"
              type="select"
              value={invite.role}
              onChange={(v) => setInvite((p) => ({ ...p, role: v }))}
              options={[
                { value: "user", label: "Editor — content only" },
                { value: "admin", label: "Administrator — full access" },
              ]}
            />
            <p className="text-xs text-muted-foreground">
              They will receive an email invitation and can sign in with a password of their choice.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendInvite} disabled={inviting}>
              {inviting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Send invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}