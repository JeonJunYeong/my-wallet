import React from "react";

import ResponsiveGridLayout from "@/layouts/ResponsiveGridLayout";
import { Box } from "@/components/Box/Box";
import { Label } from "@/components/Label/Label";
import { CurrencyText } from "@/components/Text/CurrencyTextProps";

export default function SummaryTemplate() {
  return (
    <ResponsiveGridLayout cols={2}>
      <Box rounded={"rounded-3xl"}>
        <Label text="Total" theme={"blue"} />
        <CurrencyText amount={10000000} />
      </Box>
      <Box rounded={"rounded-3xl"}>
        <Label text="Group 1" />
      </Box>
      <Box rounded={"rounded-3xl"}>
        <Label text="Group 2" />
      </Box>
      <Box rounded={"rounded-3xl"}>
        <Label text="Group 2" />
      </Box>
      <Box rounded={"rounded-3xl"}>
        <Label text="Group 2" />
      </Box>
      <Box rounded={"rounded-3xl"}>
        <Label text="Group 2" />
      </Box>
      <Box rounded={"rounded-3xl"}>
        <Label text="Group 2" />
      </Box>
    </ResponsiveGridLayout>
  );
}
