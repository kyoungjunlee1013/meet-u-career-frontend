"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

export type CompanyDetail = {
  id: number
  name: string
  registrationNumber: string
  status: string
  registrationDate: string
  address: string
  ceo: string
  industry: string
  size: string
  foundedYear: string
  website: string
  phone: string
  email: string
  description: string
  jobPostings: number
  recruitmentManagers: number
}

interface CompanyDetailModalProps {
  company: CompanyDetail | null
  onClose: () => void
}

export default function CompanyDetailModal({ company, onClose }: CompanyDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Handle ESC key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    // Handle click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)

    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  if (!company) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 id="modal-title" className="text-xl font-bold text-gray-900">
            기업 상세 정보
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">기업명</p>
                  <p className="text-sm font-medium">{company.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">사업자등록번호</p>
                  <p className="text-sm font-medium">{company.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">대표자</p>
                  <p className="text-sm font-medium">{company.ceo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">업종</p>
                  <p className="text-sm font-medium">{company.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">기업 규모</p>
                  <p className="text-sm font-medium">{company.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">설립연도</p>
                  <p className="text-sm font-medium">{company.foundedYear}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">연락처 정보</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">주소</p>
                  <p className="text-sm font-medium">{company.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">웹사이트</p>
                  <p className="text-sm font-medium">{company.website}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">전화번호</p>
                  <p className="text-sm font-medium">{company.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">이메일</p>
                  <p className="text-sm font-medium">{company.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">등록일</p>
                  <p className="text-sm font-medium">{company.registrationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">승인 상태</p>
                  <p
                    className={`text-sm font-medium ${
                      company.status === "승인됨"
                        ? "text-green-600"
                        : company.status === "대기 중"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {company.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">기업 소개</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">{company.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">채용 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">채용공고</p>
                <p className="text-xl font-bold text-blue-600">{company.jobPostings}개</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">채용관리자</p>
                <p className="text-xl font-bold text-blue-600">{company.recruitmentManagers}명</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              닫기
            </button>
            {company.status === "대기 중" && (
              <>
                <button className="px-4 py-2 bg-green-50 text-green-600 border border-green-500 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                  승인
                </button>
                <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-500 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500">
                  거절
                </button>
              </>
            )}
            {company.status === "승인됨" && (
              <button className="px-4 py-2 bg-orange-50 text-orange-600 border border-orange-500 rounded-md hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500">
                차단
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
