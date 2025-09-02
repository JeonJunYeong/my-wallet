"use client";
import React from "react";
import { WalletSummary } from "@/templates/Summary/WalletSummary";
import ChartSummary from "@/templates/Summary/ChartSummary";
import ThemeToggleSwitch from "@/components/Switch/ThemeToggleSwitch";
import GroupSummary from "@/templates/Summary/GroupSummary";

export default function Home() {
  return (
    <div>
      <div>
        <WalletSummary />
      </div>
      <div>
        <GroupSummary />
      </div>
    </div>
  );
}
