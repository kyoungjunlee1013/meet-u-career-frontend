"use client";

import { useEffect, useState } from "react";
import { InterviewTabs } from "./InterviewTabs";
import { InterviewStats } from "./InterviewStats";
import { InterviewReviewTab } from "./InterviewReviewTab";
import { InterviewStatusTab } from "./InterviewStatusTab";
import { ReviewModal } from "./review/ReviewModal";

import { INTERVIEWS, REVIEWS } from "@/dummy/interviews";

export default function InterviewsContent() {
  const [activeTab, setActiveTab] = useState<"reviews" | "status">("status");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<any | null>(null);

  // 리뷰 수정 시
  const handleEditReview = (review: any) => {
    setEditingReview(review);
    setReviewModalOpen(true);
  };

  // 리뷰 보기 시
  const handleViewReview = (review: any) => {
    setEditingReview(review);
    setReviewModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 pt-6">면접 현황</h1>

      {/* 📊 인터뷰 통계 */}
      <InterviewStats interviews={INTERVIEWS} />

      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* 탭 */}
        <InterviewTabs activeTab={activeTab} onTabChange={setActiveTab} counts={{}} />

        {/* 탭 콘텐츠 */}
        {activeTab === "reviews" ? (
          <InterviewReviewTab
            reviews={REVIEWS}
            onEditReview={handleEditReview}
            onViewReview={handleViewReview}
          />
        ) : (
          <InterviewStatusTab interviews={INTERVIEWS} />
        )}
      </div>

      {/* ✍ 리뷰 수정 모달 */}
      {reviewModalOpen && editingReview && (
        <ReviewModal
          review={editingReview}
          onClose={() => {
            setReviewModalOpen(false);
            setEditingReview(null);
          }}
        />
      )}
    </div>
  );
}
