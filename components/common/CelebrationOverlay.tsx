"use client";
import React from "react";

interface CelebrationOverlayProps {
  show: boolean;
  message?: string;
  subMessage?: string;
  children?: React.ReactNode;
}

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({ show, message = "저장 완료!", subMessage = "목록으로 이동합니다...", children }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/30">
      <div className="flex flex-col items-center justify-center bg-white rounded-full shadow-2xl p-12 animate-pop">
        <div className="mb-4">
          {/* 원형 프로그래스바 */}
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
            <circle cx="40" cy="40" r="36" stroke="#2563eb" strokeWidth="8" fill="none" strokeDasharray={2*Math.PI*36} strokeDashoffset={0} style={{transition: 'stroke-dashoffset 1s'}} />
          </svg>
        </div>
        <div className="text-xl font-bold text-blue-700 mb-2">{message}</div>
        <div className="text-gray-500 text-sm">{subMessage}</div>
      </div>
      {children}
    </div>
  );
};
