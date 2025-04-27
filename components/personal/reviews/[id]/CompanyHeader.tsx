"use client"

import Image from "next/image"
import { Heart, Share2 } from "lucide-react"
import { useState } from "react"

interface CompanyHeaderProps {
  companyId: string
}

export const CompanyHeader = ({ companyId }: CompanyHeaderProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <div className="bg-[#4054E9] pt-12 pb-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white rounded-lg p-6 relative">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-[120px] h-[120px] bg-white rounded-md border flex items-center justify-center overflow-hidden">
              <Image src="/images/etc/hyundai-logo.png" alt="현대자동차 로고" width={100} height={40} className="object-contain" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">현대자동차(주)</h1>
                <span className="text-xs text-blue-600 border border-blue-600 rounded px-1">기업정보</span>
              </div>

              <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
                <span>승용차 및 기타 여객용 자동차 제조업</span>
                <span>|</span>
                <span>12/102,000명(국내)</span>
                <span>|</span>
                <span>매출액 70,465억</span>
                <span>|</span>
                <span>연봉 5천만원</span>
                <span>|</span>
                <span>복리후생(연금,카페,휴게실,수당,보험,주차,통근버스)</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M7 10v12"></path>
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-medium">리뷰어의 평균</div>
                    <div className="text-sm font-bold">BEST 기업문화</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"></path>
                    </svg>
                  </div>
                  <div className="text-sm">리뷰 작성 가능</div>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z"></path>
                      <path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z"></path>
                      <path d="M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z"></path>
                    </svg>
                  </div>
                  <div className="text-sm">직무별</div>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20V10"></path>
                      <path d="M18 20V4"></path>
                      <path d="M6 20v-6"></path>
                    </svg>
                  </div>
                  <div className="text-sm">채용공 평균 연봉</div>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <div className="text-sm">원하는 채용 정보</div>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-6 flex gap-2">
              <button
                className={`w-10 h-10 rounded-full border flex items-center justify-center ${isBookmarked ? "text-red-500" : "text-gray-400"}`}
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Heart className={`w-5 h-5 ${isBookmarked ? "fill-red-500" : ""}`} />
              </button>
              <button className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-400">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
