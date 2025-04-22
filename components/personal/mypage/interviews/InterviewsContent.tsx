"use client"

import { useState, useMemo } from "react"
import { InterviewStats } from "./InterviewStats"
import { InterviewStatusTab } from "./InterviewStatusTab"
import { InterviewReviewTab } from "./InterviewReviewTab"
import { InterviewTabs } from "./InterviewTabs"
import { ReviewModal } from "./review/ReviewModal"
import { ReviewDetailModal } from "./ReviewDetailModal"

const INTERVIEWS = [
  {
    id: 1,
    status: "검토중",
    date: "2023-06-15T14:00:00",
    company: "(주)사람인HR",
    position: "웹 프론트엔드 개발자",
    location: "서울 강남구 테헤란로 152",
    time: "오후 2:00",
    interviewer: "김인사 팀장",
    logo: "/abstract-company-logo.png",
  },
  {
    id: 2,
    status: "수락",
    date: "2023-06-10T10:30:00",
    company: "테크스타트(주)",
    position: "React 개발자",
    location: "온라인 화상면접",
    time: "오전 10:30",
    interviewer: "박개발 CTO",
    hasReview: true,
    logo: "/abstract-corporate-logo.png",
  },
  {
    id: 3,
    status: "거절",
    date: "2023-05-25T15:30:00",
    company: "글로벌소프트(주)",
    position: "백엔드 개발자",
    location: "서울 영등포구 여의도동 45",
    time: "오후 3:30",
    interviewer: "이기술 이사",
    logo: "/abstract-geometric-company.png",
  },
  {
    id: 4,
    status: "수락",
    date: "2023-06-20T09:00:00",
    company: "이노베이션랩스",
    position: "백엔드 개발자",
    location: "서울 마포구 상암동 123",
    time: "오전 9:00",
    interviewer: "최혁신 CTO",
    hasReview: false, // 면접 완료, 후기 미작성
    logo: "/abstract-innovation-logo.png",
  },
];

const REVIEWS = [
  {
    id: 1,
    company: "테크스타트(주)",
    position: "프론트엔드 개발자",
    date: "2023-06-10",
    logo: "/abstract-company-logo.png",
    jobCategory: "프론트엔드 개발",
    careerLevel: 0, // 신입
    interviewYearMonth: "2023-06",
    rating: 2, // 긍정적
    difficulty: 3, // 3점(보통)
    interviewType: 1 | 8, // 직무/인성면접, PT면접
    interviewParticipants: 1,
    questionsAsked: "자기소개를 해보세요.\n프로젝트에서 가장 어려웠던 점은?",
    interviewTip: "정직하게 답변하고, 실무 경험을 강조하면 좋아요.",
    result: 1, // 합격
    createdAt: "2023-06-15T12:00:00",
    updatedAt: "2023-06-15T12:00:00",
  },
  {
    id: 2,
    company: "글로벌소프트(주)",
    position: "백엔드 개발자",
    date: "2023-06-05",
    logo: "/abstract-corporate-logo.png",
    jobCategory: "백엔드 개발",
    careerLevel: 1, // 경력
    interviewYearMonth: "2023-06",
    rating: 0, // 부정적
    difficulty: 5, // 5점(매우 어려움)
    interviewType: 1 | 16, // 직무/인성면접, 실무 과제 및 시험
    interviewParticipants: 2,
    questionsAsked: "DB 인덱스란 무엇인가요?\n트랜잭션의 ACID란?",
    interviewTip: "면접 전에 실무 문제를 꼭 연습하세요.",
    result: 0, // 불합격
    createdAt: "2023-06-10T09:00:00",
    updatedAt: "2023-06-10T09:00:00",
  },
];

interface Interview {
  id: number;
  company: string;
  position: string;
  date?: string;
  location?: string;
  time?: string;
  interviewer?: string;
  hasReview?: boolean;
  logo?: string;
  // 필요한 경우 추가로 jobCategory 등 다른 필드들도 넣을 수 있어
}

export function InterviewsContent() {
  const [activeTab, setActiveTab] = useState("status");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Interview | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [viewingReview, setViewingReview] = useState<Interview | null>(null);
  const counts = useMemo(() => ({
    status: INTERVIEWS.length,
    reviews: REVIEWS.length,
  }), []);

  // 면접 리뷰 수정 버튼 클릭 시
  const handleEditReview = (review: Interview) => {
    setEditingReview(review);
    setReviewModalOpen(true);
  };

  // 면접 리뷰 상세보기 버튼 클릭 시
  const handleViewReview = (review: Interview) => {
    setViewingReview(review);
    setDetailModalOpen(true);
  };

  // 모달 닫기 시 상태 초기화
  const handleCloseModal = () => {
    setReviewModalOpen(false);
    setEditingReview(null);
  };
  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setViewingReview(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 pt-6">면접 현황</h1>
      <InterviewStats />
      <div className="bg-white rounded-lg shadow-sm p-6">
        <InterviewTabs activeTab={activeTab} onTabChange={setActiveTab} counts={counts} />
        {/* Tab Content */}
        {activeTab === "reviews"
          ? <InterviewReviewTab reviews={REVIEWS} onEditReview={handleEditReview} onViewReview={handleViewReview} />
          : <InterviewStatusTab interviews={INTERVIEWS} />}
      </div>
            {/* 수정된 부분 - ReviewModal 여는 부분 */}
            {reviewModalOpen && editingReview && (
            <ReviewModal 
              onClose={handleCloseModal}
              onComplete={() => {}}
              interview={{
                ...editingReview,
                companyId: 1,        // 임시값 (또는 실제 데이터에 추가해야 함)
                jobCategoryId: 1,    // 임시값
                applicationId: editingReview?.id ? editingReview.id : 3,

              }}
            />
          )}

            {detailModalOpen && viewingReview && (
              <ReviewDetailModal 
                isOpen={detailModalOpen} 
                onClose={handleCloseDetailModal} 
                review={viewingReview as any} // 일단 강제로 any 캐스팅
              />
            )}

    </div>
  )
}
