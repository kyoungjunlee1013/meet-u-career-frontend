"use client"

import { Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScheduleFilterProps {
  selectedTypes: ("recruitment" | "deadline" | "personal")[]
  onToggleType: (type: "recruitment" | "deadline" | "personal") => void
}

export const ScheduleFilter = ({ selectedTypes, onToggleType }: ScheduleFilterProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-base font-medium mb-2">일정 유형 필터링</h3>
      <p className="text-xs text-gray-500 mb-3">보고 싶은 일정 유형을 선택하세요</p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {/* Recruitment Schedule Button */}
        <button
          className={cn(
            "flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium",
            selectedTypes.includes("recruitment")
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-gray-50 text-gray-500 border border-gray-200",
          )}
          onClick={() => onToggleType("recruitment")}
        >
          <span className="text-green-600">
            <Calendar className="w-5 h-5" />
          </span>
          <span>전형 일정</span>
        </button>

        {/* Deadline Schedule Button */}
        <button
          className={cn(
            "flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium",
            selectedTypes.includes("deadline")
              ? "bg-orange-50 text-orange-700 border border-orange-200"
              : "bg-gray-50 text-gray-500 border border-gray-200",
          )}
          onClick={() => onToggleType("deadline")}
        >
          <span className="text-orange-500">
            <Clock className="w-5 h-5" />
          </span>
          <span>마감 일정</span>
        </button>

        {/* Personal Schedule Button - Full Width */}
        <button
          className={cn(
            "flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium col-span-2",
            selectedTypes.includes("personal")
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "bg-gray-50 text-gray-500 border border-gray-200",
          )}
          onClick={() => onToggleType("personal")}
        >
          <span className="text-blue-500">
            <Calendar className="w-5 h-5" />
          </span>
          <span>개인 일정</span>
        </button>
      </div>

      {/* Legend */}
      <div className="space-y-2 mb-8">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-4 rounded-sm bg-green-600"></div>
          <span>전형 일정: 서류 발표, 면접 일정 등</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-4 rounded-sm bg-orange-500"></div>
          <span>마감 일정: 공고 마감일, 채용 마감일 등</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
          <span>개인 일정: 메모, 내부 회의 등</span>
        </div>
      </div>

      {/* Job Posting Colors */}
      <div>
        <h3 className="text-base font-medium mb-2">공고별 색상 구분</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
            <span>카카오 UX 디자이너</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-sm bg-green-500"></div>
            <span>네이버 백엔드 개발자</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-sm bg-amber-500"></div>
            <span>공고 일정</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-sm bg-gray-400"></div>
            <span>개인 일정</span>
          </div>
        </div>
      </div>
    </div>
  )
}
