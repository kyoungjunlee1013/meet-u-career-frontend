import { Search, SlidersHorizontal } from "lucide-react"

export default function MembersSearch() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="이름, 이메일, 전화번호, 기업명 검색"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        필터
      </button>
    </div>
  )
}
