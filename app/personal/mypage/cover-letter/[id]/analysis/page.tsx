"use client";

import React, { Suspense } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { CoverLetterAnalysisContent } from "@/components/personal/mypage/cover-letter/analysis/CoverLetterAnalysisContent";
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader";
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar";
import { useSidebar } from "@/components/personal/mypage/SidebarProvider";

interface CoverLetterAnalysisPageProps {
  params: {
    id: string;
  };
}

export default function CoverLetterAnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isChecking = useAuthGuard("personal"); // personal만 접근 가능

  const { id } = React.use(params);
  const { sidebarOpen } = useSidebar();

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader />
      <PersonalSidebar activeItem="자기소개서 관리" />

      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "md:pl-64" : "md:pl-0"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <Suspense fallback={<AnalysisPageSkeleton />}>
            <CoverLetterAnalysisContent coverLetterId={id} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

// Skeleton for loading state
const AnalysisPageSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};
