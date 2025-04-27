'use client'

import { SlidersHorizontal } from "lucide-react"

interface PostFiltersProps {
  selectedHashtags: string[]
  onOpenFilterModal: () => void
  onSelectHashtag: (tag: string) => void
  onSelectAll: () => void
}

export const PostFilters = ({ selectedHashtags, onOpenFilterModal, onSelectHashtag, onSelectAll }: PostFiltersProps) => {
  const TAG_NAMES = ["면접", "이직", "연봉", "취업", "커리어", "자격증", "자기소개서"];
  const hashtagList = TAG_NAMES.map(name => `#${name}`);

  return (
    <div className="bg-white rounded-md p-3 flex items-center overflow-x-auto">
      <div className="flex items-center flex-nowrap gap-1 w-full">
        <button
          className={`px-3 py-2 rounded-full text-sm ${
            selectedHashtags.length === 0 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={onSelectAll}
        >
          전체
        </button>

        {hashtagList.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelectHashtag(tag)}
            className={`px-3 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedHashtags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <button className="ml-3" onClick={onOpenFilterModal}>
        <SlidersHorizontal className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  )
}
