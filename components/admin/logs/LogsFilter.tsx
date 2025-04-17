import { Calendar, Search, ChevronDown } from "lucide-react"

export default function LogsFilter() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
          <input type="text" placeholder="시작일" className="pl-10 pr-4 py-2 border rounded-md w-full md:w-32" />
        </div>
        <span className="text-gray-500">~</span>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
          <input type="text" placeholder="종료일" className="pl-10 pr-4 py-2 border rounded-md w-full md:w-32" />
        </div>
      </div>

      <div className="relative">
        <select className="appearance-none pl-4 pr-10 py-2 border rounded-md w-full md:w-40">
          <option value="">전체</option>
          <option value="security">보안</option>
          <option value="transaction">트랜잭션</option>
          <option value="system">시스템</option>
          <option value="user">사용자</option>
          <option value="error">오류</option>
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="로그 검색 (계정, 유형, 상세 내용)"
            className="w-full pl-4 pr-10 py-2 border rounded-l-md"
          />
        </div>
        <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 border border-l-0 rounded-r-md flex items-center">
          <Search className="h-5 w-5 text-gray-500" />
          <span className="ml-1">검색</span>
        </button>
      </div>
    </div>
  )
}
