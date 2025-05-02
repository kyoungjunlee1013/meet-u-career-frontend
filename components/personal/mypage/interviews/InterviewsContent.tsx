"use client";

import { useState, useEffect, useMemo } from "react";
import { apiClient } from "@/api/apiClient";
import { InterviewTabs } from "./InterviewTabs";
import { InterviewStatusTab } from "./InterviewStatusTab";
import InterviewReviewTab from "./InterviewReviewTab";
import { InterviewStats } from "./InterviewStats";
import { ReviewModal } from "./review/ReviewModal";
import { ReviewDetailModal } from "./ReviewDetailModal";
import { Interview } from "@/types/interview";

// ✅ 리뷰 타입
import { Review } from "@/components/types/review";






export function InterviewsContent() {
  const [activeTab, setActiveTab] = useState("status");
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Interview | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [viewingReview, setViewingReview] = useState<Review | null>(null);

  const fetchInterviews = async () => {
    try {
      const res = await apiClient.get("/api/personal/mypage/applications"); // 올바른 GET 요청
      console.log("지원 내역 + 리뷰 가능 여부 확인 (raw):", JSON.stringify(res.data, null, 2));
      res.data.data.forEach((item: any, idx: number) => {
        console.log(`[${idx}] companyId:`, item.companyId, "company?.id:", item.company?.id, "jobCategoryId:", item.jobCategoryId, "jobCategory?.id:", item.jobCategory?.id, "applicationId:", item.applicationId);
      });
  
      const transformed: Interview[] = res.data.data.map((item: any) => ({
        ...item,
        companyId: item.companyId ?? (item.company?.id ?? 0),
        jobCategoryId: item.jobCategoryId ?? (item.jobCategory?.id ?? 0),
        applicationId: item.applicationId ?? 0,
        canWriteReview: item.canWriteReview ?? false, // 백엔드에서 직접 내려옴
        expirationDate: item.expirationDate, // 만료일 포함
        status:
          typeof item.status === "string"
            ? item.status === "completed"
              ? 3
              : item.status === "canceled"
              ? 4
              : 1
            : item.status,
      }));
  
      setInterviews(transformed);
    } catch (err) {
      console.error("❌ 인터뷰 데이터 불러오기 실패", err);
    }
  };
  

  const fetchReviews = async () => {
    try {
      const res = await apiClient.get("/api/personal/interview-reviews");
      setReviews(res.data.data);
    } catch (err) {
      console.error("❌ 리뷰 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchInterviews();
    fetchReviews();
  }, []);

  const handleEditReviewFromInterview = (interview: Interview) => {
    console.log('[handleEditReviewFromInterview] 리뷰 모달로 넘기는 interview:', interview);
    setEditingReview(interview);
    setReviewModalOpen(true);
  };

  const handleEditReviewFromReview = (review: Review) => {
    const converted: Interview = {
      ...review,
      companyName: review.company ?? "",
      jobTitle: review.position ?? "",
      status: 3,
      companyId: review.companyId,
      jobCategoryId: review.jobCategoryId,
      applicationId: review.applicationId,
    };
    console.log('[handleEditReviewFromReview] 리뷰 모달로 넘기는 converted:', converted);
    setEditingReview(converted);
    setReviewModalOpen(true);
  };


  const handleViewReview = (review: Review) => {
    setViewingReview(review);
    setDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setReviewModalOpen(false);
    setEditingReview(null);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setViewingReview(null);
  };

  const counts = useMemo(
    () => ({
      status: interviews.length,
      reviews: reviews.length,
    }),
    [interviews, reviews]
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 pt-6">면접 현황</h1>

      <InterviewStats interviews={interviews} />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <InterviewTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />

        {activeTab === "reviews" ? (
          <InterviewReviewTab
            reviews={reviews}
            onEditReview={handleEditReviewFromReview}
            onViewReview={handleViewReview}
          />
        ) : (
          <InterviewStatusTab
            interviews={interviews}
            onEditReview={handleEditReviewFromInterview}
            loading={false}
            error={null}
          />
        )}
      </div>

      {reviewModalOpen && editingReview && (
        <ReviewModal
          interview={{ ...editingReview, status: "completed" }}
          onClose={handleCloseModal}
          onComplete={() => {
            fetchInterviews();
            fetchReviews();
            handleCloseModal();
          }}
        />
      )}

      {detailModalOpen && viewingReview && (
        <ReviewDetailModal
          isOpen={detailModalOpen}
          onClose={handleCloseDetailModal}
          review={viewingReview}
        />
      )}
    </div>
  );
}