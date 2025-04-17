"use client"

import { useState } from "react"
import { Maximize2 } from "lucide-react"

const popularJobs = [
  {
    id: 1,
    title: "프론트엔드 개발자 채용",
    company: "(주)테크솔루션",
    applications: { current: 87, total: 100 },
    badge: "신규",
  },
  {
    id: 2,
    title: "백엔드 개발자 모집",
    company: "(주)클라우드시스템",
    applications: { current: 76, total: 100 },
    badge: "신규",
  },
  {
    id: 3,
    title: "UX/UI 디자이너",
    company: "(주)디자인허브",
    applications: { current: 65, total: 100 },
    badge: "신규",
  },
  {
    id: 4,
    title: "데이터 분석가 채용",
    company: "(주)데이터인사이트",
    applications: { current: 56, total: 100 },
    badge: "신규",
  },
  {
    id: 5,
    title: "마케팅 매니저 모집",
    company: "(주)브랜드마케팅",
    applications: { current: 52, total: 100 },
    badge: "신규",
  },
]

export function PopularJobPostings() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">인기 채용공고</h3>
        <div className="flex items-center">
          <button className="text-sm text-blue-500 mr-4">모두 보기</button>
          <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-gray-600">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {popularJobs.map((job) => (
          <div key={job.id}>
            <div className="flex justify-between items-center mb-2">
              <div>
                <div className="font-medium">{job.title}</div>
                <div className="text-sm text-gray-500">{job.company}</div>
              </div>
              <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">{job.badge}</div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(job.applications.current / job.applications.total) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-xs mt-1">
              <div>지원자: {job.applications.current}</div>
              <div>지원자: {job.applications.total}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
