import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/dashboard/PageHeader";
import Field from "@/components/dashboard/Field";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { Loader2, ShieldCheck, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/dashboard/profile")({
  ssr: false,
  head: () => ({ meta: [{ title: "My profile — Griffin CMS" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, refresh } = useAuth();
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (user?.full_name) setFullName(user.full_name);
  }, [user]);

  const save = async () => {
    setSaving(true);
    try {
      await base44.auth.updateMe({ full_name: fullName.trim() });
      await refresh();
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.message || "Could not update your profile.");
    } finally {
      setSaving(false);
    }
  };

  const sendReset = async () => {
    setSending(true);
    try {
      await base44.auth.resetPasswordRequest(user.email);
      toast.success("Password reset link sent to your email");
    } catch {
      toast.success("If that account exists, a reset link is on its way.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHeader title="My profile" description="Your account details and sign-in security." />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="gc-card space-y-4 p-5">
          <h2 className="font-heading text-lg font-semibold text-primary">Account details</h2>
          <Field label="Full name" value={fullName} onChange={setFullName} />
          <Field label="Email address" value={user?.email || ""} onChange={() => {}} disabled />
          <Field label="Role" value={user?.role === "admin" ? "Administrator" : "Editor"} onChange={() => {}} disabled />
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Save changes
          </Button>
        </div>

        <div className="gc-card space-y-4 p-5">
          <h2 className="font-heading text-lg font-semibold text-primary">Security</h2>
          <p className="text-sm text-muted-foreground">
            Change your password by email, or add a second factor to protect the dashboard.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={sendReset} disabled={sending}>
              {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Send password reset link
            </Button>
            <Button asChild variant="outline">
              <Link to="/mfa">
                <ShieldCheck className="mr-2 h-4 w-4" /> Two-factor authentication
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}