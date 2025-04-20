"use client"

import { Bookmark, Building2 } from "lucide-react"

interface BookmarkTabsProps {
  activeTab: "jobs" | "companies"
  setActiveTab: (tab: "jobs" | "companies") => void
}

export function BookmarkTabs({ activeTab, setActiveTab }: BookmarkTabsProps) {
  const tabs = [
    { id: "jobs", label: "스크랩 공고" },
    { id: "companies", label: "관심기업" },
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex flex-wrap -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`inline-block py-4 px-4 text-sm font-medium border-b-2 ${
              activeTab === tab.id
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id as "jobs" | "companies")}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
