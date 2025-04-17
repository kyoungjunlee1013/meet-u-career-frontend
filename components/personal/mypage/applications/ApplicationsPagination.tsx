import { ChevronLeft, ChevronRight } from "lucide-react"

export const ApplicationsPagination = () => {
  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a
          href="#"
          className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
        >
          <span className="sr-only">이전</span>
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </a>
        <a
          href="#"
          aria-current="page"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600"
        >
          1
        </a>
        <a
          href="#"
          className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
        >
          <span className="sr-only">다음</span>
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </a>
      </nav>
    </div>
  )
}
