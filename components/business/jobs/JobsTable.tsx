"use client"

import { useEffect, useState } from "react"
import axios from "axios"
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
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    setLoading(true)
    axios.get('/api/business/job/my-list')
      .then(res => {
        setJobs(res.data.data || [])
        setError(null)
      })
      .catch(err => {
        setError("공고 목록을 불러오지 못했습니다.")
      })
      .finally(() => setLoading(false))
  }, [])

  // status 필터 매핑 (필요시 확장)
  const statusFilterMap: Record<string, number[]|null> = {
    "all": null,
    "지원됨": [], // 실제 status 코드 필요시 수정
    "승인 대기": [1],
    "게시 중": [4],
    "반려됨": [2,5],
  }
  const filter = statusFilterMap[activeTab]
  const filteredJobs = !filter ? jobs : jobs.filter(job => filter.includes(job.status))

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
        {loading ? (
          <div className="text-center py-8 text-gray-400">로딩 중...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={{
                id: job.id,
                title: job.title,
                status: job.status, // 숫자 그대로 넘기고, 필요시 JobCard에서 변환
                statusLabel: job.statusLabel,
                location: job.locationName,
                salary: job.salaryRange,
                workType: job.jobType,
                experience: (() => {
                  switch (job.experienceLevel) {
                    case 1: return "신입";
                    case 2: return "경력";
                    case 3: return "신입/경력";
                    default: return "";
                  }
                })(),
                deadline: job.expirationDate ? String(job.expirationDate).slice(0, 10) : '',
                views: job.viewCount,
                applicants: job.applyCount,
                description: job.description,
                companyName: job.companyName,
                // 필요시 추가 필드
              }}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">해당 탭에 표시할 채용공고가 없습니다.</div>
        )}
      </div>
    </div>
  )
}
