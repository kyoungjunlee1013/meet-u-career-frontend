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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <Building className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-gray-900">{company.name}</h3>
            <p className="text-sm text-gray-500">
              {company.category} | {company.size}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">위치: {company.location}</span>
          </div>
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">차단 일자: {company.blockedDate}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <button
          className="w-full py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
          aria-label={`${company.name} 차단 해제하기`}
        >
          차단해제
        </button>
      </div>
    </div>
  )
}
