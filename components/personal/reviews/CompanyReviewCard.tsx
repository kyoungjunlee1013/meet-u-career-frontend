import { Star } from "lucide-react"

interface CompanyReview {
  id: number
  name: string
  rating: number
  reviewCount: number
  salaryAvg: string
  employeeCount: string
  workLifeBalance: number
  advancement: number
  culture: number
  benefits: number
  review: string
  date: string
}

interface CompanyReviewCardProps {
  review: CompanyReview
}

export const CompanyReviewCard = ({ review }: CompanyReviewCardProps) => {
  const renderRatingBar = (rating: number, label: string) => (
    <div className="flex items-center gap-2 mb-1">
      <div className="w-16 text-xs text-gray-600">{label}</div>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(rating / 5) * 100}%` }}></div>
      </div>
      <div className="w-6 text-xs text-gray-600 text-right">{rating.toFixed(1)}</div>
    </div>
  )

  return (
    <div className="bg-white border rounded-md p-4">
      <div className="flex mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-md mr-4"></div>
        <div>
          <h3 className="text-lg font-medium">{review.name}</h3>
          <div className="flex items-center gap-1 mb-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-medium">{review.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-500 ml-1">리뷰 {review.reviewCount}건</span>
            <span className="text-sm text-gray-500 mx-2">|</span>
            <span className="text-sm text-gray-500">평균연봉 {review.salaryAvg}</span>
            <span className="text-sm text-gray-500 mx-2">|</span>
            <span className="text-sm text-gray-500">재직중 {review.employeeCount}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          {renderRatingBar(review.workLifeBalance, "워라밸")}
          {renderRatingBar(review.advancement, "성장성")}
        </div>
        <div>
          {renderRatingBar(review.culture, "사내문화")}
          {renderRatingBar(review.benefits, "복지")}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-2">{review.review}</p>

      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">{review.date}</div>
        <button className="text-xs text-gray-600 border border-gray-300 rounded px-3 py-1 hover:bg-gray-50">
          자세히 보기
        </button>
      </div>
    </div>
  )
}
