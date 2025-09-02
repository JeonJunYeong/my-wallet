"use client";
import ThemeToggleSwitch from "@/components/Switch/ThemeToggleSwitch";
import { useThemeStore } from "@/stores/useTheme";

export default function Header() {
  const { theme } = useThemeStore();

  return (
    <header
      className={`bg-background h-14 flex items-center px-4 text-lg font-bold font-pretendard`}
    >
      간단한 헤더
      <div className="ml-auto">
        <ThemeToggleSwitch isDark={theme === "dark"} />
      </div>
    </header>
  );
}
