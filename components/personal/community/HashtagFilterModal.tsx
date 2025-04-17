"use client"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"

interface HashtagFilterModalProps {
  onClose: () => void
  selectedHashtags: string[]
  onUpdateHashtags: (hashtags: string[]) => void
}

export const HashtagFilterModal = ({ onClose, selectedHashtags, onUpdateHashtags }: HashtagFilterModalProps) => {
  const [tags, setTags] = useState<string[]>(selectedHashtags)
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

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addTag = (tagToAdd: string) => {
    if (!tags.includes(tagToAdd)) {
      setTags([...tags, tagToAdd])
    }
  }

  const handleSave = () => {
    onUpdateHashtags(tags)
  }

  const recommendedTags = ["#취업", "#연봉", "#면접", "#채용공고", "#워라밸"]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">해시태그 관리</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">현재 해시태그</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <span className="text-sm">{tag}</span>
                <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => removeTag(tag)}>
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">추천 해시태그</h3>
          <div className="flex flex-wrap gap-2">
            {recommendedTags.map((tag) => (
              <button
                key={tag}
                className="bg-white border rounded-full px-3 py-1 text-sm hover:bg-gray-50"
                onClick={() => addTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-[#15274a] text-white rounded-md hover:bg-opacity-90"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
