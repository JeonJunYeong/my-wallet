"use client";

import { useThemeStore } from "@/stores/useTheme";

export default function Body({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
  const bgClass = theme === "dark" ? "bg-black" : "bg-white";
  const fontClass = theme === "dark" ? "text-white" : "text-gray-800";

  return <div className={`${bgClass} ${fontClass}`}>{children}</div>;
}
