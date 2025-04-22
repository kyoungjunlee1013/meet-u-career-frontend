// InterviewReviewCard.tsx

interface Review {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

interface InterviewReviewCardProps {
  review: Review; // ✅ review를 props로 받는다!
  onEdit?: (review: Review) => void;
  onView?: (review: Review) => void;
}

export function InterviewReviewCard({ review, onEdit, onView }: InterviewReviewCardProps) {
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h3 className="text-lg font-bold">{review.title}</h3>
      <p className="text-sm text-gray-600 mt-2">{review.content}</p>
      <div className="flex gap-2 mt-4">
        {onEdit && (
          <button
            onClick={() => onEdit(review)}
            className="text-blue-500 hover:underline"
          >
            수정
          </button>
        )}
        {onView && (
          <button
            onClick={() => onView(review)}
            className="text-gray-500 hover:underline"
          >
            보기
          </button>
        )}
      </div>
    </div>
  );
}
