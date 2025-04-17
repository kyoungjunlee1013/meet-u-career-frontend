"use client"

import { Tag, FileText, MessageSquare } from "lucide-react"

type TabType = "tags" | "posts" | "comments"

interface CommunityTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export default function CommunityTabs({ activeTab, onTabChange }: CommunityTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-8">
        <button
          className={`flex items-center pb-3 px-1 ${
            activeTab === "tags" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => onTabChange("tags")}
          aria-selected={activeTab === "tags"}
          role="tab"
        >
          <Tag size={18} className="mr-2" />
          <span>태그 관리</span>
        </button>
        <button
          className={`flex items-center pb-3 px-1 ${
            activeTab === "posts" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => onTabChange("posts")}
          aria-selected={activeTab === "posts"}
          role="tab"
        >
          <FileText size={18} className="mr-2" />
          <span>게시글 관리</span>
        </button>
        <button
          className={`flex items-center pb-3 px-1 ${
            activeTab === "comments" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => onTabChange("comments")}
          aria-selected={activeTab === "comments"}
          role="tab"
        >
          <MessageSquare size={18} className="mr-2" />
          <span>댓글 관리</span>
        </button>
      </div>
    </div>
  )
}
