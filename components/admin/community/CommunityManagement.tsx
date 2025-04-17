"use client"

import { useState } from "react"
import CommunityTabs from "./CommunityTabs"
import TagsManagement from "./TagsManagement"
import PostsManagement from "./PostsManagement"
import CommentsManagement from "./CommentsManagement"

type TabType = "tags" | "posts" | "comments"

export default function CommunityManagement() {
  const [activeTab, setActiveTab] = useState<TabType>("tags")

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">커뮤니티 관리</h1>
        <p className="text-gray-600 mt-1">커뮤니티 메뉴, 게시글, 댓글을 관리합니다.</p>
      </div>

      <CommunityTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "tags" && <TagsManagement />}
        {activeTab === "posts" && <PostsManagement />}
        {activeTab === "comments" && <CommentsManagement />}
      </div>
    </div>
  )
}
