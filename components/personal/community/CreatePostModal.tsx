"use client"

import { useState, useRef, useEffect } from "react"
import { X, ImageIcon } from "lucide-react"

interface CreatePostModalProps {
  onClose: () => void
}

export const CreatePostModal = ({ onClose }: CreatePostModalProps) => {
  const [content, setContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const availableTags = ["#직장생활", "#일상", "#커리어", "#이직", "#마케팅", "#개발", "#소통", "#취업"]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">게시글 작성</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-[#15274a] text-white flex items-center justify-center mr-3">
              <span className="text-sm">사람</span>
            </div>
            <span className="font-medium">사람인</span>
          </div>

          <textarea
            placeholder="나누고 싶은 생각을 공유해보세요!"
            className="w-full h-32 p-3 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="p-4 border-b">
          <h3 className="text-sm font-medium mb-3">해시태그 선택</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                className={`rounded-full px-3 py-1 text-sm ${
                  selectedTags.includes(tag)
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 flex justify-between items-center">
          <button className="flex items-center text-gray-700">
            <ImageIcon className="h-5 w-5 mr-1" />
            <span className="text-sm">이미지 첨부</span>
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm">게시하기</button>
        </div>
      </div>
    </div>
  )
}
