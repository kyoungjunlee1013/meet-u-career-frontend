"use client";
import { useState } from "react"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { OffersContent } from "@/components/personal/mypage/offers/OffersContent"

export default function OffersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={toggleSidebar} />
      <PersonalSidebar isOpen={isSidebarOpen} activeItem="받은 제안" />

      <main className="pt-16 md:pl-64">
        <OffersContent />
      </main>
    </div>
  )
}
