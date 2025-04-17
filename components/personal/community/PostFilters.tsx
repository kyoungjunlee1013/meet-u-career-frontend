"use client"

import { SlidersHorizontal } from "lucide-react"

interface PostFiltersProps {
  selectedHashtags: string[]
  onOpenFilterModal: () => void
}

export const PostFilters = ({ selectedHashtags, onOpenFilterModal }: PostFiltersProps) => {
  return (
    <div className="bg-white rounded-md p-3 flex items-center overflow-x-auto">
      <button className="px-3 py-1 rounded-full text-sm bg-blue-500 text-white mr-2">전체</button>

      <div className="flex gap-2 flex-wrap flex-1">
        {selectedHashtags.map((tag) => (
          <button key={tag} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">
            {tag}
          </button>
        ))}
      </div>

      <button className="ml-auto" onClick={onOpenFilterModal}>
        <SlidersHorizontal className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  )
}
