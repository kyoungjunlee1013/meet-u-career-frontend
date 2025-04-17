import Link from "next/link"
import { Bookmark } from "lucide-react"

interface ImageJobCardProps {
  job: {
    id: number
    title: string
    company: string
    views: number
    isTop?: boolean
    isBookmarked: boolean
  }
}

export const ImageJobCard = ({ job }: ImageJobCardProps) => {
  return (
    <Link href={`/personal/jobs/${job.id}`} className="block">
      <div className="relative">
        <div className="bg-gray-100 h-48 rounded-md flex items-center justify-center">
          <span className="text-gray-400 text-xs">이미지</span>
        </div>
        {job.isTop && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded">추천 TOP100</div>
        )}
        <div className="mt-2">
          <h3 className="text-sm font-medium mb-1">{job.title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{job.views.toLocaleString()}</span>
            <button className="text-gray-400 hover:text-gray-600">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
