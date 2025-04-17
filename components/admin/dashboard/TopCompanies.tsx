import { Eye } from "lucide-react"

const companies = [
  {
    id: 1,
    name: "(주)네오플랫폼",
    description: "채용 플랫폼",
    count: "48개 채용공고",
  },
  {
    id: 2,
    name: "(주)클라우드시스템",
    description: "채용 플랫폼",
    count: "42개 채용공고",
  },
  {
    id: 3,
    name: "(주)디지털헬스",
    description: "채용 플랫폼",
    count: "36개 채용공고",
  },
  {
    id: 4,
    name: "(주)테크인사이트",
    description: "채용 플랫폼",
    count: "29개 채용공고",
  },
  {
    id: 5,
    name: "(주)모던테크랩",
    description: "채용 플랫폼",
    count: "23개 채용공고",
  },
]

export function TopCompanies() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">채용공고 상위 기업 TOP 5</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <Eye className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {companies.map((company) => (
          <div key={company.id} className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xs">(주)</span>
              </div>
            </div>
            <div className="flex-grow">
              <h4 className="text-sm font-medium">{company.name}</h4>
              <p className="text-xs text-gray-500">{company.count}</p>
            </div>
            <div className="flex-shrink-0 text-blue-500 font-medium">#{company.id}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
