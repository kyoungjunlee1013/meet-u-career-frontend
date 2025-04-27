import { BookmarkIcon } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
  name: string
  title: string
  location: string
  requirements: string
  viewCount: string
  href: string
  tag?: string
  isRecommended?: boolean
}

export const JobCard = ({
  name,
  title,
  location,
  requirements,
  viewCount,
  href,
  tag,
  isRecommended = false,
}: JobCardProps) => (
  <div className="group">
    <Link href={href} className="block">
      <div className="bg-white border rounded-md overflow-hidden transition-all group-hover:shadow-md h-[195px]"> {/*h-full*/}
        <div className="p-4">
          {isRecommended && (
            <div className="inline-block bg-[#15274a] text-white text-xs px-2 py-0.5 rounded mb-2">
              추천 채용공고
            </div>
          )}
          <div className="flex mb-2">
            <div className="w-10 h-10 bg-gray-200 rounded-md mr-2 flex-shrink-0"></div>
            <div>
              <div className="text-xs text-gray-500">{name}</div>
              <h3 className="text-sm font-medium">{title}</h3>
            </div>
          </div>
          <ul className="text-xs text-gray-600 space-y-1 mb-2">
            <li className="flex items-start">
              <span className="mr-1">•</span>
              <span>지역: {location}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-1">•</span>
              <span>요건: {requirements}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-1">•</span>
              <span>마감일: ~{viewCount}</span>
            </li>
          </ul>
          <div className="flex items-center justify-end text-xs text-gray-400">
            <BookmarkIcon className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </Link>
  </div>
)
