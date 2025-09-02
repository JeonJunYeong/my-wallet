import React, { ReactNode, useState } from "react";
import { useFilterData } from "@/stores/useTable";

type Column<T> = {
  key: keyof T;
  label: string | ReactNode;
  sortable?: boolean;
};

type Props<T extends Record<string, unknown>> = {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  searchable?: boolean;
  onRowSelect?: (row: T) => void;
  renderSubRow?: (row: T) => ReactNode; // 서브로우 렌더링
};

export default function ExpandableTable<T extends Record<string, unknown>>({
  data,
  columns,
  pageSize = 10,
  searchable = true,
  onRowSelect,
  renderSubRow,
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const filtered = useFilterData(data, query);

  const handleRowClick = (idx: number) => {
    setSelectedRow(idx);
    onRowSelect?.(filtered[idx]);

    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) newSet.delete(idx);
      else newSet.add(idx);
      return newSet;
    });
  };

  return (
    <div className="w-full">
      {searchable && (
        <input
          className="border rounded p-2 mb-2 w-full"
          placeholder="검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}

      <table className="w-full border border-gray-200">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="border-b p-2 text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.slice(0, pageSize).map((row, i) => (
            <React.Fragment key={i}>
              <tr
                className={`border-b hover:bg-gray-50 ${
                  selectedRow === i ? "bg-blue-100" : ""
                }`}
                onClick={() => handleRowClick(i)}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="p-2">
                    {String(row[col.key] ?? "")}
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
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
