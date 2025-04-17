"use client"

import { Search, ChevronDown } from "lucide-react"

export default function CompanySearch() {
  return (
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="기업명 검색"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="사업자등록번호 검색"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      <div>
        <button className="w-full md:w-auto flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <span>전체</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
