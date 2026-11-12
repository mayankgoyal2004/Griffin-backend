import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import Field from "@/components/dashboard/Field";
import ImageField from "@/components/dashboard/ImageField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { logActivity } from "@/lib/activity";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BLANK = {
  full_name: "",
  designation: "",
  short_bio: "",
  detailed_bio: "",
  photo: "",
  linkedin_url: "",
  email: "",
  experience: "",
  skills: [],
  featured: false,
  published: false,
  display_order: 0,
};

export default function TeamMemberDialog({ open, onOpenChange, memberId, user, onSaved }) {
  const [form, setForm] = useState(BLANK);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm(BLANK);
    if (!memberId) return;
    setLoading(true);
    base44.entities.TeamMember.get(memberId)
      .then((record) => setForm({ ...BLANK, ...record }))
      .catch(() => toast.error("Could not load that team member."))
      .finally(() => setLoading(false));
  }, [open, memberId]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    if (!form.full_name.trim() || !form.designation.trim()) {
      toast.error("Name and designation are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, full_name: form.full_name.trim(), designation: form.designation.trim() };
      if (memberId) {
        await base44.entities.TeamMember.update(memberId, payload);
        await logActivity({ action: "updated", entity_type: "Team member", entity_title: payload.full_name, user });
      } else {
        await base44.entities.TeamMember.create(payload);
        await logActivity({ action: "created", entity_type: "Team member", entity_title: payload.full_name, user });
      }
      toast.success(memberId ? "Team member updated" : "Team member added");
      onOpenChange(false);
      onSaved();
    } catch (error) {
      toast.error(error.message || "Could not save this team member.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{memberId ? "Edit team member" : "Add team member"}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex h-40 items-center justify-center text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required value={form.full_name} onChange={(v) => set("full_name", v)} />
              <Field label="Designation" required value={form.designation} onChange={(v) => set("designation", v)} />
              <Field label="Experience" value={form.experience} onChange={(v) => set("experience", v)} placeholder="14 years" />
              <Field label="Email (optional)" type="email" value={form.email} onChange={(v) => set("email", v)} />
              <Field label="LinkedIn URL" value={form.linkedin_url} onChange={(v) => set("linkedin_url", v)} className="sm:col-span-2" />
            </div>
            <Field
              label="Skills"
              value={(form.skills || []).join(", ")}
              onChange={(v) => set("skills", v.split(",").map((s) => s.trim()).filter(Boolean))}
              hint="Separate skills with commas."
            />
            <Field label="Short biography" type="textarea" rows={2} value={form.short_bio} onChange={(v) => set("short_bio", v)} />
            <Field label="Detailed biography" type="textarea" rows={4} value={form.detailed_bio} onChange={(v) => set("detailed_bio", v)} />
            <ImageField label="Profile photo" value={form.photo} folder="Team" onChange={(v) => set("photo", v)} />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Display order" type="number" value={form.display_order} onChange={(v) => set("display_order", v)} />
              <Field label="Featured" type="checkbox" value={form.featured} onChange={(v) => set("featured", v)} placeholder="Show on homepage" />
              <Field label="Published" type="checkbox" value={form.published} onChange={(v) => set("published", v)} placeholder="Visible on site" />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={save} disabled={saving || loading}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}