"use client"

import { Search, Plus } from "lucide-react"
import { BlockedCompanyCard } from "./BlockedCompanyCard"
import { BlockedCompanyProps } from "@/types/block";

interface BlockedCompaniesListProps {
  searchQuery: string
  onSearch: (query: string) => void
  blockedCompanies: BlockedCompanyProps[]
  setIsModalOpen: (isOpen: boolean) => void
  fetchBlockedCompanies: () => void
}

export function BlockedCompaniesList({
  searchQuery,
  onSearch,
  blockedCompanies,
  setIsModalOpen,
  fetchBlockedCompanies
}: BlockedCompaniesListProps) {

  const filteredCompanies = blockedCompanies.filter(
    (company) =>
      company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">차단 기업 목록</h2>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="기업명 검색"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            차단 기업 추가
          </button>
        </div>
      </div>

      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <BlockedCompanyCard
              key={company.companyId}
              company={company}
              fetchBlockedCompanies={fetchBlockedCompanies}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">차단한 기업이 없습니다.</p>
        </div>
      )}
    </div>
  )
}
