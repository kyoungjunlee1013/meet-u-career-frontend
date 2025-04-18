import { InterviewReviewList } from "./InterviewReviewList"

export function InterviewReviewTab({ reviews, onEditReview, onViewReview }) {
  if (!reviews.length) {
    return <div className="text-center text-gray-400 py-8">등록된 면접 리뷰가 없습니다.</div>;
  }
  return (
    <div className="divide-y divide-gray-100">
      <InterviewReviewList reviews={reviews} onEditReview={onEditReview} onViewReview={onViewReview} />
    </div>
  );
}
