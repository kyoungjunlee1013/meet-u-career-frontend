"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { JobCard } from "./JobCard"
import { JobsFilter } from "./JobsFilter"

type JobDTO = {
  id: number
  name: string
  title: string
  location: { fullLocation: string }
  experienceLevel: number
  requirements: string
  expirationDate: string
  applyCount: number
  status: number
}

type Filters = {
  industry?: string
  experienceLevel?: number
  educationLevel?: number
  locationCode?: string
  keyword?: string
}

export const JobsList = () => {
  const [jobs, setJobs] = useState<JobDTO[]>([])
  const [filters, setFilters] = useState<Filters>({})
  const [sort, setSort] = useState<"newest"|"popular"|"recommended">("newest")

  const fetchJobs = async () => {
    const params = new URLSearchParams()

    // 필터 적용
    if (filters.industry) params.append("industry", filters.industry)
    if (filters.experienceLevel !== undefined) params.append("experienceLevel", filters.experienceLevel.toString())
    if (filters.educationLevel !== undefined) params.append("educationLevel", filters.educationLevel.toString())
    if (filters.keyword) params.append("keyword", filters.keyword)
  
    // locationCode 여러 개 처리
    if (filters.locationCode) {
      const codes = filters.locationCode.split(",")
      codes.forEach(code => params.append("locationCode", code))
    }
  
    params.append("sort", sort)
  
    const res = await fetch(`/api/personal/job/list?${params.toString()}`)
    const json = await res.json()
    setJobs(json.data)
  }

  useEffect(() => { fetchJobs() }, [filters, sort])

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">오늘의 채용공고</h2>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <button
            className={sort==="newest"?"underline":""}
            onClick={()=>setSort("newest")}
          >최신순</button>
          <button
            className={sort==="popular"?"underline":""}
            onClick={()=>setSort("popular")}
          >인기순</button>
          <button
            className={sort==="recommended"?"underline":""}
            onClick={()=>setSort("recommended")}
          >추천채용순</button>
        </div>
      </div>

      {/* 필터*/}
      <JobsFilter onApply={setFilters} />

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobs.map(job => (
          <JobCard
            key={job.id}
            name={job.name}
            title={job.title}
            location={job.location.fullLocation}
            requirements={`경력 ${job.experienceLevel}년`}
            viewCount={new Date(job.expirationDate).toLocaleDateString("ko-KR")}
            href={`/personal/jobs/${job.id}`}
            isRecommended={job.status===2}
            tag={job.applyCount > 0 ? `지원 ${job.applyCount}건` : undefined}
          />
        ))}
      </div>
    </div>
  )
}
