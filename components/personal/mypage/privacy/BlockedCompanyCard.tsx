import { Building, MapPin, Calendar } from "lucide-react"

interface Company {
  id: number
  name: string
  category: string
  size: string
  location: string
  blockedDate: string
}

interface BlockedCompanyCardProps {
  company: Company
}

export function BlockedCompanyCard({ company }: BlockedCompanyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full max-w-[350px] w-full mx-auto p-6">
      {/* 상단: 빌딩 아이콘 & 회사명 */}
      <div className="flex items-center mb-4">
        <Building className="h-6 w-6 text-gray-500 mr-2" />
        <h3 className="font-bold text-gray-900 text-base leading-tight">{company.name}</h3>
      </div>
      {/* 상세 정보 */}
      <div className="flex flex-col gap-2 text-sm text-gray-700 mb-6 mt-2">
        <div className="flex items-center text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{company.location}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span>차단 일자: {company.blockedDate}</span>
        </div>
      </div>
      {/* 버튼 */}
      <div className="flex mt-auto">
        <button
          className="flex-1 py-2 px-4 bg-white border border-blue-500 text-blue-600 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors"
          aria-label={`${company.name} 차단 해제하기`}
        >
          차단해제
        </button>
      </div>
    </div>
  )
}
