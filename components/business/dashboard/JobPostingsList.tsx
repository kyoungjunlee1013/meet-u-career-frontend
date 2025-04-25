"use client"

import Link from "next/link"
import { Eye, Users } from "lucide-react"

interface JobPostingItem {
  jobPostingId: number
  title: string
  location: string
  postedDate: string
  deadline: string
  viewCount: number
  applicationCount: number
  industry: string
  jobType: string
  salaryRange: string
  keyword: string
}

interface Props {
  postings: JobPostingItem[]
}

export const JobPostingsList = ({ postings }: Props) => {
  return (
    <div className="bg-white rounded-md shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">채용공고 목록</h2>
        <div className="flex items-center space-x-2">
          <button className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
            채용공고 등록
          </button>
          <select className="border rounded-md text-sm px-2 py-1">
            <option>정렬: 최신순</option>
            <option>정렬: 마감임박</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {postings.map((job) => (
          <div
            key={job.jobPostingId}
            className="border rounded-md px-4 py-3 hover:shadow-sm transition bg-white"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-1">{job.title}</h3>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>📅 작성일: {job.postedDate}</li>
                  <li>⏳ 마감일: {job.deadline}</li>
                  <li>📍 지역: {job.location}</li>
                  <li>🏢 산업: {job.industry}</li>
                  <li>💼 형태: {job.jobType}</li>
                  <li>💰 연봉: {job.salaryRange}</li>
                  <li>🏷️ 키워드: {job.keyword}</li>
                </ul>
              </div>
              <div className="text-sm text-right text-gray-600 flex flex-col items-end">
                <div className="flex items-center space-x-1 mb-1">
                  <Eye className="w-4 h-4" />
                  <span>조회 {job.viewCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>지원 {job.applicationCount.toLocaleString()}</span>
                </div>
                <Link
                  href={`/business/jobs/${job.jobPostingId}`}
                  className="text-blue-500 text-sm font-medium mt-2 hover:underline"
                >
                  상세보기
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}