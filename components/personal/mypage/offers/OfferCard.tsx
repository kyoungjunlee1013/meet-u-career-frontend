import Image from "next/image"
import { MapPin, Calendar } from "lucide-react"

interface OfferProps {
  offer: {
    id: number
    company: string
    position: string
    location: string
    deadline: string
    description: string
    status: string
  }
}

export function OfferCard({ offer }: OfferProps) {
  // 상태 뱃지 InterviewCard 스타일로 통일
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "검토중":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="5" fill="currentColor" className="text-yellow-300" /></svg>
            검토중
          </span>
        )
      case "수락함":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-600">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            수락함
          </span>
        )
      case "거절함":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            거절함
          </span>
        )
      default:
        return null
    }
  }

  // 버튼 InterviewCard 스타일로 통일
  const getActionButtons = (status: string) => {
    if (status === "검토중") {
      return (
        <div className="flex space-x-2 mt-4">
          <button className="flex-1 py-2 px-4 bg-white border border-blue-500 text-blue-600 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors">
            수락하기
          </button>
          <button className="flex-1 py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
            거절하기
          </button>
        </div>
      )
    } else {
      return (
        <div className="mt-4">
          <button className="w-full py-2 px-4 bg-white border border-blue-500 text-blue-600 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors">
            상세 보기
          </button>
        </div>
      )
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full max-w-[350px] w-full mx-auto p-6">
      {/* 상단: 상태 뱃지 & 날짜 */}
      <div className="flex items-center justify-between mb-4">
        {getStatusBadge(offer.status)}
        <span className="text-xs text-gray-400 font-medium">{offer.deadline}</span>
      </div>
      {/* 회사/포지션 */}
      <div className="flex items-center mb-2">
        <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 mr-3">
          <Image
            src={`/images/etc/abstract-geometric-shapes.png?height=40&width=40&query=${offer.company} logo`}
            alt={`${offer.company} 로고`}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-base leading-tight">{offer.company}</h4>
          <p className="text-sm text-gray-600 mt-0.5">{offer.position}</p>
        </div>
      </div>
      {/* 상세 정보 */}
      <div className="flex flex-col gap-1 text-sm text-gray-700 mb-6 mt-2">
        <div className="flex items-center text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{offer.location}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span>제안일: {offer.deadline}</span>
        </div>
        {/* 담당자 정보(placeholder) */}
        <div className="flex items-center text-gray-500">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span>담당자 미정</span>
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-4">{offer.description}</p>
      {getActionButtons(offer.status)}
    </div>
  )
}
