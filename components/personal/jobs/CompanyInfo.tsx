import Link from "next/link"

export const CompanyInfo = () => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-gray-50 p-4 flex justify-between items-center">
        <h3 className="font-bold">기업정보</h3>
        <Link href="/personal/company/1/salary" className="text-sm text-blue-500 flex items-center">
          기업정보 전체보기
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill="#2365f2"></path>
          </svg>
        </Link>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0"></div>
          <div>
            <Link href="/personal/company/1/salary" className="font-medium hover:text-blue-500 hover:underline">
              (주)테스트그룹
            </Link>
            <p className="text-sm text-gray-500 mt-1">IT, 웹서비스</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">대기업</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">사원수 1,000명+</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <p className="text-gray-500">산업</p>
            <p>소프트웨어 개발</p>
          </div>
          <div>
            <p className="text-gray-500">사원수</p>
            <p>1,200명</p>
          </div>
          <div>
            <p className="text-gray-500">설립일</p>
            <p>2000년 1월</p>
          </div>
          <div>
            <p className="text-gray-500">평균연봉</p>
            <p>6,500만원</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-500">
            (주)테스트그룹은 혁신적인 소프트웨어 솔루션을 개발하는 기업으로, 클라우드 서비스, 인공지능, 빅데이터 분석 등
            다양한 IT 서비스를 제공하고 있습니다.
          </p>
        </div>
      </div>
    </div>
  )
}
