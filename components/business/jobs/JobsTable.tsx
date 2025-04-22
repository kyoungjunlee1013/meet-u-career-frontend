"use client"

import { JobCard } from "@/components/business/jobs/JobCard"
import { useState } from "react"

interface JobsTableProps {
  jobs: any[];
  loading?: boolean;
  error?: string | null;
}

export const JobsTable = ({ jobs = [], loading = false, error = null }: JobsTableProps) => {
  const tableHeaders = [
    { label: "전체", value: "all" },
    { label: "진행 중", value: "active" },
    { label: "임시/반려", value: "draft_rejected" },
    { label: "종료", value: "ended" },
  ];

  const [activeTab, setActiveTab] = useState("all");

  // status 필터 매핑 (추천 그룹핑)
  const statusFilterMap: Record<string, number[]|null> = {
    all: null,
    active: [1,2,4],           // 승인 대기, 게시 중, 승인 완료
    draft_rejected: [0,3],     // 임시 저장, 반려됨
    ended: [5],                // 게시 종료
  };

  const filter = statusFilterMap[activeTab];
  const filteredJobs = !filter ? jobs : jobs.filter(job => filter.includes(job.status));

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
