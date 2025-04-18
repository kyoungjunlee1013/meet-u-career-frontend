import { InterviewReviewCard } from "./InterviewReviewCard"

export function InterviewReviewList({ reviews, onEditReview, onViewReview }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {reviews.map((review) => (
        <div key={review.id} className="h-full">
          <div className="p-4 hover:bg-gray-50 transition-colors h-full">
            <InterviewReviewCard
              review={review}
              onEdit={() => onEditReview && onEditReview(review)}
              onView={() => onViewReview && onViewReview(review)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
