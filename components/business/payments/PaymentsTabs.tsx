"use client";

import React from "react";

export type PaymentsTabValue = "all" | "progress" | "ended";

interface PaymentsTabsProps {
  activeTab: PaymentsTabValue;
  onTabChange: (tab: PaymentsTabValue) => void;
}

export const PaymentsTabs: React.FC<PaymentsTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { label: "전체", value: "all" },
    { label: "진행 중", value: "progress" },
    { label: "종료", value: "ended" },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`px-6 py-2 rounded-lg border text-sm font-medium transition-colors
            ${activeTab === tab.value
              ? "bg-blue-500 text-white border-blue-500 shadow"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}
          `}
          onClick={() => onTabChange(tab.value as PaymentsTabValue)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
