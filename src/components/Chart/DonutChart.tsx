"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Chart.js 모듈을 등록합니다 (필수)
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// 기본 색상 (원하면 Tailwind 변수나 CSS 커스텀 프로퍼티로 바꿔도 됩니다)
const DEFAULT_COLORS = [
  "#4f46e5", // indigo-600
  "#10b981", // green-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#3b82f6", // blue-500
];

export default function DonutChart({
  labels = ["A", "B", "C"],
  values = [45, 25, 30],
  colors = DEFAULT_COLORS,
  cutout = "65%", // 도넛 중앙 비율
  showCenterLabel = true,
}) {
  // 데이터 포멧
  const data = React.useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "Dataset",
          data: values,
          backgroundColor: colors.slice(0, values.length),
          borderWidth: 0,
          // borderColor: "transparent",
          hoverOffset: 8,
        },
      ],
    };
  }, [labels, values, colors]);

  const total = React.useMemo(
    () => values.reduce((s, v) => s + (Number(v) || 0), 0),
    [values],
  );

  const options = React.useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 12,
            boxHeight: 12,
            padding: 16,
          },
        },
        title: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw ?? 0;
              const percent = total
                ? ((Number(value) / total) * 100).toFixed(1)
                : "0";
              return `${label}: ${value} (${percent}%)`;
            },
          },
        },
      },
      // 애니메이션 설정 (원하면 조정)
      animation: {
        animateRotate: true,
        animateScale: true,
      },
    }),
    [cutout, total],
  );

  return (
    <div className="w-full max-w-xl">
      <div className="relative w-full h-64 md:h-72">
        <Doughnut data={data} options={options} />

        {/* 중앙 텍스트 (optional) */}
        {showCenterLabel && (
          <div
            className="pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center"
            aria-hidden
          >
            <div className="text-center">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-xl font-semibold">{total}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
