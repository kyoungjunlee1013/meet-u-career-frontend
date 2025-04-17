import Link from "next/link"

interface TextJobCardProps {
  title: string
  company: string
  viewCount: string
  small?: boolean
}

export const TextJobCard = ({ title, company, viewCount, small = false }: TextJobCardProps) => {
  return (
    <div className="group">
      <Link href="#" className="block">
        <div className={`${small ? "" : "border-b pb-2"}`}>
          {small && <div className="h-6 w-6 bg-gray-100 mb-2 rounded-sm"></div>}
          <h3 className={`text-xs font-medium mb-1 line-clamp-2 ${small ? "min-h-[2rem]" : ""}`}>{title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{company}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{viewCount}</span>
              <button className="text-gray-300 hover:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
