"use client";
import React from "react";
import { WalletSummary } from "@/templates/Summary/WalletSummary";
import ChartSummary from "@/templates/Summary/ChartSummary";
import ThemeToggleSwitch from "@/components/Switch/ThemeToggleSwitch";

export default function Home() {
  return (
    <div>
      <div>
        <ThemeToggleSwitch isDark={false} />
        <WalletSummary />
      </div>
      <div>
        <ChartSummary />
      </div>
    </div>
  );
}
