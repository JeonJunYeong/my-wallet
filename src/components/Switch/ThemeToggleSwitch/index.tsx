"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/stores/useTheme";

interface ThemeToggleSwitchProps {
  isDark: boolean;
}
const ThemeToggleSwitch: React.FC<ThemeToggleSwitchProps> = ({ isDark }) => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
      }}
      className={`relative w-16 h-8 flex items-center rounded-full px-1 transition-colors duration-300
        ${isDark ? "bg-gray-800" : "bg-yellow-300"}
      `}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300
          ${isDark ? "translate-x-8" : "translate-x-0"}
        `}
      >
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggleSwitch;
