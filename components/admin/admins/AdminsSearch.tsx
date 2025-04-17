import { Search, SlidersHorizontal } from "lucide-react"

export default function AdminsSearch() {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="이름, 이메일, 부서 검색"
        />
      </div>
      <button className="inline-flex items-center px-3 py-2.5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">
        <SlidersHorizontal className="w-4 h-4 mr-2" />
        필터
      </button>
    </div>
  )
}
