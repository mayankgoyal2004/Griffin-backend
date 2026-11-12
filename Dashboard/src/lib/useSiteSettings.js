import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { SITE_DEFAULTS } from "@/lib/defaultContent";

// The settings record is global, so it is cached for the session instead of
// being re-requested on every route change.
let cachedSettings = null;
let inflight = null;

function loadSettings() {
  if (cachedSettings) return Promise.resolve(cachedSettings);
  if (!inflight) {
    inflight = base44.entities.SiteSettings.list()
      .then((rows) => {
        cachedSettings = Array.isArray(rows) && rows.length ? rows[0] : null;
        return cachedSettings;
      })
      .catch(() => null)
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export function invalidateSiteSettings() {
  cachedSettings = null;
}

/** Loads the single global settings record, falling back to brand defaults. */
export function useSiteSettings() {
  const [settings, setSettings] = useState(cachedSettings ? { ...SITE_DEFAULTS, ...cachedSettings } : SITE_DEFAULTS);

  useEffect(() => {
    let active = true;
    loadSettings().then((record) => {
      if (active && record) setSettings({ ...SITE_DEFAULTS, ...record });
    });
    return () => {
      active = false;
    };
  }, []);

  return settings;
}