"use client"

import { Bookmark, Building2 } from "lucide-react"

interface BookmarkTabsProps {
  activeTab: "jobs" | "companies"
  setActiveTab: (tab: "jobs" | "companies") => void
}

export function BookmarkTabs({ activeTab, setActiveTab }: BookmarkTabsProps) {
  return (
    <div className="flex border-b border-gray-200">
      <button
        className={`flex items-center py-4 px-6 ${
          activeTab === "jobs"
            ? "border-b-2 border-blue-500 text-blue-600 font-medium"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("jobs")}
      >
        <Bookmark className="h-5 w-5 mr-2" />
        <span>스크랩 공고</span>
      </button>
      <button
        className={`flex items-center py-4 px-6 ${
          activeTab === "companies"
            ? "border-b-2 border-blue-500 text-blue-600 font-medium"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("companies")}
      >
        <Building2 className="h-5 w-5 mr-2" />
        <span>관심기업</span>
      </button>
    </div>
  )
}
