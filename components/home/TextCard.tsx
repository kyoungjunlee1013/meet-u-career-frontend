import { BookmarkIcon } from "lucide-react"
import Link from "next/link"

interface TextCardProps {
  title: string
  category: string
  viewCount: string
  href: string
  showImage?: boolean
  small?: boolean
}

export const TextCard = ({ title, category, viewCount, href, showImage = false, small = false }: TextCardProps) => {
  return (
    <div className="group">
      <Link href={href} className="block">
        <div className="bg-white border rounded-md overflow-hidden transition-all group-hover:shadow-md">
          {showImage && (
            <div className="relative bg-gray-100 flex items-center justify-center">
              {small ? (
                <div className="w-full h-8 bg-gray-200"></div>
              ) : (
                <div className="w-full aspect-[4/3] bg-gray-200 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                    <span className="text-gray-400">▶</span>
                  </div>
                </div>
              )}
            </div>
          )}
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
