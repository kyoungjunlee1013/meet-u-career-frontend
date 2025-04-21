"use client"

import { useState } from "react"
import { CreatePostModal } from "./CreatePostModal"

interface CreatePostInputProps {
  onOpenCreatePostModal: () => void
}

export const CreatePostInput = ({ onOpenCreatePostModal }: CreatePostInputProps) => {
  // 로그인한 사용자 정보 (예시)
  const profileImageUrl = "/profile.png"
  const userName = "김밋유"

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
          {/* 프로필 이미지 */}
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* 텍스트 */}
          <div className="text-gray-400 text-sm select-none">
            나누고 싶은 생각을 공유해보세요!
          </div>
        </div>
      </div>

      {/* 게시글 작성 모달 */}
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
