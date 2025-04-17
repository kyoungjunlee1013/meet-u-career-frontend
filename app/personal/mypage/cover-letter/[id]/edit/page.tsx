"use client";
import { useState } from "react"
import { useParams } from "next/navigation"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { CoverLetterEditor } from "@/components/personal/mypage/cover-letter/CoverLetterEditor"

export default function EditCoverLetterPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const params = useParams()
  const id = params.id as string

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={toggleSidebar} />
      <div className="pt-16 md:pl-64">
        <PersonalSidebar isOpen={isSidebarOpen} activeItem="자기소개서 관리" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <CoverLetterEditor id={id} isEditMode={true} />
        </div>
      </div>
    </div>
  )
}
