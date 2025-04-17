"use client";
import { useState } from "react"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { ApplicationsContent } from "@/components/personal/mypage/applications/ApplicationsContent"

export default function ApplicationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={toggleSidebar} />
      <PersonalSidebar isOpen={sidebarOpen} activeItem="지원 내역" />
      <main className="pt-16 md:pl-64 transition-all duration-300">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <ApplicationsContent />
        </div>
      </main>
    </div>
  )
}
