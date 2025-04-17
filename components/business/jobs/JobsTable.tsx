"use client"

import { useState } from "react"
import { JobCard } from "@/components/business/jobs/JobCard"

export const JobsTable = () => {
  const tableHeaders = [
    { label: "전체", value: "all" },
    { label: "지원됨", value: "지원됨" },
    { label: "승인 대기", value: "승인 대기" },
    { label: "게시 중", value: "게시 중" },
    { label: "반려됨", value: "반려됨" },
  ]

  const [activeTab, setActiveTab] = useState("all")

  const jobPostings = [
    {
      id: 1,
      title: "웹 백엔드 개발자 채용",
      status: "게시 중",
      statusLabel: "게시 중",
      daysLeft: "D-12",
      views: 312,
      applicants: 14,
      location: "서울",
      workType: "정규직",
      experience: "경력 3년↑",
      salary: "3,000-4,000만원",
      postedDate: "2025.04.01",
      deadline: "2025.04.25",
    },
    {
      id: 2,
      title: "프론트엔드 개발자 (React)",
      status: "게시 중",
      statusLabel: "게시 중",
      daysLeft: "D-32",
      views: 245,
      applicants: 8,
      location: "서울",
      workType: "정규직",
      experience: "경력 무관",
      salary: "3,500-4,500만원",
      postedDate: "2025.04.05",
      deadline: "2025.05.15",
    },
    {
      id: 3,
      title: "DevOps 엔지니어",
      status: "승인 대기",
      statusLabel: "승인 대기",
      views: 0,
      applicants: 0,
      location: "상암",
      workType: "정규직",
      experience: "경력 5년↑",
      salary: "5,000-7,000만원",
      postedDate: "2025.04.10",
      deadline: "2025.05.30",
    },
    {
      id: 4,
      title: "모바일 앱 개발자 (Android/iOS)",
      status: "지원됨",
      statusLabel: "지원됨",
      views: 0,
      applicants: 0,
      location: "서울",
      workType: "계약직",
      experience: "경력 1년↑",
      salary: "3,000-4,000만원",
      postedDate: "2025.04.12",
      deadline: "2025.06.15",
    },
    {
      id: 5,
      title: "데이터 분석가",
      status: "반려됨",
      statusLabel: "반려됨",
      error: "공고 내용이 불충분합니다. 직무 설명과 지원 요건을 더 상세히 작성해주세요.",
      views: 0,
      applicants: 0,
      location: "서울",
      workType: "정규직",
      experience: "경력 2년↑",
      salary: "4,000-5,000만원",
      postedDate: "2025.04.08",
      deadline: "2025.05.20",
    },
  ]

  // Filter job postings based on active tab
  const filteredJobs = activeTab === "all" ? jobPostings : jobPostings.filter((job) => job.status === activeTab)

  return (
    <div>
      <div className="grid grid-cols-5 border-b border-gray-200">
        {tableHeaders.map((header) => (
          <button
            key={header.value}
            className={`py-3 px-4 text-center font-medium transition-colors relative ${
              activeTab === header.value
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab(header.value)}
            aria-selected={activeTab === header.value}
            role="tab"
          >
            {header.label}
          </button>
        ))}
      </div>
      <div className="space-y-4 mt-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center py-8 text-gray-500">해당 탭에 표시할 채용공고가 없습니다.</div>
        )}
      </div>
    </div>
  )
}
