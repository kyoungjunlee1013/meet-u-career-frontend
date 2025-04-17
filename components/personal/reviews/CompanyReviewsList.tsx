import { CompanyReviewCard } from "./CompanyReviewCard"
import { Pagination } from "./Pagination"
import Link from "next/link"

export const CompanyReviewsList = () => {
  const companyReviews = [
    {
      id: 1,
      name: "네이버",
      rating: 4.5,
      reviewCount: 1945,
      salaryAvg: "5,000만원",
      employeeCount: "3천명 이상",
      workLifeBalance: 4.2,
      advancement: 3.9,
      culture: 4.7,
      benefits: 4.1,
      review: "복지가 좋고 회사분위기 잘 어우러져 일하기다. 성장 가능성도 좋습니다.",
      date: "2023.12.15",
    },
    {
      id: 2,
      name: "카카오",
      rating: 4.3,
      reviewCount: 1621,
      salaryAvg: "5,000만원",
      employeeCount: "3천명 이상",
      workLifeBalance: 4.0,
      advancement: 3.7,
      culture: 4.5,
      benefits: 4.2,
      review: "자유로운 분위기에 좋은 복지가 장점입니다. 다만 업무 강도가 높은 편입니다.",
      date: "2023.12.10",
    },
    {
      id: 3,
      name: "라인플러스",
      rating: 4.2,
      reviewCount: 756,
      salaryAvg: "5,000만원",
      employeeCount: "1천명 이상",
      workLifeBalance: 4.1,
      advancement: 3.8,
      culture: 4.0,
      benefits: 4.3,
      review: "글로벌 환경에서 일할 수 있는 좋은 기회를 제공합니다. 복지와 업무 수준이 좋습니다.",
      date: "2023.12.05",
    },
    {
      id: 4,
      name: "우아한형제들",
      rating: 3.8,
      reviewCount: 892,
      salaryAvg: "4,000만원",
      employeeCount: "4천명 이상",
      workLifeBalance: 3.5,
      advancement: 3.6,
      culture: 4.2,
      benefits: 3.7,
      review: "배달의 민족이라는 확실한 성장을 할 수 있습니다. 다만 업무 강도가 높은 편입니다.",
      date: "2023.12.01",
    },
    {
      id: 5,
      name: "토스",
      rating: 4.6,
      reviewCount: 678,
      salaryAvg: "5,000만원",
      employeeCount: "2천명 이상",
      workLifeBalance: 4.3,
      advancement: 4.2,
      culture: 4.7,
      benefits: 4.5,
      review: "핀테크의 선두주자 금융 산업 기술력이 있는 회사입니다. 복지와 급여가 매우 좋습니다.",
      date: "2023.11.28",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">인기업체 TOP 100</h2>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <Link href="/personal/reviews/newest" className="text-blue-600 font-medium">
            최신순
          </Link>
          <Link href="/personal/reviews/popular" className="hover:text-blue-600">
            인기순위순
          </Link>
          <Link href="/personal/reviews/rating" className="hover:text-blue-600">
            평가순
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        {companyReviews.map((review) => (
          <CompanyReviewCard key={review.id} review={review} />
        ))}
      </div>
      <Pagination />
    </div>
  )
}
