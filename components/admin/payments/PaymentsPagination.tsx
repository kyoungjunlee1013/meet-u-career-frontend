import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from "lucide-react"

export default function PaymentsPagination() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between">
      <div className="text-sm text-gray-500 mb-4 sm:mb-0">총 100개 항목 중 1-10개 표시</div>

      <div className="flex items-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px mr-4" aria-label="Pagination">
          <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">First</span>
            <ChevronsLeft size={16} />
          </button>
          <button className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">Previous</span>
            <ChevronLeft size={16} />
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
            1
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            2
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            3
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            4
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            5
          </button>
          <button className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">Next</span>
            <ChevronRight size={16} />
          </button>
          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">Last</span>
            <ChevronsRight size={16} />
          </button>
        </nav>

        <div className="relative inline-block text-left">
          <div className="flex items-center border border-gray-300 rounded-md">
            <span className="text-gray-500 text-sm pl-3">페이지당 항목:</span>
            <select className="appearance-none bg-transparent py-2 pl-2 pr-8 text-gray-500 text-sm focus:outline-none">
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
