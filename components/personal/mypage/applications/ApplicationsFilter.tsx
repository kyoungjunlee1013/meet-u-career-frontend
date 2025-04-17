import { ChevronDown, LayoutGrid } from "lucide-react"

export const ApplicationsFilter = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <button
          type="button"
          className="flex items-center justify-between w-32 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span>전체 기간</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
      </div>
      <div className="relative">
        <button
          type="button"
          className="flex items-center justify-between w-32 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span>최신순</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
      </div>
      <button
        type="button"
        className="p-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="필터"
      >
        <LayoutGrid className="w-5 h-5" />
      </button>
    </div>
  )
}
