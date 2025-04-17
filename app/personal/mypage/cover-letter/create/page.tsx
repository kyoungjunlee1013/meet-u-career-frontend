"use client"

import { useState } from "react"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { CoverLetterEditor } from "@/components/personal/mypage/cover-letter/CoverLetterEditor"

export default function CreateCoverLetterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={toggleSidebar} />
      <div className="pt-16 md:pl-64">
        <PersonalSidebar isOpen={sidebarOpen} activeItem="자기소개서 관리" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <CoverLetterEditor id={null} isEditMode={false} />
        </div>
      </div>
    </div>
  )
}
