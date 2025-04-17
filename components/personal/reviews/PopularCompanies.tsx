import Link from "next/link"
import { PenLine } from "lucide-react"

export const PopularCompanies = () => {
  const popularCompanies = [
    { id: 1, name: "삼성전자", count: 2345 },
    { id: 2, name: "LG전자", count: 1876 },
    { id: 3, name: "SK하이닉스", count: 1543 },
    { id: 4, name: "현대자동차", count: 1432 },
    { id: 5, name: "네이버", count: 1245 },
    { id: 6, name: "카카오", count: 987 },
    { id: 7, name: "우아한형제들", count: 892 },
    { id: 8, name: "라인플러스", count: 756 },
    { id: 9, name: "토스", count: 678 },
    { id: 10, name: "배달의민족", count: 645 },
  ]

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-medium mb-4">인기 기업</h2>
        <ul className="space-y-2">
          {popularCompanies.map((company) => (
            <li key={company.id} className="flex justify-between items-center">
              <Link href={`/personal/reviews/company/${company.id}`} className="text-sm hover:text-blue-600">
                {company.name}
              </Link>
              <span className="text-xs text-blue-600">{company.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">리뷰 작성하기</h3>
        <p className="text-xs text-gray-600 mb-4">직장인이라면 누구나 자신의 회사를 평가할 수 있습니다</p>
        <Link
          href="/personal/reviews/write"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white rounded-md py-2 text-sm hover:bg-blue-700"
        >
          <PenLine className="h-4 w-4" />
          <span>리뷰 작성하기</span>
        </Link>
      </div>

      <div className="mt-8">
        <h3 className="text-xs text-gray-500 mb-2">기업리뷰 광고 문의</h3>
      </div>
    </div>
  )
}
