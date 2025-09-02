import React from "react";
import ResponsiveGridLayout from "@/layouts/ResponsiveGridLayout";
import SequentialProgressBar, {
  Segment,
} from "@/components/Bar/SequentialProgressBar";
import { Box } from "@/components/Box/Box";

export default function GroupSummary() {
  const segments: Segment[] = [
    { color: "#10B981", value: 30, label: "Green 30" },
    { color: "#EF4444", value: 40, label: "Red 40" },
    { color: "#EF1444", value: 70, label: "Red 40" },
  ];
  return (
    <ResponsiveGridLayout cols={1}>
      <Box>
        <h3 className="mb-2">SequentialProgressBar </h3>
        <SequentialProgressBar
          segments={segments}
          total={100}
          height="1.5rem"
          showLabels={true}
        />
      </Box>
    </ResponsiveGridLayout>
  );
}
