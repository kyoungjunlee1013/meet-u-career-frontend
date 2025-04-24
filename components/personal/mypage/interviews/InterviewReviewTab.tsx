"use client";

import { InterviewReviewList } from "./InterviewReviewList";
import { InterviewReviewCard } from "./InterviewReviewCard";

interface Review {
  id: number;
  company: string;
  position: string;
  date: string;
  logo: string;
  jobCategory: string;
  careerLevel: number;
  interviewYearMonth: string;
  rating: number;
  difficulty: number;
  interviewType: number;
  interviewParticipants: number;
  questionsAsked: string;
}


interface Props {
  reviews: Review[];
  onEditReview: (review: Review) => void;
  onViewReview: (review: Review) => void;
}

export function InterviewReviewTab({ reviews, onEditReview, onViewReview }: Props) {
  if (!reviews.length) {
    return <div className="text-center text-gray-400 py-8">등록된 면접 리뷰가 없습니다.</div>;
  }
  return (
    <div className="divide-y divide-gray-100">
      <InterviewReviewList reviews={reviews} onEditReview={onEditReview} onViewReview={onViewReview} />
    </div>
  );
}
