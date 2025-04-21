"use client";

import { RefObject, useEffect, useState } from "react";
import { Star, Share2, MapPin, Map } from "lucide-react";
import { ApplicantStats } from "./ApplicantStats";
import { WorkLocation } from "./WorkLocation";
import { CompanyInfo } from "./CompanyInfo";
import Link from "next/link";

interface JobDetailContentProps {
  jobId: string;
  sectionRefs: {
    postRef: RefObject<HTMLDivElement | null>;
    applyRef: RefObject<HTMLDivElement | null>;
    companyRef: RefObject<HTMLDivElement | null>;
  };
}

export const JobDetailContent = ({
  jobId,
  sectionRefs,
}: JobDetailContentProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const deadline = new Date("2025-04-27T23:00:00"); // 마감일 설정
  const [timeLeft, setTimeLeft] = useState<number>(Math.floor((deadline.getTime() - Date.now()) / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days}일 ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="bg-white border rounded-md overflow-hidden">
      <div className="p-6">
        <div
          ref={sectionRefs.postRef}
          className="flex items-center mb-3 gap-4"
        >
          {/* 회사명 링크 */}
          <Link
            href={`/personal/company/1/salary`}
            className="text-md font-semibold"
          >
            (주)테스트그룹
          </Link>

          {/* 오른쪽 버튼들 (회사명 옆에 붙음) */}
          <div className="flex items-center gap-2">
            {/* 관심기업 버튼 */}
            <button className="flex items-center border border-gray-300 px-3 py-1 rounded-md text-sm text-gray-600 hover:text-gray-800">
              <span className="mr-1">♡</span> 관심기업
            </button>

            {/* 채용중 버튼 */}
            <button className="flex items-center border border-gray-300 px-3 py-1 rounded-md text-sm text-gray-600 hover:text-gray-800">
              채용중 <strong className="ml-1">10</strong>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          {/* 공고명 (좌측) */}
          <h1 className="text-xl font-bold">
            백엔드 엔지니어(Python) 채용
          </h1>

          {/* 스크랩 + 지원하기 (우측) */}
          <div className="flex items-center gap-2">
            {/* 스크랩 버튼 */}
            <button
              onClick={toggleBookmark}
              className="flex flex-col justify-center items-center w-14 h-12 border border-gray-300 rounded-md text-sm text-gray-600 hover:text-gray-800"
            >
              <Star className="h-5 w-5 mb-0.5" />
              <span className="text-xs">스크랩</span>
            </button>

            {/* 지원하기 버튼 */}
            <button className="w-24 h-12 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 flex items-center justify-center">
              지원하기
            </button>
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

        <div className="border-t py-4 mb-8 text-gray-500 text-sm">
          <div className="mb-2 text-right text-xs">
            <span className="text-[#1842a3] font-semibold">최저임금계산에 대한 알림</span>
            하단에 명시된 급여, 근무 내용 등이 최저임금에 미달하는 경우 위 내용이 우선합니다.
          </div>
          <div className="flex justify-end items-center gap-2 text-xs">
            <span>조회수 <strong className="text-black">36</strong></span>
            <span>·</span>
            <button className="flex items-center hover:text-gray-700">
              <Share2 className="h-4 w-4 mr-1" />
              공유하기
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mb-8">
          자세한 채용 공고입니다
        </div>

        <div className="mb-24">
          <h2 className="text-lg font-bold mb-6 text-center">
            백엔드 엔지니어(Python) 채용
          </h2>
          <div className="bg-gray-100 h-60 flex items-center justify-center rounded-md mb-8">
            <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
              <span className="text-gray-400">▶</span>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-base font-bold text-blue-600 mb-3">
                주요업무
              </h3>
              <ul className="space-y-2 text-sm">
                <li>- Python 기반 백엔드 서비스 개발 및 운영</li>
                <li>- RESTful API 설계 및 구현</li>
                <li>- 데이터베이스 설계 및 최적화</li>
                <li>- AWS, GCP 등의 인프라 구축</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-bold text-blue-600 mb-3">
                자격요건
              </h3>
              <ul className="space-y-2 text-sm">
                <li>- Python 개발 경력 2년 이상</li>
                <li>- Django, Flask 등 웹 프레임워크 사용 경험</li>
                <li>- SQL, NoSQL 데이터베이스 경험</li>
                <li>- Git 등 형상관리 도구 사용 경험</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-bold text-blue-600 mb-3">
                우대사항
              </h3>
              <ul className="space-y-2 text-sm">
                <li>- AWS, GCP 등 클라우드 환경 경험</li>
                <li>- Docker, Kubernetes 등 컨테이너 기술 경험</li>
                <li>- CI/CD 파이프라인 구축 경험</li>
                <li>- 대용량 트래픽 처리 경험</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-bold text-blue-600 mb-3">
                복지혜택
              </h3>
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

        {/* 근무지위치 */}
        <WorkLocation sectionRef={sectionRefs.companyRef} address="강원 강릉시 창해로14번길 51-20" />

        <div ref={sectionRefs.applyRef} className="pt-2 mb-12">
          <h3 className="text-lg font-bold mb-2 text-left">접수기간 및 방법</h3>

          {/* 카드 전체 */}
          <div className="flex border rounded-md overflow-hidden">
            {/* 왼쪽 - 남은 기간 */}
            <div className="flex-1 p-6 bg-white flex flex-col items-center justify-center text-center border-r">
              <p className="text-sm text-[#1842a3] mb-2">남은 기간</p>
              <p className="text-3xl font-bold text-[#1842a3] mb-6">{formatTime(timeLeft)}</p>

              {/* 시작일/마감일 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs text-gray-500 border border-gray-300 rounded-full">시작일</span>
                  <div className="px-3 py-1 text-sm text-gray-800">
                    2025.04.15 00:00
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs text-gray-500 border border-[#1842a3] text-[#1842a3] rounded-full">마감일</span>
                  <div className="px-3 py-1 text-sm text-[#1842a3] font-medium">
                    2025.04.27 23:00
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 - 지원 방법 */}
            <div className="flex-1 p-6 bg-gray-50 flex flex-col justify-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 w-24">지원방법</span>
                  <span className="text-sm font-medium text-gray-800">홈페이지 지원</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 w-24">접수양식</span>
                  <button className="text-sm text-blue-600 hover:underline">
                    제출서류 보기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 알림 문구 */}
          <p className="text-xs text-gray-500 mt-4 flex items-center">
            <span className="mr-1">ⓘ</span> 마감일은 기업의 사정, 조기마감 등으로 변경될 수 있습니다.
          </p>
        </div>

        <ApplicantStats />

        <CompanyInfo />

        <div ref={sectionRefs.companyRef} className="mt-4 text-right">
          <Link
            href={`/personal/company/1/salary`}
            className="inline-flex items-center text-sm text-blue-500 hover:underline"
          />
        </div>
      </div>
    </div>
  );
};
