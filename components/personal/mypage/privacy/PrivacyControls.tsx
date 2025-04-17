"use client"

import { Plus, Shield } from "lucide-react"
import { useState } from "react"
import { BlockCompanyModal } from "./BlockCompanyModal"

export function PrivacyControls() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">열람 차단 설정</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          차단 기업 추가
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-start mb-4">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-gray-900">열람 차단 설정이란?</h3>
            <p className="text-sm text-gray-600 mt-1">
              특정 기업이 내 프로필을 열람하지 못하도록 차단할 수 있습니다. 차단된 기업은 내 프로필을 검색하거나 열람할
              수 없습니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-md">
          <div className="mb-2 sm:mb-0">
            <span className="text-sm font-medium text-gray-700">현재 차단된 기업</span>
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">2</span>
          </div>
          <div className="text-sm text-gray-500">최대 10개 기업까지 차단 가능</div>
        </div>
      </div>

      {isModalOpen && <BlockCompanyModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}
