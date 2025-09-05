import React, { PropsWithChildren } from "react";
import { useThemeStore } from "@/stores/useTheme";

interface FlexRatioProps {
  /** flex 비율 (예: left:1, right:2 → 1:2) */
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  /** 세로 배치 여부 */
  vertical?: boolean;
  /** gap tailwind 값 */
  gap?: string | number;
  className?: string;
}

function clsx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function FlexRatio({
  left,
  right,
  top,
  bottom,
  vertical = false,
  gap = 4,
  className,
  children,
}: PropsWithChildren<FlexRatioProps>) {
  const kids = React.Children.toArray(children);
  const isVertical = vertical || (top !== undefined && bottom !== undefined);

  const { theme } = useThemeStore();
  const bgClass = theme === "dark" ? "bg-gray-50" : "bg-gray-50";

  const base = clsx(
    "flex",
    isVertical ? "flex-col" : "flex-row",
    typeof gap === "number" ? `gap-${gap}` : `gap-[${gap}]`,
    className,
  );

  const ratioA = isVertical ? (top ?? 1) : (left ?? 1);
  const ratioB = isVertical ? (bottom ?? 1) : (right ?? 1);

  return (
    <div className={`${base} ${bgClass}`}>
      {kids[0] && (
        <div style={{ flexGrow: 1 }} className="basis-auto mr-3">
          {kids[0]}
        </div>
      )}
      {kids[1] && (
        <div style={{ flexGrow: 2 }} className="basis-auto">
          {kids[1]}
        </div>
      )}
    </div>
  );
}
