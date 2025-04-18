"use client"

import { useState } from "react"
import { CompanyCard } from "./CompanyCard"
import { Pagination } from "./Pagination"

// Mock data for bookmarked companies
const mockBookmarkedCompanies = [
  {
    id: "1",
    name: "(주)사람인HR",
    industry: "IT/웹/통신",
    size: "중소기업",
    location: "서울 강남구",
    employees: "100-299명",
    founded: "2005년",
  },
  {
    id: "2",
    name: "테크스타트(주)",
    industry: "IT/웹/통신",
    size: "스타트업",
    location: "서울 서초구",
    employees: "50-99명",
    founded: "2015년",
  },
  {
    id: "3",
    name: "글로벌소프트(주)",
    industry: "IT/웹/통신",
    size: "중견기업",
    location: "서울 영등포구",
    employees: "300-499명",
    founded: "2000년",
  },
]

interface BookmarkedCompaniesProps {
  searchQuery: string
}

export function BookmarkedCompanies({ searchQuery }: BookmarkedCompaniesProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Filter companies based on search query
  const filteredCompanies = mockBookmarkedCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      {filteredCompanies.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
        </div>
      )}

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
