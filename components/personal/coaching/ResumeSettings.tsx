"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export const ResumeSettings = () => {
  const [isPublic, setIsPublic] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <span className="text-sm text-gray-600 mr-2">공개 설정</span>
        <div
          className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${
            isPublic ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setIsPublic(!isPublic)}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
              isPublic ? "translate-x-5" : ""
            }`}
          ></div>
        </div>
        <span className="text-sm text-gray-600 ml-2">공개</span>
      </div>

      <div className="text-xs text-gray-500 mb-6">마지막 저장: 2023년 12월 17일 14:30</div>

      <div className="border-t pt-4">
        <h2 className="text-base font-medium mb-4">합격 전략</h2>

        <div className="mb-2">
          <button
            className="flex items-center justify-between w-full py-2 text-sm"
            onClick={() => toggleSection("structure")}
          >
            <div className="flex items-center">
              <span className="w-4 text-gray-400">•</span>
              <span>자원 투기</span>
            </div>
            <span>
              {expandedSection === "structure" ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </span>
          </button>
        </div>

        <div className="mb-2">
          <button
            className="flex items-center justify-between w-full py-2 text-sm"
            onClick={() => toggleSection("experience")}
          >
            <div className="flex items-center">
              <span className="w-4 text-gray-400">•</span>
              <span>성장 과정</span>
            </div>
            <span>
              {expandedSection === "experience" ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </span>
          </button>
        </div>

        <div className="mb-2">
          <button
            className="flex items-center justify-between w-full py-2 text-sm"
            onClick={() => toggleSection("motivation")}
          >
            <div className="flex items-center">
              <span className="w-4 text-gray-400">•</span>
              <span>지원 동기</span>
            </div>
            <span>
              {expandedSection === "motivation" ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </span>
          </button>
        </div>

        <div className="mb-2">
          <button
            className="flex items-center justify-between w-full py-2 text-sm"
            onClick={() => toggleSection("future")}
          >
            <div className="flex items-center">
              <span className="w-4 text-gray-400">•</span>
              <span>입사 후 포부</span>
            </div>
            <span>
              {expandedSection === "future" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
