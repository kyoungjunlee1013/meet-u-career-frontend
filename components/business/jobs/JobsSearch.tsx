"use client"

import { Search, SlidersHorizontal, ChevronDown } from "lucide-react"

export const JobsSearch = () => {
  return (
    <div className="mb-6 flex">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="공고 제목 검색"
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
      <button className="ml-2 px-3 py-2.5 border border-gray-300 rounded-md bg-white text-gray-700 flex items-center space-x-1 hover:bg-gray-50">
        <SlidersHorizontal className="h-4 w-4" />
        <span className="text-sm">상세 필터</span>
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  )
}
