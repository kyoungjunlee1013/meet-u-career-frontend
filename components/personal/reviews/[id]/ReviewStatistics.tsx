"use client"

import { useState } from "react"
import { ReviewProgressBar } from "./ReviewProgressBar"
import { ChevronDown } from "lucide-react"

export const ReviewStatistics = () => {
  const [activeTab, setActiveTab] = useState("전체")
  const [isExpanded, setIsExpanded] = useState(false)

  const tabs = ["전체", "초급개발", "인턴십", "신입/경력", "경력 및 면접", "자기개발"]

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <h2 className="text-lg font-bold mb-4">전체 리뷰 통계</h2>

      <div className="flex overflow-x-auto pb-2 mb-4 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto">
          <select className="text-sm border rounded-md px-2 py-1 bg-white">
            <option>최신순 ▼</option>
            <option>오래된순</option>
            <option>평점 높은순</option>
            <option>평점 낮은순</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">어떤 복지/혜택 좋으셨나요?</h3>
          <ReviewProgressBar label="제주도 여행" percentage={83.3} />
          <ReviewProgressBar label="생일자 선물" percentage={12.5} />
          <ReviewProgressBar label="상품권" percentage={4.2} />
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">어떤 사내의 자랑거리 좋으셨나요?</h3>
          <ReviewProgressBar label="동종업계 최고" percentage={76.2} />
          <ReviewProgressBar label="사옥이 너무 멋있어요" percentage={23.8} />
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">연차는 어떻게 사용하시나요?</h3>
          <ReviewProgressBar label="자유롭게 사용" percentage={74.8} />
          <ReviewProgressBar label="눈치보며 사용" percentage={17.7} />
          <ReviewProgressBar label="잘 사용하지 못함" percentage={7.5} />
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">출근이 자유로운 편인가요?</h3>
          <ReviewProgressBar label="정해진 시간에 출근" percentage={73.5} />
          <ReviewProgressBar label="자율출퇴근 사용" percentage={24.7} />
          <ReviewProgressBar label="재택근무 가능" percentage={2.3} />
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">회식은 어떻게 진행하나요?</h3>
          <ReviewProgressBar label="회식은 술자리 위주" percentage={70.8} />
          <ReviewProgressBar label="회식이 거의 없다" percentage={19} />
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">회사의 평균 연령대는?</h3>
          <ReviewProgressBar label="40대 이상" percentage={70.2} />
          <ReviewProgressBar label="30대" percentage={24.4} />
        </div>
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
