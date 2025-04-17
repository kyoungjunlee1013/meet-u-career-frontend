"use client"

import { useState } from "react"
import { InterviewStats } from "./InterviewStats"
import { InterviewStatusTab } from "./InterviewStatusTab"
import { InterviewReviewTab } from "./InterviewReviewTab"

export function InterviewsContent() {
  const [activeTab, setActiveTab] = useState<"status" | "reviews">("status")

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 pt-6">면접 현황</h1>
      <InterviewStats />
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* 탭 + 정렬/필터 바 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 mb-6 pb-2">
          <div className="flex space-x-1">
            <button
              className={`flex items-center py-3 px-4 border-b-2 font-medium text-sm ${
                activeTab === "status"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("status")}
              aria-selected={activeTab === "status"}
              role="tab"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span>면접 현황</span>
              <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">3</span>
            </button>
            <button
              className={`flex items-center py-3 px-4 border-b-2 font-medium text-sm ${
                activeTab === "reviews"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("reviews")}
              aria-selected={activeTab === "reviews"}
              role="tab"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7C20 5.89543 19.1046 5 18 5H16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8 5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7H8V5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>면접 리뷰</span>
              <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">2</span>
            </button>
          </div>
          {/* 정렬/필터 바 자리 - 필요시 인터뷰 정렬/필터 UI 추가 */}
        </div>
        {/* Tab Content */}
        {activeTab === "status" ? <InterviewStatusTab /> : <InterviewReviewTab />}
      </div>
    </div>
  )
}
