"use client"

import { Calendar } from "lucide-react"
import { useState } from "react"

interface FilterDropdownProps {
  onClose: () => void
}

export const FilterDropdown = ({ onClose }: FilterDropdownProps) => {
  const [statusFilters, setStatusFilters] = useState({
    documentReview: false,
    documentPass: false,
    documentFail: false,
    interviewScheduled: false,
    interviewComplete: false,
    finalPass: false,
    finalFail: false,
  })

  const handleStatusChange = (key: keyof typeof statusFilters) => {
    setStatusFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleReset = () => {
    setStatusFilters({
      documentReview: false,
      documentPass: false,
      documentFail: false,
      interviewScheduled: false,
      interviewComplete: false,
      finalPass: false,
      finalFail: false,
    })
  }

  const handleApply = () => {
    // Apply filters logic here
    onClose()
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-5">
      <div className="mb-5">
        <h3 className="text-lg font-medium mb-3">지원 상태</h3>
        <div className="grid grid-cols-2 gap-y-3">
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              checked={statusFilters.documentReview}
              onChange={() => handleStatusChange("documentReview")}
            />
            <span className="text-blue-500">서류검토중</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              checked={statusFilters.documentPass}
              onChange={() => handleStatusChange("documentPass")}
            />
            <span className="text-green-500">서류합격</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              checked={statusFilters.documentFail}
              onChange={() => handleStatusChange("documentFail")}
            />
            <span className="text-red-500">서류불합격</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              checked={statusFilters.interviewScheduled}
              onChange={() => handleStatusChange("interviewScheduled")}
            />
            <span className="text-amber-500">면접예정</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              checked={statusFilters.interviewComplete}
              onChange={() => handleStatusChange("interviewComplete")}
            />
            <span className="text-indigo-500">면접완료</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              checked={statusFilters.finalPass}
              onChange={() => handleStatusChange("finalPass")}
            />
            <span className="text-teal-500">최종합격</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              checked={statusFilters.finalFail}
              onChange={() => handleStatusChange("finalFail")}
            />
            <span>최종불합격</span>
          </label>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-lg font-medium mb-3">지원일자</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">시작일</label>
            <div className="relative">
              <input
                type="text"
                placeholder="날짜 선택"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">종료일</label>
            <div className="relative">
              <input
                type="text"
                placeholder="날짜 선택"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          초기화
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          적용하기
        </button>
      </div>
    </div>
  )
}
