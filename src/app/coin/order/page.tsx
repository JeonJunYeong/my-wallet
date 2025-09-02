"use client";
import React from "react";
import AccountList from "@/templates/Coin/Order/AccountLIst";
import { useState } from "react";
import InfoTableGroupTemplate from "@/templates/Coin/Order/InfoTableGroupTemplate";

export default function Home() {
  const [selectedName, setSelectedName] = useState<string>("");

  return (
    <>
      <div>
        <AccountList setValue={setSelectedName} />
      </div>
      <div>
        <InfoTableGroupTemplate value={selectedName} />
      </div>
    </>
  );
}
