"use client";
import { useState } from "react"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { InterviewsContent } from "@/components/personal/mypage/interviews/InterviewsContent"

export default function InterviewsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={toggleSidebar} />
      <div className="flex pt-16">
        <PersonalSidebar isOpen={isSidebarOpen} activeItem="면접 현황" />
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : ""}`}>
          <InterviewsContent />
        </main>
      </div>
    </div>
  )
}
