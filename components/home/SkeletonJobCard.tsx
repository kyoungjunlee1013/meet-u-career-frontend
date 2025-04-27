"use client";

export const SkeletonJobCard = () => {
  return (
    <div className="group relative rounded-2xl overflow-hidden border bg-white animate-pulse">
      {/* 상단 고정 그라데이션 선 */}
      <div className="h-1 w-full bg-gray-300" />

      {/* 상단 회사명 */}
      <div className="p-3 text-center">
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
      </div>

      {/* 타이틀 */}
      <div className="px-3 pb-3 text-left">
        <div className="h-4 bg-gray-300 rounded mb-2 w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-2/3" />
      </div>

      {/* 썸네일 이미지 영역 */}
      <div className="relative w-full aspect-video bg-gray-200" />

      {/* 하단 해시태그 + D-Day + 별 */}
      <div className="flex justify-between items-center px-3 py-2 bg-black/10 text-xs">
        <div className="h-3 bg-gray-300 rounded w-1/3" />
        <div className="flex items-center space-x-2">
          <div className="h-3 bg-gray-300 rounded w-6" />
          <div className="h-3 w-3 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
};
