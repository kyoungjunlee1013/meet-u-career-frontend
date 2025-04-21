"use client";

import { Star } from "lucide-react";

export const MiniHeader = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
            <div className="flex justify-between items-center px-6 py-2">
                {/* 왼쪽 - 회사명 + 관심기업 */}
                <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold">(주)더비즈온</span>
                    <button className="border px-2 py-1 rounded text-xs text-gray-700">관심기업</button>
                    <button className="border px-2 py-1 rounded text-xs text-gray-700">채용중 6</button>
                </div>

                {/* 가운데 - 공고 제목 */}
                <div className="text-base font-bold">웹 개발 채용공고</div>

                {/* 오른쪽 - 입사지원 버튼 */}
                <div className="flex items-center gap-3">
                    {/* 스크랩 버튼 */}
                    <button className="border w-12 h-10 rounded-md flex flex-col items-center justify-center">
                        <Star className="w-4 h-4 text-gray-600" />
                        <span className="text-[10px] text-gray-500 mt-0.5">130</span>
                    </button>

                    {/* 입사지원 버튼 */}
                    <div className="relative">
                        <button className="bg-red-500 text-white font-bold w-28 h-10 rounded-md flex items-center justify-center">
                            입사지원
                        </button>
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white border border-red-500 text-red-500 text-[10px] px-2 py-0.5 rounded-full">
                            D-9
                        </div>
                    </div>

                    <div className="text-gray-500 text-sm ml-4 flex gap-2">
                        <button>로그인</button>
                        <span>|</span>
                        <button>회원가입</button>
                    </div>

                    <button className="w-6 h-6 rounded-full bg-[#8694b8] flex items-center justify-center text-white text-xs ml-4">
                        ☰
                    </button>
                </div>
            </div>
        </header>
    );
};
