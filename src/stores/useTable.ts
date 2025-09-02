// useTableStore.ts
import { useState, useMemo } from "react";

type Column<T> = {
  key: keyof T; // 반드시 데이터 객체 키
  label: string; // UI 표시
  sortable?: boolean;
  className?: string;
};
export type SortDirection = "asc" | "desc";

export function useFilterData<T extends Record<string, unknown>>(
  data: T[],
  query: string,
) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      Object.values(row).some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [data, query]);
}

export function useTableStore<T extends Record<string, unknown>>(
  data: T[],
  pageSize = 10,
) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const filtered = useFilterData<T>(data, query);

  // ✅ 정렬
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va == null && vb == null) return 0;
      if (va == null) return sortDir === "asc" ? -1 : 1;
      if (vb == null) return sortDir === "asc" ? 1 : -1;
      if (typeof va === "number" && typeof vb === "number") {
        return sortDir === "asc" ? va - vb : vb - va;
      }
      return sortDir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  // Actions
  function toggleSort(col: Column<T>) {
    if (!col.sortable) return;

    if (sortKey === col.key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      // setSortKey(col.key);
      setSortDir("asc");
    }
    setPage(1);
  }

  return {
    // state
    query,
    sortKey,
    sortDir,
    page,
    pageSize,
    selectedRow,
    totalPages,

    // derived
    filtered,
    sorted,
    pageData,

    // actions
    setQuery,
    setPage,
    toggleSort,
    setSelectedRow,
  };
}
