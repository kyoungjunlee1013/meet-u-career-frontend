"use client"

import { useState } from "react"
import { CreatePostModal } from "./CreatePostModal"
import { useUserStore } from "@/store/useUserStore"

export const CreatePostInput = () => {
  const { userInfo } = useUserStore();
  const profileImageUrl = userInfo?.profileImage || "/images/etc/profile.png";
  const userName = userInfo?.name;

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="bg-white rounded-md p-4 mb-4">
        <div
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md focus:outline-none"
          onClick={() => setIsModalOpen(true)}
          tabIndex={0}
          contentEditable={false}
        >
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-gray-400 text-sm select-none">
            나누고 싶은 생각을 공유해보세요!
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CreatePostModal
          onClose={() => setIsModalOpen(false)}
          profileImageUrl={profileImageUrl}
          userName={userName}
        />
      )}
    </>
  )
}
