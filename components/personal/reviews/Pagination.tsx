import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-1 my-8">
      <Link
        href="/personal/reviews?page=1"
        className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-600 text-white text-sm"
      >
        1
      </Link>
      <Link
        href="/personal/reviews?page=2"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm"
      >
        2
      </Link>
      <Link
        href="/personal/reviews?page=3"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm"
      >
        3
      </Link>
      <Link
        href="/personal/reviews?page=4"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm"
      >
        4
      </Link>
      <Link
        href="/personal/reviews?page=5"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm"
      >
        5
      </Link>
      <span className="mx-1">...</span>
      <Link
        href="/personal/reviews?page=10"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm"
      >
        10
      </Link>
      <Link
        href="/personal/reviews?page=2"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm ml-1"
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
