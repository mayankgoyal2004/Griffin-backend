import { useCallback, useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Server-side paginated, filtered entity list.
 * Uses the platform's cursor pagination and keeps a cursor stack so pages can be
 * walked forwards and backwards. A filter change resets to the first page and
 * issues exactly one request.
 */
export function usePagedList(entityName, { filter = {}, sort = "-updated_date", limit = 10 } = {}) {
  const filterKey = JSON.stringify({ filter, sort, limit });
  const [page, setPage] = useState(0);
  const [cursors, setCursors] = useState([null]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [state, setState] = useState({ items: [], next_cursor: null, has_more: false, loading: true, error: null });
  const keyRef = useRef(filterKey);
  const requestId = useRef(0);

  useEffect(() => {
    if (keyRef.current !== filterKey) {
      keyRef.current = filterKey;
      setPage(0);
      setCursors([null]);
      return;
    }

    const id = ++requestId.current;
    let active = true;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    const options = { sort, limit };
    if (cursors[page]) options.cursor = cursors[page];

    base44.entities[entityName]
      .filter(filter, options)
      .then((res) => {
        if (!active || id !== requestId.current) return;
        setState({
          items: res?.items ?? [],
          next_cursor: res?.next_cursor ?? null,
          has_more: !!res?.has_more,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        if (!active || id !== requestId.current) return;
        setState({ items: [], next_cursor: null, has_more: false, loading: false, error });
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityName, filterKey, page, cursors, refreshKey]);

  const next = useCallback(() => {
    if (!state.has_more) return;
    setCursors((prev) => {
      const copy = [...prev];
      copy[page + 1] = state.next_cursor;
      return copy;
    });
    setPage((current) => current + 1);
  }, [state.has_more, state.next_cursor, page]);

  const prev = useCallback(() => setPage((current) => Math.max(0, current - 1)), []);
  const refresh = useCallback(() => setRefreshKey((key) => key + 1), []);

  return {
    items: state.items,
    loading: state.loading,
    error: state.error,
    hasNext: state.has_more,
    page,
    canPrev: page > 0,
    next,
    prev,
    refresh,
  };
}