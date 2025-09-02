"use client";

import React from "react";
import ResponsiveGridLayout from "@/layouts/ResponsiveGridLayout";
import Dropdown from "@/components/Dropdown/Dropdown";

type Props = {
  setValue: (value: string) => void;
};

export default function AccountList({ setValue }: Props) {
  return (
    <ResponsiveGridLayout cols={1}>
      <Dropdown
        options={[{ key: "옵션 1", value: "1" }]}
        onSelect={(value) => setValue(value)}
      />
    </ResponsiveGridLayout>
  );
}
