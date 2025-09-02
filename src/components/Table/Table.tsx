"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useTableStore } from "@/stores/useTable";

type Column<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  onRowSelect?: (row: T) => void;
  pageSize?: number;
  searchable?: boolean;
  renderSubRow?: (row: T) => ReactNode; // 서브로우 렌더링
};
export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
  onRowSelect,
  pageSize = 10,
  searchable = true,
  renderSubRow,
}: Props<T>) {
  const store = useTableStore(data, pageSize);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const {
    query,
    setQuery,
    sortKey,
    sortDir,
    page,
    setPage,
    totalPages,
    pageData,
    filtered,
    sorted,
    selectedRow,
    toggleSort,
    setSelectedRow,
  } = store;

  function handleRowClick(idx: number) {
    setSelectedRow(idx);

    if (onRowSelect) {
      const row = pageData[idx]; // 현재 페이지 기준으로 선택된 row
      onRowSelect(row);
    }
    setSelectedRow(idx);
    // setExpandedRows(new Set(idx));

    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) newSet.delete(idx);
      else newSet.add(idx);
      return newSet;
    });
  }

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
        {searchable && (
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="검색..."
            className="px-3 py-2 border rounded-md text-sm w-60 focus:outline-none focus:ring-2 focus:ring-offset-1"
          />
        )}
        <div className="text-xs text-gray-500">총 {filtered.length}건</div>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y table-auto">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col: Column<T>) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col)}
                  className={`px-4 py-3 text-left text-sm font-medium uppercase tracking-wider select-none`}
                >
                  <div className="flex items-center gap-2">
                    <span>{String(col.label)}</span>
                    {col.sortable && (
                      <span className="text-gray-400 text-xs">
                        {sortKey === col.key
                          ? sortDir === "asc"
                            ? "▲"
                            : "▼"
                          : "⇅"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {pageData.length === 0 ? (
              <tr>
                <td
                  className="px-6 py-8 text-center text-sm text-gray-500"
                  colSpan={columns.length}
                >
                  결과가 없습니다.
                </td>
              </tr>
            ) : (
              pageData.map((row, i) => {
                const globalIdx = (page - 1) * pageSize + i;
                const isSelected = selectedRow === globalIdx;
                return (
                  <>
                    <tr
                      key={globalIdx}
                      onClick={() => handleRowClick(globalIdx)}
                      className={`cursor-pointer hover:bg-gray-100 ${isSelected ? "bg-blue-100" : ""}`}
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className="px-4 py-3 text-sm break-words max-w-[280px]"
                        >
                          {String(row[col.key] ?? "-")}
                        </td>
                      ))}
                    </tr>
                    {expandedRows.has(i) && renderSubRow && (
                      <tr className="bg-gray-50">
                        <td colSpan={columns.length} className="p-2">
                          {renderSubRow(row)}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-gray-600">
          {Math.min((page - 1) * pageSize + 1, sorted.length)} -{" "}
          {Math.min(page * pageSize, sorted.length)} / {sorted.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
            disabled={page <= 1}
          >
            이전
          </button>
          <div className="text-sm">
            {page} / {totalPages}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
            disabled={page >= totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
