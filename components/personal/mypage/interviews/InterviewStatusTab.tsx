"use client";

import { Interview } from "@/types/interview";
import { InterviewList } from "./InterviewList";

// // ✅ 인터뷰 타입 정의
// interface Interview {
//   id: number;
//   company: string;
//   position: string;
//   date: string;
//   status: number;
//   logo: string;
//   location?: string;
//   time?: string;
//   interviewer?: string;
//   companyId: number;
//   jobCategoryId: number;
//   applicationId: number;
//   canWriteReview: boolean;
//   createdAt?: string;
//   rating?: number;
//   difficulty?: number;
//   questionsAsked?: string;
//   interviewTip?: string;
// }

// ✅ props 타입 정의
interface InterviewStatusTabProps {
  interviews: Interview[];
  onEditReview: (interview: Interview) => void;
}

// ✅ 인터뷰 현황 탭 컴포넌트
export function InterviewStatusTab({ interviews, onEditReview }: InterviewStatusTabProps) {
  if (!interviews.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        해당 상태의 면접 일정이 없습니다.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      <InterviewList interviews={interviews} onEditReview={onEditReview} />
    </div>
  );
}