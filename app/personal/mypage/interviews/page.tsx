"use client";
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { InterviewsContent } from "@/components/personal/mypage/interviews/InterviewsContent"

import { useSidebar } from "@/components/personal/mypage/SidebarProvider"

export default function InterviewsPage() {
  const { sidebarOpen } = useSidebar();
  return (
    <main className="min-h-screen bg-gray-50">
      <PersonalHeader />
      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : 'md:pl-0'}`}>
        <PersonalSidebar activeItem="면접 현황" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <InterviewsContent />
        </div>
      </div>
    </main>
  )
}
