"use client";

import { Interview } from "@/types/interview";
import { InterviewList } from "./InterviewList";

// ✅ props 타입 정의
interface InterviewStatusTabProps {
  interviews: Interview[];
  onEditReview: (interview: Interview) => void;
  loading: boolean;
  error: string | null;
}

// ✅ 인터뷰 현황 탭 컴포넌트
export function InterviewStatusTab({
  interviews,
  onEditReview,
  loading,
  error,
}: InterviewStatusTabProps) {
  if (!interviews.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        면접 일정이 없습니다.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {/* 조건부 렌더링 */}
      {loading ? (
        <div className="py-8 text-center text-gray-400">불러오는 중...</div>
      ) : error ? (
        <div className="py-8 text-center text-red-500">{error}</div>
      ) : (
        <InterviewList interviews={interviews} onEditReview={onEditReview} />
      )}
    </div>
  );
}
