"use client";

import Link from "next/link";
import Image from "next/image";

export const CompanyInfo = () => {
  return (
    <div>
      {/* 기업정보 제목 (카드 외부, 좌측 정렬) */}
      <h3 className="text-lg font-bold mb-2 text-left">기업정보</h3>

      {/* 카드 영역 */}
      <div className="border rounded-md overflow-hidden">
        {/* 상단 구역 */}
        <div className="flex justify-between items-start p-6">
          {/* 좌측 + 가운데 */}
          <div className="flex-1 space-y-2">
            {/* 회사명 + 관심기업 */}
            <h2 className="text-xl font-bold mb-2">(주)테스트그룹</h2>

            {/* 1열: 대표자명 + 기업형태 */}
            <div className="flex text-sm text-gray-600">
              <p className="w-28 text-gray-500">대표자명</p>
              <p className="flex-1">김테스트</p>
              <p className="w-28 text-gray-500">기업형태</p>
              <p className="flex-1 truncate" title="코스피, 1000대기업, 중견기업">
                코스피, 1000대기업, 중견기업
              </p>
            </div>

            {/* 2열: 업종 + 사원수 */}
            <div className="flex text-sm text-gray-600">
              <p className="w-28 text-gray-500">업종</p>
              <p className="flex-1">소프트웨어 개발</p>
              <p className="w-28 text-gray-500">사원수</p>
              <p className="flex-1">1,790명 (2025년 기준)</p>
            </div>

            {/* 3열: 설립일 + 홈페이지 */}
            <div className="flex text-sm text-gray-600">
              <p className="w-28 text-gray-500">설립일</p>
              <p className="flex-1">2000년 1월 1일 (업력 24년차)</p>
              <p className="w-28 text-gray-500">홈페이지</p>
              <p className="flex-1 truncate" title="www.test.com">www.test.com</p>
            </div>

            {/* 4열: 주소 */}
            <div className="flex text-sm text-gray-600">
              <p className="w-28 text-gray-500">기업주소</p>
              <p className="flex-1 col-span-3 truncate" title="서울특별시 강남구 도산대로 10">
                서울특별시 강남구 도산대로 10
              </p>
            </div>
          </div>

          {/* 우측 로고 */}
          <div className="w-32 h-20 flex-shrink-0 flex items-center justify-center ml-8">
            <Image
              src="/images/logo/logo6.png"
              alt="회사 로고"
              width={100}
              height={50}
              className="object-contain"
            />
          </div>
        </div>

        {/* 버튼 구역 */}
        <div className="border-t p-4 flex flex-wrap gap-2 justify-start">
          <Link href="#" className="border rounded-md px-4 py-2 text-sm hover:bg-gray-50">
            채용정보 6건 &gt;
          </Link>
          <Link href="#" className="border rounded-md px-4 py-2 text-sm hover:bg-gray-50">
            면접후기 10건 &gt;
          </Link>
          <Link href="#" className="border rounded-md px-4 py-2 text-sm hover:bg-gray-50">
            기업리뷰
          </Link>
          <Link href="#" className="border rounded-md px-4 py-2 text-sm hover:bg-gray-50">
            연봉정보
          </Link>
        </div>

        {/* 전체보기 버튼 */}
        <div className="border-t p-4 text-center">
          <Link
            href="/personal/company/1/salary"
            className="text-sm text-blue-500 font-medium flex justify-center items-center gap-1 hover:underline"
          >
            기업정보 전체보기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill="#2365f2"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
