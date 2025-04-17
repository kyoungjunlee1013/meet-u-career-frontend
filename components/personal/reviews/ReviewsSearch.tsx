import { Search } from "lucide-react"

export const ReviewsSearch = () => {
  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="기업명을 검색해보세요"
          className="w-full pl-4 pr-12 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button className="absolute right-0 top-0 h-full px-3 bg-blue-600 text-white rounded-r-md flex items-center justify-center">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
