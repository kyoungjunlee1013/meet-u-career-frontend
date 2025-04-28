import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from "lucide-react"

interface PaymentsPaginationProps {
  page: number
  size: number
  totalPages: number
  totalElements: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export default function PaymentsPagination({
  page,
  size,
  totalPages,
  totalElements,
  onPageChange,
  onPageSizeChange,
}: PaymentsPaginationProps) {
  // 페이지 버튼 배열 생성
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i)
  const firstItem = totalElements === 0 ? 0 : page * size + 1
  const lastItem = Math.min((page + 1) * size, totalElements)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between">
      <div className="text-sm text-gray-500 mb-4 sm:mb-0">
        총 {totalElements}개 항목 중 {firstItem}-{lastItem}개 표시
      </div>

      <div className="flex items-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px mr-4" aria-label="Pagination">
          <button
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => onPageChange(0)}
            disabled={page === 0}
          >
            <span className="sr-only">First</span>
            <ChevronsLeft size={16} />
          </button>
          <button
            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => onPageChange(Math.max(page - 1, 0))}
            disabled={page === 0}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft size={16} />
          </button>
          {pageNumbers.map((num) => (
            <button
              key={num}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                num === page
                  ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
              onClick={() => onPageChange(num)}
              disabled={num === page}
            >
              {num + 1}
            </button>
          ))}
          <button
            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
          >
            <span className="sr-only">Next</span>
            <ChevronRight size={16} />
          </button>
          <button
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => onPageChange(totalPages - 1)}
            disabled={page >= totalPages - 1}
          >
            <span className="sr-only">Last</span>
            <ChevronsRight size={16} />
          </button>
        </nav>

        <div className="relative inline-block text-left">
          <div className="flex items-center border border-gray-300 rounded-md">
            <span className="text-gray-500 text-sm pl-3">페이지당 항목:</span>
            <select
              className="appearance-none bg-transparent py-2 pl-2 pr-8 text-gray-500 text-sm focus:outline-none"
              value={size}
              onChange={e => onPageSizeChange(Number(e.target.value))}
            >
              {[10, 20, 50, 100].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
