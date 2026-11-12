import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { INQUIRY_STATUSES } from "@/lib/defaultContent";
import { formatDateTime } from "@/lib/format";
import { logActivity } from "@/lib/activity";
import { Mail, Phone, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function InquiryDetail({ inquiry, open, onOpenChange, user, onChanged }) {
  const [form, setForm] = useState(inquiry);
  const [note, setNote] = useState("");
  const [staff, setStaff] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(inquiry);
    setNote("");
  }, [inquiry]);

  useEffect(() => {
    base44.entities.User.list()
      .then((rows) => setStaff(Array.isArray(rows) ? rows : []))
      .catch(() => setStaff([]));
  }, []);

  if (!form) return null;

  const update = async (patch, action = "updated") => {
    setSaving(true);
    try {
      await base44.entities.ContactInquiry.update(form.id, patch);
      setForm((prev) => ({ ...prev, ...patch }));
      await logActivity({ action, entity_type: "Inquiry", entity_title: form.full_name, user });
      toast.success("Inquiry updated");
      onChanged();
    } catch (error) {
      toast.error(error.message || "Could not update the inquiry.");
    } finally {
      setSaving(false);
    }
  };

  const addNote = async () => {
    if (!note.trim()) return;
    const notes = [
      ...(form.internal_notes || []),
      { note: note.trim(), author: user?.full_name || user?.email || "Staff", date: new Date().toISOString() },
    ];
    await update({ internal_notes: notes });
    setNote("");
  };

  const remove = async () => {
    await base44.entities.ContactInquiry.delete(form.id);
    await logActivity({ action: "deleted", entity_type: "Inquiry", entity_title: form.full_name, user });
    toast.success("Inquiry deleted");
    onOpenChange(false);
    onChanged();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-center gap-2">
            {form.full_name} <StatusBadge value={form.status || "New"} />
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Email</p>
            <a href={`mailto:${form.email}`} className="flex items-center gap-1.5 font-medium text-primary hover:text-gold-dark">
              <Mail className="h-3.5 w-3.5" /> {form.email}
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Phone</p>
            {form.phone ? (
              <a href={`tel:${form.phone}`} className="flex items-center gap-1.5 font-medium text-primary hover:text-gold-dark">
                <Phone className="h-3.5 w-3.5" /> {form.phone}
              </a>
            ) : (
              <p className="text-muted-foreground">Not provided</p>
            )}
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Subject</p>
            <p className="font-medium text-primary">{form.subject || "General enquiry"}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Project type</p>
            <p className="font-medium text-primary">{form.project_type || "—"}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Received</p>
            <p className="font-medium text-primary">{formatDateTime(form.created_date)}</p>
          </div>
        </div>

        <div>
          <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Message</p>
          <p className="whitespace-pre-wrap rounded-lg border border-border bg-white p-3 text-sm leading-relaxed">{form.message}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Status</Label>
            <select
              value={form.status || "New"}
              onChange={(e) => update({ status: e.target.value })}
              disabled={saving}
              className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
            >
              {INQUIRY_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Assigned to</Label>
            <select
              value={form.assigned_to || ""}
              onChange={(e) => update({ assigned_to: e.target.value })}
              disabled={saving}
              className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
            >
              <option value="">Unassigned</option>
              {staff.map((person) => (
                <option key={person.id} value={person.email}>
                  {person.full_name || person.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Internal notes</p>
          <ul className="space-y-2">
            {(form.internal_notes || []).length === 0 && <li className="text-xs text-muted-foreground">No notes yet.</li>}
            {(form.internal_notes || []).map((entry, index) => (
              <li key={index} className="rounded-md border border-border bg-white p-2.5 text-sm">
                <p className="text-foreground/85">{entry.note}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {entry.author} · {formatDateTime(entry.date)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-end gap-2">
            <Textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add an internal note…" className="bg-white" />
            <Button size="sm" onClick={addNote} disabled={!note.trim() || saving}>
              Add
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <ConfirmDelete title={`Delete inquiry from ${form.full_name}?`} onConfirm={remove}>
            <Button variant="ghost" size="sm" className="text-destructive">
              <Trash2 className="mr-1.5 h-4 w-4" /> Delete
            </Button>
          </ConfirmDelete>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}