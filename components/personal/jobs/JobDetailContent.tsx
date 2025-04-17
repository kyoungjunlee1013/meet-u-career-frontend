"use client"

import { useState } from "react"
import { BookmarkIcon, Share2, ChevronUp, ChevronRight } from "lucide-react"
import { JobApplicationStats } from "./JobApplicationStats"
import { CompanyInfo } from "./CompanyInfo"
import Link from "next/link"

interface JobDetailContentProps {
  jobId: string
}

export const JobDetailContent = ({ jobId }: JobDetailContentProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className="bg-white border rounded-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <Link href={`/personal/company/1/salary`} className="hover:text-blue-500 hover:underline">
            (주)테스트그룹
          </Link>
          <span className="mx-2">•</span>
          <span className="text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded">채용진행중</span>
          <span className="mx-2">•</span>
          <span className="text-gray-400">기업정보</span>
        </div>

        <div className="flex justify-between items-start">
          <h1 className="text-xl font-bold mb-6">백엔드 엔지니어(Python) 채용</h1>
          <div className="flex gap-2">
            <button
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                isBookmarked ? "text-red-500" : "text-gray-400"
              }`}
              onClick={toggleBookmark}
            >
              <BookmarkIcon className="h-5 w-5" />
            </button>
            <button className="bg-red-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-red-600">지원하기</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <h3 className="text-xs text-gray-500 mb-1">직무</h3>
            <p className="text-sm">웹/앱 개발자</p>
          </div>
          <div>
            <h3 className="text-xs text-gray-500 mb-1">근무</h3>
            <p className="text-sm">정규직</p>
          </div>
          <div>
            <h3 className="text-xs text-gray-500 mb-1">근무지역</h3>
            <p className="text-sm">강남구</p>
          </div>
          <div>
            <h3 className="text-xs text-gray-500 mb-1">경력</h3>
            <p className="text-sm">신입 & 경력</p>
          </div>
          <div>
            <h3 className="text-xs text-gray-500 mb-1">학력</h3>
            <p className="text-sm">대졸</p>
          </div>
          <div>
            <h3 className="text-xs text-gray-500 mb-1">기한</h3>
            <p className="text-sm">2023년 3월 30일</p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mb-8">자세한 채용 공고입니다</div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-6 text-center">백엔드 엔지니어(Python) 채용</h2>
          <div className="bg-gray-100 h-60 flex items-center justify-center rounded-md mb-8">
            <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
              <span className="text-gray-400">▶</span>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-base font-bold text-blue-600 mb-3">주요업무</h3>
              <ul className="space-y-2 text-sm">
                <li>- Python 기반 백엔드 서비스 개발 및 운영</li>
                <li>- RESTful API 설계 및 구현</li>
                <li>- 데이터베이스 설계 및 최적화</li>
                <li>- AWS, GCP 등의 인프라 구축</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-bold text-blue-600 mb-3">자격요건</h3>
              <ul className="space-y-2 text-sm">
                <li>- Python 개발 경력 2년 이상</li>
                <li>- Django, Flask 등 웹 프레임워크 사용 경험</li>
                <li>- SQL, NoSQL 데이터베이스 경험</li>
                <li>- Git 등 형상관리 도구 사용 경험</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-bold text-blue-600 mb-3">우대사항</h3>
              <ul className="space-y-2 text-sm">
                <li>- AWS, GCP 등 클라우드 환경 경험</li>
                <li>- Docker, Kubernetes 등 컨테이너 기술 경험</li>
                <li>- CI/CD 파이프라인 구축 경험</li>
                <li>- 대용량 트래픽 처리 경험</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-bold text-blue-600 mb-3">복지혜택</h3>
              <ul className="space-y-2 text-sm">
                <li>- 유연근무제 운영</li>
                <li>- 건강검진 지원</li>
                <li>- 자기계발비 지원</li>
                <li>- 경조사 지원</li>
                <li>- 점심 식대비 지원</li>
                <li>- 명절 선물 지급</li>
              </ul>
            </section>
          </div>
        </div>

        <div className="border-t pt-6 mb-8">
          <h3 className="text-base font-bold mb-3">원서접수 방법</h3>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">접수기간</p>
                <p className="text-sm">2023.03.26 ~ 2023.04.30</p>
              </div>
            </div>
            <div className="text-sm text-red-500">D-20</div>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              이메일지원
            </button>
            <button className="flex-1 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">지원하기</button>
          </div>
        </div>

        <div className="flex justify-between border-t border-b py-4 mb-8">
          <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ChevronUp className="h-4 w-4 mr-1" />
            이전글
          </button>
          <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            공유
            <Share2 className="h-4 w-4 ml-1" />
          </button>
        </div>

        <JobApplicationStats />

        <CompanyInfo />

        <div className="mt-4 text-right">
          <Link
            href={`/personal/company/1/salary`}
            className="inline-flex items-center text-sm text-blue-500 hover:underline"
          >
            기업정보 전체보기
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
