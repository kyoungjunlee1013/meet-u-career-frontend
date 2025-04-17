import { Search } from "lucide-react"

export const ApplicationsSearch = () => {
  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="search"
        className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
        placeholder="기업명, 공고 검색"
        aria-label="기업명, 공고 검색"
      />
    </div>
  )
}
