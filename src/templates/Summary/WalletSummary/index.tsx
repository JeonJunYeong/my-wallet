import { Label } from "@/components/Label/Label";
import { Box } from "@/components/Box/Box";
import React from "react";

export const WalletSummary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      <Box rounded={"rounded-3xl"}>
        <Label text="일반 태그" />
      </Box>
      <Box rounded={"rounded-3xl"}>
        <Label text="일반 태그" />
      </Box>
      <Box rounded={"rounded-3xl"}>
        <Label text="일반 태그" />
      </Box>
    </div>
  );
};
