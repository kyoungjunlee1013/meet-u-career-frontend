"use client"
import { Search } from "lucide-react"
import { BlockedCompanyCard } from "./BlockedCompanyCard"

interface BlockedCompaniesListProps {
  searchQuery: string
  onSearch: (query: string) => void
}

export function BlockedCompaniesList({ searchQuery, onSearch }: BlockedCompaniesListProps) {
  // Mock data for blocked companies
  const blockedCompanies = [
    {
      id: 1,
      name: "테크스타트(주)",
      logo: "/abstract-company-logo.png",
      industry: "IT/웹/통신",
      blockedDate: "2023-04-15",
    },
    {
      id: 2,
      name: "글로벌이노베이션(주)",
      logo: "/abstract-geometric-company.png",
      industry: "서비스업",
      blockedDate: "2023-03-22",
    },
    {
      id: 3,
      name: "퓨처테크놀로지(주)",
      logo: "/abstract-corporate-logo.png",
      industry: "IT/웹/통신",
      blockedDate: "2023-02-10",
    },
  ]

  // Filter companies based on search query
  const filteredCompanies = blockedCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">차단 기업 목록</h2>
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
      </div>

      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <BlockedCompanyCard
              key={company.id}
              company={company}
              onUnblock={() => console.log(`Unblocked company: ${company.name}`)}
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
