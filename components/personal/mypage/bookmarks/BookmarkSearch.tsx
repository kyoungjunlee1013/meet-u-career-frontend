"use client"

import { Search } from "lucide-react"

interface BookmarkSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function BookmarkSearch({ searchQuery, setSearchQuery }: BookmarkSearchProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="공고명, 기업명 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
