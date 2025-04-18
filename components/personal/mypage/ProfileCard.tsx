import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function ProfileCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      {/* 상단: 프로필 정보 + 프로필 완성도 */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">홍길동</h2>
              <span className="bg-gray-100 text-xs px-2 py-0.5 rounded ml-1">프로필 수정</span>
            </div>
            <p className="text-base text-gray-600 mb-2">경력 3년 | 프론트엔드 개발자</p>
            <div className="flex gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">React</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">TypeScript</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Next.js</span>
            </div>
          </div>
        </div>
        {/* 프로필 완성도 */}
        <div className="min-w-[220px]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-700">프로필 완성도</span>
            <span className="text-sm font-semibold text-blue-600">85%</span>
          </div>
          <div className="w-44 bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
          </div>
          <Link href="/personal/profile/edit" className="text-xs text-blue-600 hover:text-blue-800 flex items-center justify-end">
            프로필 완성하기 <ChevronRight className="h-3 w-3 ml-0.5" />
          </Link>
        </div>
      </div>
      {/* 하단: 통계 */}
      <div className="grid grid-cols-4 divide-x bg-white rounded-lg">
        <div className="flex flex-col items-center py-4">
          {/* 지원 현황 아이콘 */}
          <svg className="w-6 h-6 text-blue-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <span className="text-lg font-bold text-gray-900">12</span>
          <span className="text-xs text-gray-500 mt-1">지원 현황</span>
        </div>
        <div className="flex flex-col items-center py-4">
          {/* 이력서 열람 아이콘 */}
          <svg className="w-6 h-6 text-blue-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          <span className="text-lg font-bold text-gray-900">5</span>
          <span className="text-xs text-gray-500 mt-1">이력서 열람</span>
        </div>
        <div className="flex flex-col items-center py-4">
          {/* 받은 제안 아이콘 */}
          <svg className="w-6 h-6 text-blue-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          <span className="text-lg font-bold text-gray-900">3</span>
          <span className="text-xs text-gray-500 mt-1">받은 제안</span>
        </div>
        <div className="flex flex-col items-center py-4">
          {/* 스크랩 아이콘 */}
          <svg className="w-6 h-6 text-blue-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
          <span className="text-lg font-bold text-gray-900">8</span>
          <span className="text-xs text-gray-500 mt-1">스크랩</span>
        </div>
      </div>
    </div>
  )
}
