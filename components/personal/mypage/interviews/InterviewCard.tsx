"use client"
import Image from "next/image"
import { useState } from "react"
import { ReviewModal } from "./review/ReviewModal"

// Update the styling to match other mypage card components
// Keep the component structure and functionality the same

interface Interview {
  id: number
  company: string
  position: string
  date: string
  status: "scheduled" | "completed" | "canceled"
  logo: string
  location?: string
  time?: string
  interviewer?: string
  hasReview?: boolean
}

interface InterviewCardProps {
  interview: Interview
}

export function InterviewCard({ interview }: InterviewCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formattedDate = new Date(interview.date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full max-w-[350px] w-full mx-auto p-6">
      {/* 상단: 상태 뱃지 & 날짜 */}
      <div className="flex items-center justify-between mb-4">
        <InterviewStatusBadge status={interview.status} />
        <span className="text-xs text-gray-400 font-medium">{formattedDate.split(' ')[0]}</span>
      </div>
      {/* 회사/포지션 */}
      <div className="flex items-center mb-2">
        <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 mr-3">
          <Image
            src={interview.logo || "/placeholder.svg"}
            alt={interview.company}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-base leading-tight">{interview.company}</h4>
          <p className="text-sm text-gray-600 mt-0.5">{interview.position}</p>
        </div>
      </div>
      {/* 상세 정보 */}
      <div className="flex flex-col gap-1 text-sm text-gray-700 mb-6 mt-2">
        {interview.location && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-4.03-8-9 0-3.866 3.134-7 7-7s7 3.134 7 7c0 4.97-3.582 9-8 9z" /><circle cx="12" cy="12" r="3" /></svg>
            <span>{interview.location}</span>
          </div>
        )}
        {interview.time && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
            <span>{interview.time}</span>
          </div>
        )}
        {interview.interviewer && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 14a4 4 0 1 0-8 0M12 18c-4.418 0-8 1.79-8 4v1h16v-1c0-2.21-3.582-4-8-4z" /></svg>
            <span>{interview.interviewer}</span>
          </div>
        )}
      </div>
      {/* 하단 버튼 */}
      <div className="mt-auto">
        <button className="w-full border border-blue-500 text-blue-600 font-medium rounded-lg py-2 transition-colors hover:bg-blue-50">
          상세 보기
        </button>
      </div>
    </div>
  );
}

function InterviewStatusBadge({ status }: { status: "scheduled" | "completed" | "canceled" }) {
  switch (status) {
    case "scheduled":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
          </svg>
          면접 예정
        </span>
      )
    case "completed":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-600">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          면접 완료
        </span>
      )
    case "canceled":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          면접 취소
        </span>
      )
    default:
      return null
  }
}
