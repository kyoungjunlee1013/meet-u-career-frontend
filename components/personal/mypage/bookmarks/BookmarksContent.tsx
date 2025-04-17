"use client"

import { useState } from "react"
import { BookmarkTabs } from "./BookmarkTabs"
import { BookmarkSearch } from "./BookmarkSearch"
import { BookmarkedJobs } from "./BookmarkedJobs"
import { BookmarkedCompanies } from "./BookmarkedCompanies"

export function BookmarksContent() {
  const [activeTab, setActiveTab] = useState<"jobs" | "companies">("jobs")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">스크랩</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500 text-sm mb-1">스크랩 공고</p>
          <p className="text-blue-600 font-bold text-xl">3건</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500 text-sm mb-1">관심기업</p>
          <p className="text-blue-600 font-bold text-xl">3개</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <BookmarkTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="mb-6">
        <BookmarkSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {activeTab === "jobs" ? (
        <BookmarkedJobs searchQuery={searchQuery} />
      ) : (
        <BookmarkedCompanies searchQuery={searchQuery} />
      )}
    </div>
  )
}
