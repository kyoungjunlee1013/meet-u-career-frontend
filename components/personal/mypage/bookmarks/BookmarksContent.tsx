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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border rounded-lg bg-white shadow-sm">
          <div className="flex items-center p-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              {/* 적절한 아이콘 사용 */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">스크랩 공고</p>
              <p className="text-2xl font-bold">3건</p>
            </div>
          </div>
        </div>
        <div className="border rounded-lg bg-white shadow-sm">
          <div className="flex items-center p-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              {/* 적절한 아이콘 사용 */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">관심기업</p>
              <p className="text-2xl font-bold">3개</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <BookmarkTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mb-6">
          <BookmarkSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        {activeTab === "jobs" ? (
          <BookmarkedJobs searchQuery={searchQuery} />
        ) : (
          <BookmarkedCompanies searchQuery={searchQuery} />
        )}
      </div>
    </div>
  )
}
