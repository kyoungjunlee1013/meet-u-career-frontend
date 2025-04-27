import { Bookmark, Eye } from "lucide-react"
import Link from "next/link"

interface Company {
  id: number
  name: string
  logo: string
  totalReviews: number
  viewCount: number
  description: string
}

export const CompanyReviewList = () => {
  const companies: Company[] = [
    {
      id: 1,
      name: "현대자동차(주)",
      logo: "/stylized-oval-badge.png",
      totalReviews: 137,
      viewCount: 176123,
      description: "#리더의 책임 기술 #워라밸좋음 #커리어성장 #복지 기업 등 137건",
    },
    {
      id: 2,
      name: "(주)네이버...",
      logo: "/naver-logo-display.png",
      totalReviews: 103,
      viewCount: 97807,
      description: "#리더의 책임 #워라밸좋음 #커리어성장 기업 등 103건",
    },
    {
      id: 3,
      name: "현대모비스(주)",
      logo: "/hyundai-mobis-corporate-identity.png",
      totalReviews: 127,
      viewCount: 112266,
      description: "#리더의 책임 기술 #워라밸 Excellent #커리어성장 #복지 기업 등 127건",
    },
    {
      id: 4,
      name: "우아(우)",
      logo: "/stylized-woowa-logo.png",
      totalReviews: 103,
      viewCount: 94509,
      description: "#리더의 책임 기술 #워라밸좋음 #연차 #복리후생 연봉 등 103건",
    },
  ]

  return (
    <div className="py-10">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">전체 기업리뷰</h2>

        <div className="flex flex-wrap gap-2 mb-6">
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">기본순</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">#리더의 책임 기술</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">#워라밸좋음</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">#커리어성장 기회</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">#워라밸 Excellent</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">#복리후생 좋음</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200 flex items-center">
            더보기 <span className="ml-1">▾</span>
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <div className="relative">
            <select className="appearance-none bg-white border rounded-md px-4 py-1 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>최신순</option>
              <option>인기순</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {companies.map((company) => (
            <div key={company.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={company.logo || "/images/etc/placeholder.svg"}
                    alt={`${company.name} 로고`}
                    className="w-10 h-10 mr-4"
                  />
                  <div>
                    <Link href={`/personal/reviews/${company.id}`} className="font-medium hover:text-blue-600">
                      {company.name}
                    </Link>
                    <p className="text-xs text-gray-500">리뷰 개수: {company.totalReviews}건</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{company.viewCount.toLocaleString()}</span>
                  </div>
                  <button className="text-gray-400 hover:text-yellow-500">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{company.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <nav className="inline-flex">
            <button className="px-3 py-1 border rounded-l-md bg-blue-50 border-blue-500 text-blue-600">1</button>
            <button className="px-3 py-1 border-t border-b border-r text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border-t border-b border-r text-gray-600 hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border-t border-b border-r text-gray-600 hover:bg-gray-50">4</button>
            <button className="px-3 py-1 border-t border-b border-r text-gray-600 hover:bg-gray-50">5</button>
            <button className="px-3 py-1 border-t border-b border-r rounded-r-md text-gray-600 hover:bg-gray-50">
              다음
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
