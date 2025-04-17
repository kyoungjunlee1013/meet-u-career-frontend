"use client"

import { useState } from "react"
import { FileText } from "lucide-react"

export function InterviewTabs() {
  const [activeTab, setActiveTab] = useState("status")

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex">
        <button
          className={`flex items-center py-3 px-4 border-b-2 ${
            activeTab === "status"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          onClick={() => setActiveTab("status")}
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
          className={`flex items-center py-3 px-4 border-b-2 ${
            activeTab === "reviews"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          <FileText className="w-5 h-5 mr-2" />
          <span>면접 리뷰</span>
          <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">2</span>
        </button>
      </div>
    </div>
  )
}
