"use client";

import { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

// 결제 내역용 검색 컴포넌트 (지원자 관리 검색 참고)
export const PaymentsSearch = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="mb-6 flex gap-2">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="주문번호, 광고명, 결제자 검색"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">검색</button>
      <div className="relative" ref={filterRef}>
        <button
          className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          aria-expanded={isFilterOpen}
          aria-haspopup="true"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>필터</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </button>
        {/* 결제 필터 드롭다운은 추후 구현 */}
        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4 text-gray-700 text-sm">
            <div className="mb-2 font-semibold">필터 (예시)</div>
            <div className="mb-1">
              <input type="checkbox" id="status-success" className="mr-2" />
              <label htmlFor="status-success">성공</label>
            </div>
            <div className="mb-1">
              <input type="checkbox" id="status-progress" className="mr-2" />
              <label htmlFor="status-progress">진행 중</label>
            </div>
            <div className="mb-1">
              <input type="checkbox" id="status-ended" className="mr-2" />
              <label htmlFor="status-ended">종료</label>
            </div>
            <button className="mt-2 w-full bg-blue-500 text-white rounded-lg py-1 hover:bg-blue-600">필터 적용</button>
          </div>
        )}
      </div>
    </div>
  );
};
