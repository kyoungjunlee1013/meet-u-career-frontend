"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { InterviewTabs } from "./InterviewTabs";
import { InterviewStatusTab } from "./InterviewStatusTab";
import  InterviewReviewTab from "./InterviewReviewTab";
import { InterviewStats } from "./InterviewStats";
import { ReviewModal } from "./review/ReviewModal";
import { ReviewDetailModal } from "./ReviewDetailModal";
import { Interview } from "@/types/interview"; // ✅ 타입 통일 import

// ✅ 리뷰 타입
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
  interviewTip: string;
  result: number;
  createdAt: string;
  updatedAt: string;
}

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
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await axios.get("/api/personal/interviews", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const reviewableRes = await axios.post("/api/personal/interview-reviews/reviewable-list", res.data.data);
      const reviewableMap = new Map<number, boolean>();
      reviewableRes.data.data.forEach((dto: any) => {
        reviewableMap.set(dto.applicationId, dto.canWriteReview);
      });

      const transformed: Interview[] = res.data.data.map((item: any) => ({
        ...item,
        canWriteReview: reviewableMap.get(item.applicationId) ?? false,
        // ✅ status를 number로 명확히 보정
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
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await axios.get("/api/personal/interview-reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });

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
    setEditingReview(interview);
    setReviewModalOpen(true);
  };

  const handleEditReviewFromReview = (review: Review) => {
    const converted: Interview = {
      ...review,
      status: 3,
      companyId: 0,
      jobCategoryId: 0,
      applicationId: 0,
    };
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

  const counts = useMemo(() => ({
    status: interviews.length,
    reviews: reviews.length,
  }), [interviews, reviews]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 pt-6">면접 현황</h1>

      {/* ✅ 통계에 인터뷰 리스트 넘기기 */}
      <InterviewStats interviews={interviews} />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <InterviewTabs activeTab={activeTab} onTabChange={setActiveTab} counts={counts} />

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
