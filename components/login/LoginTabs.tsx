"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { PersonalLoginForm } from "./PersonalLoginForm"
import { BusinessLoginForm } from "./BusinessLoginForm"
import { SocialLoginButtons } from "./SocialLoginButtons"
import { PromotionalBanner } from "./PromotionalBanner"

interface LoginTabsProps {
  onTabChange?: (tab: "personal" | "business") => void
}

export const LoginTabs = ({ onTabChange }: LoginTabsProps) => {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal")

  useEffect(() => {
    onTabChange?.(activeTab)
  }, [activeTab, onTabChange])

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-24">
      <div className="border rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Welcome message and illustration */}
          <div className="w-full md:w-1/2 p-8 flex flex-col">
            <div className="mb-6">
              <h1 className="text-xl font-medium mb-2">다양한 사람인 서비스를</h1>
              <h1 className="text-xl font-medium mb-2">로그인 한 번으로</h1>
              <h1 className="text-xl font-medium mb-2">편하게 이용하세요!</h1>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-[200px] h-[200px]">
                <Image
                  src="/images/etc/login_01.png"
                  alt="Login illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/register"
                className="block w-full text-center py-2.5 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                개인 회원가입 가입
              </Link>
            </div>
          </div>

          {/* Right side - Login tabs */}
          <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l">
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === "personal"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("personal")}
              >
                개인회원
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === "business"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("business")}
              >
                기업회원
              </button>
            </div>

            <div className="p-6">
              {activeTab === "personal" ? <PersonalLoginForm /> : <BusinessLoginForm />}

              {activeTab === "personal" && (
                <>
                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500 mb-4">소셜 계정으로 간편 로그인</p>
                    <SocialLoginButtons />
                  </div>
                  <div className="mt-6">
                    <PromotionalBanner />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
