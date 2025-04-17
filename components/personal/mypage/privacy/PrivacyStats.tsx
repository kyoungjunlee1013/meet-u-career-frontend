import { X, Calendar } from "lucide-react"

export function PrivacyStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <X className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <p className="text-sm text-gray-500">열람 차단 기업</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-600">15</span>
            </div>
            <p className="text-sm text-gray-500">이번 달 열람 수</p>
          </div>
        </div>
      </div>
    </div>
  )
}
