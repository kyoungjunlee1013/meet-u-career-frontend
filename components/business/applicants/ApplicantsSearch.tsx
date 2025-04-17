"use client"

import { useState, useRef, useEffect } from "react"
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react"
import { FilterDropdown } from "./FilterDropdown"

export const ApplicantsSearch = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    // Close dropdown when pressing Escape
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [])

  return (
    <div className="mb-6 flex gap-2">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="지원자 이름, 이메일 검색"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">검색</button>
      <div className="relative" ref={filterRef}>
        <button
          className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          aria-expanded={isFilterOpen}
          aria-haspopup="true"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>필터</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </button>

        {isFilterOpen && <FilterDropdown onClose={() => setIsFilterOpen(false)} />}
      </div>
    </div>
  )
}
