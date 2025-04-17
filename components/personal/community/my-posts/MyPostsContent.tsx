"use client"

import { useState } from "react"
import { ProfileHeader } from "./ProfileHeader"
import { ProfileTabs } from "./ProfileTabs"
import { PostsList } from "./PostsList"
import { CommentsList } from "./CommentsList"

export const MyPostsContent = () => {
  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts")

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="mb-8">
        <ProfileHeader />
      </div>

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">{activeTab === "posts" ? <PostsList /> : <CommentsList />}</div>
    </div>
  )
}
