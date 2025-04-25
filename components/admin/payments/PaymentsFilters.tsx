import { Search, ChevronDown } from "lucide-react"

export interface PaymentsFiltersValue {
  status: string | number
  search: string
  searchType?: string
  startDate?: string
  endDate?: string
}

const statusLabelMap = {
  '': '전체',
  1: '성공',
  0: '실패',
}

interface PaymentsFiltersProps {
  value: PaymentsFiltersValue
  onChange: (value: PaymentsFiltersValue) => void
}

export default function PaymentsFilters({ value, onChange }: PaymentsFiltersProps) {
  // 핸들러: 각 필터 변경 시 상위로 값 전달
  const handleChange = (field: keyof PaymentsFiltersValue, val: string) => {
    onChange({ ...value, [field]: val })
  }
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      {/* 상태 */}
      <div className="relative w-full md:w-40">
        <select
          className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={value.status}
          onChange={e => handleChange("status", e.target.value)}
        >
          {Object.entries(statusLabelMap).map(([code, label]) => (
            <option key={code} value={code}>{label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
      </div>

      {/* 날짜 */}
      <div className="flex gap-2 items-center w-full md:w-auto">
        <input
          type="date"
          className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-40"
          value={value.startDate || ''}
          onChange={e => handleChange("startDate", e.target.value)}
          placeholder="시작일"
        />
        <span className="mx-1 text-gray-400">~</span>
        <input
          type="date"
          className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-40"
          value={value.endDate || ''}
          onChange={e => handleChange("endDate", e.target.value)}
          placeholder="종료일"
        />
      </div>

      {/* 검색 필터 드롭다운 + 검색 */}
      <div className="flex-1 flex items-center min-w-0 gap-2">
        <div className="relative w-32">
          <select
            className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={value.searchType || 'transactionId'}
            onChange={e => handleChange('searchType', e.target.value)}
          >
            <option value="transactionId">거래 ID</option>
            <option value="userName">사용자명</option>
            <option value="companyName">기업명</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={value.search}
            onChange={e => handleChange("search", e.target.value)}
            placeholder="검색어를 입력하세요"
          />
        </div>
        <button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors" onClick={() => onChange(value)}>
          검색
        </button>
      </div>
    </div>
  )
}

