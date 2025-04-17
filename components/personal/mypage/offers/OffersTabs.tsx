"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function OffersTabs() {
  const [activeTab, setActiveTab] = useState("전체")

  const tabs = [
    { id: "전체", label: "전체", count: 3 },
    { id: "검토중", label: "검토중", count: 1 },
    { id: "수락", label: "수락", count: 1 },
    { id: "거절", label: "거절", count: 1 },
  ]

  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap",
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} {tab.count}
          </button>
        ))}
      </nav>
    </div>
  )
}
