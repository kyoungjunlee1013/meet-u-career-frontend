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
    <>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
            <Image
              src={interview.logo || "/placeholder.svg"}
              alt={interview.company}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{interview.company}</h4>
            <p className="text-sm text-gray-600 mt-1">{interview.position}</p>
            <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
            <div className="mt-2">
              <InterviewStatusBadge status={interview.status} />
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          {interview.status === "scheduled" ? (
            <>
              <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors">
                일정 변경
              </button>
              <button className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors">
                취소
              </button>
            </>
          ) : (
            <button
              className="text-sm bg-green-50 text-green-600 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              후기 작성
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ReviewModal
          onClose={() => setIsModalOpen(false)}
          interview={{
            id: interview.id,
            company: interview.company,
            position: interview.position,
            date: interview.date,
            location: interview.location || "",
            time: interview.time || "",
            interviewer: interview.interviewer || "",
            status: interview.status,
            hasReview: interview.hasReview,
          }}
        />
      )}
    </>
  )
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
