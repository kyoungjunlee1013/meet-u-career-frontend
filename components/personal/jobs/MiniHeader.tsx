"use client";

import { Star } from "lucide-react";

export const MiniHeader = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
            {/* 큰 화면에서는 padding-left: 30rem, 모바일에서는 자동으로 줄어들게 */}
            <div className="relative flex items-center justify-start py-2 pl-[30rem] md:pl-[30rem] sm:pl-[4rem]">

                {/* 왼쪽 영역 - 회사명/관심기업/채용중/공고제목 + 스크랩/입사지원 */}
                <div className="flex items-center gap-20">
                    {/* 왼쪽: 회사명/관심기업/채용중/공고제목 */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold whitespace-nowrap">(주)더비즈온</span>
                            <button className="border px-2 py-1 rounded text-xs text-gray-700 whitespace-nowrap">관심기업</button>
                            <button className="border px-2 py-1 rounded text-xs text-gray-700 whitespace-nowrap">채용중 6</button>
                        </div>
                        <div className="text-base font-bold mt-1 whitespace-nowrap">
                            웹 개발 채용공고
                        </div>
                    </div>

                    {/* 가운데: 스크랩/입사지원 버튼 */}
                    <div className="flex items-center gap-2">
                        <button className="border w-12 h-10 rounded-md flex flex-col items-center justify-center">
                            <Star className="w-4 h-4 text-gray-600" />
                            <span className="text-[10px] text-gray-500 mt-0.5">130</span>
                        </button>

                        <div className="relative">
                            <button className="bg-red-500 text-white font-bold w-28 h-10 rounded-md flex items-center justify-center text-sm">
                                입사지원
                            </button>
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white border border-red-500 text-red-500 text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
                                D-9
                            </div>
                        </div>
                    </div>
                </div>

                {/* 오른쪽 영역 - 로그인/회원가입/햄버거 */}
                <div className="absolute top-1/2 right-6 -translate-y-1/2 flex items-center gap-4">
                    <div className="text-gray-500 text-sm flex gap-2 whitespace-nowrap">
                        <button>로그인</button>
                        <span>|</span>
                        <button>회원가입</button>
                    </div>
                    <button className="w-6 h-6 rounded-full bg-[#8694b8] flex items-center justify-center text-white text-xs">
                        ☰
                    </button>
                </div>

            </div>
        </header>
    );
};
