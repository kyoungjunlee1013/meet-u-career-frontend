"use client";
import React, { Suspense } from "react"
import { CoverLetterAnalysisContent } from "@/components/personal/mypage/cover-letter/analysis/CoverLetterAnalysisContent"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"

interface CoverLetterAnalysisPageProps {
  params: {
    id: string
  }
}

import { useSidebar } from "@/components/personal/mypage/SidebarProvider"

import { useSearchParams } from "next/navigation";

export default function CoverLetterAnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { sidebarOpen } = useSidebar();
  const searchParams = useSearchParams();
  let initialCoverLetter = null;
  const dataParam = searchParams.get("data");
  if (dataParam) {
    try {
      initialCoverLetter = JSON.parse(decodeURIComponent(dataParam));
    } catch {}
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader />
      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : 'md:pl-0'}`}>
        <PersonalSidebar activeItem="자기소개서 관리" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <CoverLetterAnalysisContent coverLetterId={id}/>
        </div>
      </div>
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
            <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  )
}
