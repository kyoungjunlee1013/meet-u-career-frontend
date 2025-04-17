"use client";
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { ResumeEditor } from "@/components/personal/mypage/resume/ResumeEditor"

export default function CreateResumePage() {
  const searchParams = useSearchParams()
  const resumeType = searchParams.get("type") || "direct"
  const resumeId = searchParams.get("id") || undefined
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={toggleSidebar} />
      <div className="pt-16 md:pl-64">
        <PersonalSidebar isOpen={isSidebarOpen} activeItem="이력서 관리" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ResumeEditor resumeType={resumeType} resumeId={resumeId} />
        </div>
      </div>
    </main>
  )
}
