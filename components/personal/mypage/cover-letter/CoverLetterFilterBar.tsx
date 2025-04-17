"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface CoverLetterFilterBarProps {
  selectedFilter: string
  onFilterChange: (value: string) => void
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function CoverLetterFilterBar({
  selectedFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: CoverLetterFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="w-full md:w-1/4">
        <Select value={selectedFilter} onValueChange={onFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="모든 자기소개서" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 자기소개서</SelectItem>
            <SelectItem value="recent">최근 작성</SelectItem>
            <SelectItem value="analyzed">분석 완료</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="제목 또는 회사명으로 검색"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  )
}
