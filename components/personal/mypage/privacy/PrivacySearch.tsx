"use client"

import type React from "react"

import { Search } from "lucide-react"
import { useState } from "react"

interface PrivacySearchProps {
  onSearch?: (term: string) => void
}

export function PrivacySearch({ onSearch }: PrivacySearchProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="search"
        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="기업명 검색"
        aria-label="기업명 검색"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  )
}
