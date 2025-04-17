"use client"

import { MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

export const UserProfile = () => {
  const router = useRouter()

  const handleViewMyPosts = () => {
    router.push("/personal/community/my-posts")
  }

  return (
    <div className="bg-white border rounded-md overflow-hidden">
      <div className="flex flex-col items-center py-6">
        <div className="w-20 h-20 rounded-full bg-[#15274a] text-white flex items-center justify-center mb-2">
          <span className="text-lg">사람</span>
        </div>
        <h2 className="text-lg font-medium">사람인</h2>
      </div>

      <div className="border-t px-4 py-3">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">직급</span>
          <span>프론트엔드 개발자</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">직무</span>
          <span>개발</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">경력</span>
          <span>3년</span>
        </div>
      </div>

      <div className="border-t p-4 space-y-2">
        <button
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm hover:bg-gray-50"
          onClick={handleViewMyPosts}
        >
          <MessageSquare className="h-4 w-4" />
          <span>내가 쓴 글/댓글 조회</span>
        </button>
      </div>
    </div>
  )
}
