"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export const InterviewExperience = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null)
    } else {
      setExpandedQuestion(index)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <h2 className="text-lg font-bold mb-4">인사담당자가 직접 답변했어요!</h2>
      <p className="text-sm text-gray-600 mb-6">
        2022-11-03 [현대자동차] 대리님 및 기타사원 관리/운영 업무에 종사하고 있습니다.
      </p>

      <div className="border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleQuestion(1)}>
          <h3 className="text-sm font-medium">Q1. 근무 환경은 어떤가요?</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedQuestion === 1 ? "rotate-180" : ""}`} />
        </div>

        {expandedQuestion === 1 && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-600">내근</span>
                <span className="text-blue-600 font-medium">100%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">거래 빈도</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleQuestion(2)}>
          <h3 className="text-sm font-medium">Q2. 회사 및 제품은 어떤가요 하나요?</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedQuestion === 2 ? "rotate-180" : ""}`} />
        </div>

        {expandedQuestion === 2 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-gray-600">좋은 회사 제품</p>
          </div>
        )}
      </div>

      <button
        className="w-full mt-4 text-sm text-gray-500 flex items-center justify-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "접기" : "펼쳐보기"}{" "}
        <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
      </button>
    </div>
  )
}
