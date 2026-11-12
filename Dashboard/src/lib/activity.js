import { base44 } from "@/api/base44Client";

/** Writes an audit record. Never blocks the caller — logs are best effort. */
export async function logActivity({ action, entity_type, entity_title, user }) {
  try {
    await base44.entities.ActivityLog.create({
      action,
      entity_type,
      entity_title: entity_title || "",
      user_email: user?.email || "",
      user_name: user?.full_name || "",
    });
  } catch {
    /* audit log failure must not break the save the user asked for */
  }
}