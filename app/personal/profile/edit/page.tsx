"use client"

import { useState } from "react"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { ProfileEditContent } from "@/components/personal/profile/edit/ProfileEditContent"

export default function ProfileEditPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={toggleSidebar} />
      <div className="flex pt-16">
        <PersonalSidebar isOpen={isSidebarOpen} activeItem="MY홈" />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <ProfileEditContent />
        </main>
      </div>
    </div>
  )
}
