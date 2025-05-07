"use client"

import { Calendar, Star, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface Review {
  id: number
  jobCategoryName: string
  interviewYearMonth: string
  rating: number
  createdAt: string
  questionsAsked: string
  result: number
  difficulty: number
  interviewType: number
  interviewParticipants: number
  interviewTip: string
}

interface Props {
  reviews: Review[]
}

const RATING_LABEL = ["부정적", "보통", "긍정적"]
const RESULT_LABEL = ["불합격", "합격", "대기중"]
const RESULT_COLOR = ["text-red-500", "text-green-600", "text-yellow-500"]
const DIFFICULTY_LABEL = ["매우 쉬움", "쉬움", "보통", "어려움", "매우 어려움"]
const PARTICIPANTS_LABEL: { [key: number]: string } = {
  1: "1대1 면접",
  2: "1대 다 면접",
};


const INTERVIEW_TYPE_MAP: Record<number, string> = {
  1: "직무/인성면접",
  2: "토론면접",
  4: "인적성 검사",
  8: "PT면접",
  16: "실무 과제 및 시험",
  32: "기타",
}

// 비트맵 값들 조합해서 텍스트로 변환
const parseInterviewTypes = (typeValue: number): string[] => {
  return Object.entries(INTERVIEW_TYPE_MAP)
    .filter(([bit]) => (typeValue & Number(bit)) !== 0)
    .map(([, label]) => label)
}

export const InterviewExperience = ({ reviews }: Props) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">면접 후기</h2>  
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border rounded-lg p-4 bg-white hover:shadow transition-shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{review.jobCategoryName}</p>
              <p className="text-base font-semibold text-gray-800">
                {review.interviewYearMonth} 면접 후기
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-yellow-600">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-500" />
              <span>{RATING_LABEL[review.rating]} ({review.rating}/2)</span>
            </div>
          </div>

          {/* 질문 */}
          <p className="text-sm mt-3 text-gray-700 whitespace-pre-wrap">
            {review.questionsAsked}
          </p>

          {/* 인터뷰 정보 */}
          <div className="mt-3 text-sm text-gray-600 space-y-1">
            <p>🧠 난이도: {DIFFICULTY_LABEL[review.difficulty]}</p>
            <p>👥 참여자 수: {PARTICIPANTS_LABEL[review.interviewParticipants] || "정보 없음"}</p>
            <p>🗂 면접 유형: {parseInterviewTypes(review.interviewType).join(", ") || "없음"}</p>
            <p>💡 팁: {review.interviewTip || "작성된 팁이 없습니다."}</p>
            <p className={`flex items-center gap-1 ${RESULT_COLOR[review.result]}`}>
              {review.result === 0 && <AlertCircle className="w-4 h-4" />}
              {review.result === 1 && <CheckCircle className="w-4 h-4" />}
              {review.result === 2 && <Clock className="w-4 h-4" />}
              {RESULT_LABEL[review.result]}
            </p>
          </div>

          {/* 생성일 */}
          <div className="text-xs text-gray-400 mt-2 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}
