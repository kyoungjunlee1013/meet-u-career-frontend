import Link from "next/link"

export const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-1 my-8">
      <Link
        href="/personal/jobs?page=1"
        className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-500 text-white text-sm"
      >
        1
      </Link>
      <Link
        href="/personal/jobs?page=2"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm"
      >
        2
      </Link>
      <Link
        href="/personal/jobs?page=3"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm"
      >
        3
      </Link>
      <Link
        href="/personal/jobs?page=4"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm"
      >
        4
      </Link>
      <Link
        href="/personal/jobs?page=5"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm"
      >
        5
      </Link>
      <span className="text-sm text-gray-500">...</span>
      <Link
        href="/personal/jobs?page=10"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm"
      >
        10
      </Link>
      <Link
        href="/personal/jobs?page=2"
        className="px-2 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm"
      >
        다음
      </Link>
    </div>
  )
}
