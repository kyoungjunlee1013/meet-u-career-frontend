import Image from "next/image"

interface Review {
  id: number
  company: string
  position: string
  date: string
  difficulty: number
  result: number
  logo: string
}

interface InterviewReviewCardProps {
  review: Review,
  onEdit?: () => void,
  onView?: () => void,
}

const resultMap = ["불합격", "합격", "대기중"];
const resultBadgeClass = [
  "bg-red-100 text-red-600",
  "bg-green-100 text-green-600",
  "bg-yellow-100 text-yellow-600"
];

export function InterviewReviewCard({ review, onEdit, onView }: InterviewReviewCardProps) {
  const getResultBadge = (result: number) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${resultBadgeClass[result]}`}>
      {resultMap[result]}
    </span>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full max-w-[350px] w-full mx-auto p-6">
      {/* 상단: 결과 뱃지 & 날짜 */}
      <div className="flex items-center justify-between mb-4">
        {getResultBadge(review.result)}
        <span className="text-xs text-gray-400 font-medium">{review.date}</span>
      </div>
      {/* 회사/포지션 */}
      <div className="flex items-center mb-2">
        <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 mr-3">
          <Image
            src={review.logo || "/placeholder.svg"}
            alt={review.company}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-base leading-tight">{review.company}</h4>
          <p className="text-sm text-gray-600 mt-0.5">{review.position}</p>
        </div>
      </div>
      {/* 난이도 뱃지 */}
      <div className="flex items-center text-gray-500 gap-2 mb-6 mt-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          난이도: {review.difficulty}
        </span>
      </div>
      {/* 버튼 */}
      <div className="flex space-x-2 mt-auto">
        <button className="flex-1 py-2 px-4 bg-white border border-blue-500 text-blue-600 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors" onClick={onView}>
          상세보기
        </button>
        <button className="flex-1 py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors" onClick={onEdit}>
          수정
        </button>
      </div>
    </div>
  )
}
