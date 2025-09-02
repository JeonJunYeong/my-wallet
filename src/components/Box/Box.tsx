"use client";

import { Theme, themes } from "@/types/theme";
import { useThemeStore } from "@/stores/useTheme";

interface BoxProps {
  title?: string;
  children: React.ReactNode;
  rounded?: string;
}

export const Box = ({ title, children, rounded }: BoxProps) => {
  const { theme } = useThemeStore();

  const className = `p-4 ${rounded ? rounded : "rounded"} shadow ${themes[theme]}`;

  return (
    <div className={className}>
      {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};
