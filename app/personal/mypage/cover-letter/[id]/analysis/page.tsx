"use client";
import { Suspense } from "react"
import { CoverLetterAnalysisContent } from "@/components/personal/mypage/cover-letter/analysis/CoverLetterAnalysisContent"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"

interface CoverLetterAnalysisPageProps {
  params: {
    id: string
  }
}

export default function CoverLetterAnalysisPage({ params }: CoverLetterAnalysisPageProps) {
  const { id } = params
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={toggleSidebar} />
      <PersonalSidebar isOpen={isSidebarOpen} activeItem="자기소개서 관리" />

      <main className="pt-16 md:pl-64">
        <div className="container mx-auto px-4 py-8">
          <Suspense fallback={<AnalysisPageSkeleton />}>
            <CoverLetterAnalysisContent coverLetterId={id} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

// Add missing useState import
import { useState } from "react"

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
