import Image from "next/image"

interface Review {
  id: number
  company: string
  position: string
  date: string
  difficulty: string
  result: string
  logo: string
}

interface InterviewReviewCardProps {
  review: Review
}

export function InterviewReviewCard({ review }: InterviewReviewCardProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-4">
        <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
          <Image
            src={review.logo || "/placeholder.svg"}
            alt={review.company}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{review.company}</h4>
          <p className="text-sm text-gray-600 mt-1">{review.position}</p>
          <p className="text-sm text-gray-500 mt-1">{review.date}</p>
          <div className="flex space-x-2 mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              난이도: {review.difficulty}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                review.result === "합격" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {review.result}
            </span>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors">
          상세보기
        </button>
        <button className="text-sm bg-gray-50 text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
          수정
        </button>
      </div>
    </div>
  )
}
