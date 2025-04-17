import Link from "next/link"
import { ExternalLink } from "lucide-react"

export const NewsSidebar = () => {
  const newsItems = [
    {
      id: 1,
      title: "IT 취업시장 동향: 2025년 상반기 전망",
      category: "테크뉴스",
      date: "2025-03-26",
      url: "/news/1",
    },
    {
      id: 2,
      title: "개발자 연봉 상승세",
      category: "IT채용정보",
      date: "2025-03-25",
      url: "/news/2",
    },
    {
      id: 3,
      title: "재택근무 확산 트렌드",
      category: "비즈니스 트렌드",
      date: "2025-03-24",
      url: "/news/3",
    },
  ]

  const popularTags = ["#개발", "#이직", "#취업"]

  return (
    <div>
      <div className="bg-white border rounded-md p-4 mb-6">
        <h2 className="text-lg font-medium mb-4">최신 뉴스</h2>
        <ul className="space-y-4">
          {newsItems.map((item) => (
            <li key={item.id}>
              <Link href={item.url} className="group block">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-medium group-hover:text-blue-600">{item.title}</h3>
                  <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{item.category}</span>
                  <span className="mx-1">•</span>
                  <span>{item.date}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white border rounded-md p-4">
        <h2 className="text-lg font-medium mb-4">인기 해시태그</h2>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/personal/community/tag/${tag.substring(1)}`}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
