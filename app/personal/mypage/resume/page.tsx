"use client";
import { useState } from "react"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { ResumeContent } from "@/components/personal/mypage/resume/ResumeContent"

export default function ResumePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={toggleSidebar} />
      <div className="pt-16 md:pl-64">
        <PersonalSidebar isOpen={sidebarOpen} activeItem="이력서 관리" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ResumeContent />
        </div>
      </div>
    </main>
  )
}
