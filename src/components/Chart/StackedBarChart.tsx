"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function StackedBarChart({
  labels = ["1월", "2월", "3월", "4월", "5월"],
  datasets = [
    {
      label: "매출",
      data: [300, 400, 350, 500, 450],
      backgroundColor: "#4f46e5", // indigo-600
    },
    {
      label: "비용",
      data: [200, 250, 200, 300, 280],
      backgroundColor: "#f59e0b", // amber-500
    },
    {
      label: "이익",
      data: [100, 150, 150, 200, 170],
      backgroundColor: "#10b981", // green-500
    },
  ],
  stacked = true,
}) {
  const data = React.useMemo(() => {
    return {
      labels,
      datasets,
    };
  }, [labels, datasets]);

  const options = React.useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: false,
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      scales: {
        x: {
          stacked,
        },
        y: {
          stacked,
          beginAtZero: true,
        },
      },
    }),
    [stacked],
  );

  return (
    <div className="w-full max-w-3xl">
      <div className="relative w-full h-72 md:h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
