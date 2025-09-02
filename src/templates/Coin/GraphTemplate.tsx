import { Box } from "@/components/Box/Box";
import { Label } from "@/components/Label/Label";
import { CurrencyText } from "@/components/Text/CurrencyTextProps";
import ResponsiveGridLayout from "@/layouts/ResponsiveGridLayout";
import React from "react";
import DonutChart from "@/components/Chart/DonutChart";
import StackedBarChart from "@/components/Chart/StackedBarChart";

export default function GraphTemplate() {
  return (
    <ResponsiveGridLayout cols={1}>
      <div className={"p-2 m-auto"}>
        <DonutChart />
      </div>
      <div className={"p-2 m-auto"}>
        <StackedBarChart />
      </div>
    </ResponsiveGridLayout>
  );
}
