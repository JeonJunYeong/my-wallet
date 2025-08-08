import React from "react";

interface ResponsiveGridLayoutProps {
  children: React.ReactNode;
  className?: string; // 추가적인 클래스 전달용
}

export default function ResponsiveGridLayout({
  children,
  className = "",
}: ResponsiveGridLayoutProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 m-4 rounded shadow  ${className}`}
    >
      {children}
    </div>
  );
}
