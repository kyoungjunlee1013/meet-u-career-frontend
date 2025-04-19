"use client"

import { useState } from "react"
import { JobCard } from "./JobCard"
import { Pagination } from "./Pagination"

// Mock data for bookmarked jobs
const mockBookmarkedJobs = [
  {
    id: "1",
    title: "웹 프론트엔드 개발자",
    company: "(주)사람인HR",
    location: "서울 강남구",
    salary: "5,000만원 이상",
    experience: "경력 3년 이상",
    deadline: "2023-06-30",
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    id: "2",
    title: "백엔드 개발자",
    company: "테크스타트(주)",
    location: "서울 서초구",
    salary: "6,000만원 이상",
    experience: "경력 5년 이상",
    deadline: "2023-07-15",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    id: "3",
    title: "풀스택 개발자",
    company: "글로벌소프트(주)",
    location: "서울 영등포구",
    salary: "7,000만원 이상",
    experience: "경력 7년 이상",
    deadline: "2023-07-20",
    skills: ["React", "Node.js", "AWS"],
  },
]

interface BookmarkedJobsProps {
  searchQuery: string
}

export function BookmarkedJobs({ searchQuery }: BookmarkedJobsProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Filter jobs based on search query
  const filteredJobs = mockBookmarkedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {filteredJobs.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
        </div>
      )}

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
