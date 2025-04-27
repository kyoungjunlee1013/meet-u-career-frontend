"use client"

import { useState } from "react"
import Link from "next/link"
import { PromotionalCarousel } from "./PromotionalCarousel"
import { BusinessRegistrationForm } from "./BusinessRegistrationForm"

interface RegisterTabsProps {
  onCreateIdClick: () => void
}

export const RegisterTabs = ({ onCreateIdClick }: RegisterTabsProps) => {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal")

  const handleTabChange = (tab: "personal" | "business") => {
    setActiveTab(tab)
  }

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[calc(100vh-56px)]">
      {activeTab === "business" ? (
        <div className="w-full flex justify-center">
          <BusinessRegistrationForm />
        </div>
      ) : (
        <>
          {/* Left side - Registration tabs */}
          <div className="w-full md:w-1/2 flex items-center justify-center py-10 md:py-0">
            <div className="max-w-md w-full px-6">
              <div className="flex border-b mb-10">
                <button
                  className={`flex-1 py-4 text-center font-medium ${activeTab === "personal"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:bg-gray-50"
                    }`}
                  onClick={() => handleTabChange("personal")}
                >
                  개인회원
                </button>
                <button
                  className={`flex-1 py-4 text-center font-medium ${activeTab === "business"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:bg-gray-50"
                    }`}
                  onClick={() => handleTabChange("business")}
                >
                  기업회원
                </button>
              </div>

              <div className="mb-10">
                <p className="text-center text-sm text-gray-600 mb-6">소셜 계정으로 간편 로그인</p>
                <div className="flex justify-center gap-4 mb-10">
                  <Link
                    href="#"
                    className="w-12 h-12 rounded-full bg-[#FEE500] flex items-center justify-center text-black hover:opacity-90 transition-opacity"
                    aria-label="카카오 로그인"
                  >
                    <span className="font-bold text-sm">K</span>
                  </Link>

                  <Link
                    href="#"
                    className="w-12 h-12 rounded-full bg-[#03C75A] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                    aria-label="네이버 로그인"
                  >
                    <span className="font-bold text-sm">N</span>
                  </Link>

                  <Link
                    href="#"
                    className="w-12 h-12 rounded-full bg-white border flex items-center justify-center text-black hover:opacity-90 transition-opacity"
                    aria-label="구글 로그인"
                  >
                    <span className="font-bold text-sm">G</span>
                  </Link>
                </div>
              </div>

              <button
                onClick={onCreateIdClick}
                className="w-full py-3.5 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                사람인 통합 아이디 만들기
              </button>

              <div className="mt-6 text-center">
                <Link href="/login" className="text-xs text-gray-500 hover:underline">
                  이미 계정이 있나요? 로그인
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Promotional carousel */}
          <div className="hidden md:block w-1/2 bg-blue-50 h-full">
            <PromotionalCarousel />
          </div>
        </>
      )}
    </div>
  )
}
