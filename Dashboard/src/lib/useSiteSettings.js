import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { SITE_DEFAULTS } from "@/lib/defaultContent";

// The settings record is global, cached with live reactivity for the session
let cachedSettings = null;
let inflight = null;
const listeners = new Set();

function notifyListeners(data) {
  listeners.forEach((listener) => {
    try {
      listener(data);
    } catch {
      // ignore
    }
  });
}

export function loadSettings(force = false) {
  if (cachedSettings && !force) return Promise.resolve(cachedSettings);
  if (!inflight || force) {
    inflight = base44.entities.SiteSettings.list()
      .then((rows) => {
        cachedSettings = Array.isArray(rows) && rows.length ? rows[0] : null;
        if (cachedSettings) {
          notifyListeners({ ...SITE_DEFAULTS, ...cachedSettings });
        }
        return cachedSettings;
      })
      .catch(() => null)
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export function invalidateSiteSettings(newSettings = null) {
  if (newSettings) {
    cachedSettings = newSettings;
    notifyListeners({ ...SITE_DEFAULTS, ...newSettings });
  } else {
    cachedSettings = null;
    loadSettings(true);
  }
}

/** Loads the single global settings record, falling back to brand defaults. */
export function useSiteSettings() {
  const [settings, setSettings] = useState(
    cachedSettings ? { ...SITE_DEFAULTS, ...cachedSettings } : SITE_DEFAULTS
  );

  useEffect(() => {
    listeners.add(setSettings);
    let active = true;
    loadSettings().then((record) => {
      if (active && record) {
        setSettings({ ...SITE_DEFAULTS, ...record });
      }
    });
    return () => {
      active = false;
      listeners.delete(setSettings);
    };
  }, []);

  return settings;
}
