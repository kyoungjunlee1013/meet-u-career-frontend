import Link from "next/link"

interface JobCardProps {
  title: string
  company: string
  viewCount: string
  hasImage?: boolean
  hasTag?: boolean
}

export const JobCard = ({ title, company, viewCount, hasImage = false, hasTag = false }: JobCardProps) => {
  return (
    <div className="group relative">
      <Link href="#" className="block">
        <div className="bg-white border rounded-md overflow-hidden transition-all group-hover:shadow-md">
          {hasImage && (
            <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                <span className="text-gray-400">▶</span>
              </div>
              {hasTag && (
                <div className="absolute bottom-2 left-2 bg-yellow-400 text-xs font-medium px-2 py-0.5 rounded">
                  추천 TOP100
                </div>
              )}
            </div>
          )}
          <div className="p-3">
            {company && <div className="text-xs text-gray-500 mb-1">{company}</div>}
            <h3 className="text-sm font-medium mb-2 line-clamp-2 min-h-[2.5rem]">{title}</h3>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{viewCount}</span>
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
