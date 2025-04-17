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
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "검토중":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">검토중</span>
      case "수락함":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">수락함</span>
      case "거절함":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">거절함</span>
      default:
        return null
    }
  }

  const getActionButtons = (status: string) => {
    if (status === "검토중") {
      return (
        <div className="flex space-x-2 mt-4">
          <button className="flex-1 py-2 px-4 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            수락하기
          </button>
          <button className="flex-1 py-2 px-4 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            거절하기
          </button>
        </div>
      )
    } else {
      return (
        <div className="mt-4">
          <button className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            기업 상세보기
          </button>
        </div>
      )
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-14 h-14 bg-gray-200 rounded overflow-hidden">
              <Image
                src={`/abstract-geometric-shapes.png?height=56&width=56&query=${offer.company} logo`}
                alt={`${offer.company} 로고`}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{offer.company}</h3>
              {getStatusBadge(offer.status)}
            </div>
            <p className="text-base text-gray-600 mt-1">{offer.position}</p>

            <div className="flex items-center mt-2 text-sm text-gray-500">
              <div className="flex items-center mr-6">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{offer.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>제안일: {offer.deadline}</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-700">{offer.description}</p>

            {getActionButtons(offer.status)}
          </div>
        </div>
      </div>
    </div>
  )
}
