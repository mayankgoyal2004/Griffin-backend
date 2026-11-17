import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/dashboard/PageHeader";
import Field from "@/components/dashboard/Field";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/AuthContext";
import {
  Loader2,
  ShieldCheck,
  Save,
  KeyRound,
  User as UserIcon,
  Phone,
  Mail,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/dashboard/profile")({
  ssr: false,
  head: () => ({ meta: [{ title: "My profile — Griffin CMS" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, refresh } = useAuth();

  // Profile state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || user.full_name || "");
      setPhone(user.phone || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const displayName =
    fullName || user?.fullName || user?.full_name || user?.email || "Admin";
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    if (!fullName.trim()) {
      toast.error("Full name cannot be empty.");
      return;
    }

    setSavingProfile(true);
    try {
      await base44.auth.updateMe({
        fullName: fullName.trim(),
        full_name: fullName.trim(),
        phone: phone.trim(),
        avatar: avatar.trim(),
      });
      await refresh();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Could not update your profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    if (e) e.preventDefault();
    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setSavingPassword(true);
    try {
      await base44.auth.updateMe({
        currentPassword,
        newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to change password.");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My profile"
        description="Manage your personal account credentials, contact information, and security settings."
      />

      {/* Profile Overview Card */}
      <div className="gc-card p-6 flex flex-col sm:flex-row items-center gap-6">
        <Avatar className="h-24 w-24 border-2 border-primary/20 shadow-sm">
          {avatar && (
            <AvatarImage
              src={avatar}
              alt={displayName}
              className="object-cover"
            />
          )}
          <AvatarFallback className="bg-primary text-xl font-bold text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="font-heading text-2xl font-bold text-primary">
              {displayName}
            </h2>
            <span className="inline-flex items-center rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold-dark border border-gold/30">
              {user?.role === "admin" || user?.role === "ADMIN"
                ? "Administrator"
                : "Editor"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
            <Mail className="h-3.5 w-3.5" /> {user?.email}
          </p>
          {phone && (
            <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
              <Phone className="h-3.5 w-3.5" /> {phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Account Details Form */}
        <form onSubmit={handleSaveProfile} className="gc-card space-y-4 p-6">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <UserIcon className="h-5 w-5 text-gold" />
            <h2 className="font-heading text-lg font-semibold text-primary">
              Account details
            </h2>
          </div>

          <Field
            label="Full name"
            value={fullName}
            onChange={setFullName}
            placeholder="e.g. Admin"
            required
          />

          <Field
            label="Phone number"
            value={phone}
            onChange={setPhone}
            placeholder="+91 98140 00000"
          />

          <Field
            label="Avatar image URL"
            value={avatar}
            onChange={setAvatar}
            placeholder="https://images.unsplash.com/..."
          />

          <Field
            label="Email address"
            value={user?.email || ""}
            onChange={() => {}}
            disabled
            hint="Your login email cannot be modified directly."
          />

          <Field
            label="System role"
            value={
              user?.role === "admin" || user?.role === "ADMIN"
                ? "Administrator (Full access)"
                : "Editor (Content manager)"
            }
            onChange={() => {}}
            disabled
          />

          <Button type="submit" disabled={savingProfile} className="mt-2">
            {savingProfile ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                changes...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save profile changes
              </>
            )}
          </Button>
        </form>

        {/* Change Password Form */}
        <div className="space-y-6">
          <form
            onSubmit={handleUpdatePassword}
            className="gc-card space-y-4 p-6"
          >
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <KeyRound className="h-5 w-5 text-gold" />
              <h2 className="font-heading text-lg font-semibold text-primary">
                Change password
              </h2>
            </div>

            <p className="text-xs text-muted-foreground">
              Enter your current password followed by your new password to
              update your login credentials.
            </p>

            <Field
              label="Current password"
              type="password"
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder="••••••••••••"
            />

            <Field
              label="New password"
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Minimum 6 characters"
            />

            <Field
              label="Confirm new password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Re-enter new password"
            />

            <Button
              type="submit"
              variant="secondary"
              disabled={savingPassword || !newPassword}
            >
              {savingPassword ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating
                  password...
                </>
              ) : (
                <>
                  <KeyRound className="mr-2 h-4 w-4" /> Update password
                </>
              )}
            </Button>
          </form>

          {/* Security & MFA Card */}
          <div className="gc-card space-y-3 p-6">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <ShieldCheck className="h-5 w-5 text-gold" />
              <h2 className="font-heading text-lg font-semibold text-primary">
                Security & Protection
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Enhance account security with Two-Factor Authentication (TOTP
              authenticator app or email codes).
            </p>
            <div className="pt-1">
              <Button asChild variant="outline" size="sm">
                <Link to="/mfa">
                  <ShieldCheck className="mr-2 h-4 w-4 text-emerald-600" />{" "}
                  Configure 2FA Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
