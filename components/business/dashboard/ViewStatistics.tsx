import { Eye, Users } from "lucide-react"

export const ViewStatistics = () => {
  return (
    <div className="bg-white rounded-md shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">채용 현황</h2>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Eye className="h-5 w-5 text-blue-500 mr-2" />
            <span className="font-medium">조회 현황</span>
          </div>

          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="138.16"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#84cc16"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="75.36"
                  strokeDashoffset="138.16"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  transform="rotate(18 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">12,450</span>
                <span className="text-sm text-gray-500">명</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
              <span className="text-xs">프론트엔드 개발자</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
              <span className="text-xs">백엔드 개발자</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-sm mr-2"></div>
              <span className="text-xs">인사팀 HRM</span>
            </div>
            <div className="text-xs text-right">45%</div>
            <div className="text-xs text-right">30%</div>
            <div className="text-xs text-right">25%</div>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 text-blue-500 mr-2" />
            <span className="font-medium">지원자 현황</span>
          </div>

          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="125.6"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="75.36"
                  strokeDashoffset="125.6"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="50.24"
                  transform="rotate(30 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">387</span>
                <span className="text-sm text-gray-500">명</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
              <span className="text-xs">프론트엔드 개발자</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-sm mr-2"></div>
              <span className="text-xs">백엔드 개발자</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pink-500 rounded-sm mr-2"></div>
              <span className="text-xs">인사팀 HRM</span>
            </div>
            <div className="text-xs text-right">50%</div>
            <div className="text-xs text-right">30%</div>
            <div className="text-xs text-right">20%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
