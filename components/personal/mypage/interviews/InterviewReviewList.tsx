import { InterviewReviewCard } from "./InterviewReviewCard"

export function InterviewReviewList() {
  const reviews = [
    {
      id: 1,
      company: "테크스타트(주)",
      position: "프론트엔드 개발자",
      date: "2023-06-10",
      difficulty: "중간",
      result: "합격",
      logo: "/abstract-company-logo.png",
    },
    {
      id: 2,
      company: "글로벌소프트(주)",
      position: "백엔드 개발자",
      date: "2023-06-05",
      difficulty: "어려움",
      result: "불합격",
      logo: "/abstract-corporate-logo.png",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {reviews.map((review) => (
        <div key={review.id} className="h-full">
          <div className="p-4 hover:bg-gray-50 transition-colors h-full">
            <InterviewReviewCard review={review} />
          </div>
        </div>
      ))}
    </div>
  )
}
