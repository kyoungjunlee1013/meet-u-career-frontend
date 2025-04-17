import { BookmarkIcon } from "lucide-react"
import Link from "next/link"

interface ImageCardProps {
  title: string
  category: string
  viewCount: string
  tag?: string
  href: string
}

export const ImageCard = ({ title, category, viewCount, tag, href }: ImageCardProps) => {
  return (
    <div className="group">
      <Link href={href} className="block">
        <div className="bg-white border rounded-md overflow-hidden transition-all group-hover:shadow-md">
          <div className="relative aspect-[4/3] bg-gray-200 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
              <span className="text-gray-400">▶</span>
            </div>
            {tag && (
              <div className="absolute bottom-2 left-2 bg-yellow-400 text-xs font-medium px-2 py-0.5 rounded">
                {tag}
              </div>
            )}
          </div>
          <div className="p-3">
            <div className="text-xs text-gray-500 mb-1">{category}</div>
            <h3 className="text-sm font-normal mb-2 line-clamp-2 min-h-[2.5rem]">{title}</h3>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{viewCount}</span>
              <BookmarkIcon className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
