"use client"

import { useState } from "react"
import { UserProfile } from "./UserProfile"
import { PostFeed } from "./PostFeed"
import { NewsSidebar } from "./NewsSidebar"
import { HashtagFilterModal } from "./HashtagFilterModal"
import { CreatePostModal } from "./CreatePostModal"

export const CommunityContent = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([
    "#직장생활",
    "#일상",
    "#커리어",
    "#이직",
    "#마케팅",
  ])

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true)
  }

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false)
  }

  const handleOpenCreatePostModal = () => {
    setIsCreatePostModalOpen(true)
  }

  const handleCloseCreatePostModal = () => {
    setIsCreatePostModalOpen(false)
  }

  const handleUpdateHashtags = (hashtags: string[]) => {
    setSelectedHashtags(hashtags)
    setIsFilterModalOpen(false)
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64">
          <UserProfile />
        </div>
        <div className="flex-1">
          <PostFeed
            selectedHashtags={selectedHashtags}
            onOpenFilterModal={handleOpenFilterModal}
            onOpenCreatePostModal={handleOpenCreatePostModal}
          />
        </div>
        <div className="w-full md:w-64">
          <NewsSidebar />
        </div>
      </div>

      {isFilterModalOpen && (
        <HashtagFilterModal
          onClose={handleCloseFilterModal}
          selectedHashtags={selectedHashtags}
          onUpdateHashtags={handleUpdateHashtags}
        />
      )}

      {isCreatePostModalOpen && <CreatePostModal onClose={handleCloseCreatePostModal} />}
    </div>
  )
}
