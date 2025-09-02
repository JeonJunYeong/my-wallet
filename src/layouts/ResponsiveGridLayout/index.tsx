"use client";

import React from "react";
import { useThemeStore } from "@/stores/useTheme";

interface ResponsiveGridLayoutProps {
  children: React.ReactNode;
  cols?: number; // 기본 컬럼 수 (sm, lg는 자동 반응형)
  className?: string; // 추가적인 클래스 전달용
}

const colClassMap: Record<number, string> = {
  0: "grid-cols-1 sm:grid-cols-1 lg:grid-cols-1",
  1: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2",
  2: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  3: "grid-cols-3 sm:grid-cols-4 lg:grid-cols-5",
  4: "grid-cols-4 sm:grid-cols-5 lg:grid-cols-6",
};

export default function ResponsiveGridLayout({
  children,
  cols = 1,
  className = "",
}: ResponsiveGridLayoutProps) {
  const { theme } = useThemeStore();
  const colClasses = colClassMap[cols] || colClassMap[1];
  const bgClass = theme === "dark" ? "bg-gray-50" : "bg-gray-50";
  return (
    <div
      className={`${bgClass} grid ${colClasses} gap-6 p-6 m-4 rounded shadow ${className}`}
    >
      {children}
    </div>
  );
}
