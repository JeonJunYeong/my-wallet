"use client";

import React from "react";

interface TitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4; // 제목 크기
  align?: "left" | "center" | "right"; // 정렬
  className?: string; // 추가 Tailwind 클래스
}

export const Title = ({
  children,
  level = 1,
  align = "left",
  className,
}: TitleProps) => {
  const base = "font-bold tracking-tight text-gray-900";
  const sizes: Record<number, string> = {
    1: "text-3xl md:text-4xl",
    2: "text-2xl md:text-3xl",
    3: "text-xl md:text-2xl",
    4: "text-lg md:text-xl",
  };
  const alignments: Record<typeof align, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const classes = `${base} ${sizes[level]} ${alignments[align]} ${className ?? ""}`;

  switch (level) {
    case 1:
      return <h1 className={classes}>{children}</h1>;
    case 2:
      return <h2 className={classes}>{children}</h2>;
    case 3:
      return <h3 className={classes}>{children}</h3>;
    case 4:
      return <h4 className={classes}>{children}</h4>;
    default:
      return <span className={classes}>{children}</span>;
  }
};
