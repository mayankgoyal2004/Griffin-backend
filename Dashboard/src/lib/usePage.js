import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

/** Loads one WebsitePage record by slug (client-side, with graceful fallback). */
export function usePage(slug) {
  const [page, setPage] = useState(null);

  useEffect(() => {
    let active = true;
    base44.entities.WebsitePage.filter({ slug }, { limit: 1 })
      .then((rows) => {
        if (active) setPage(rows.items?.[0] ?? null);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [slug]);

  return page;
}