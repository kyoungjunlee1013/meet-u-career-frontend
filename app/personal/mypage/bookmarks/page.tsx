"use client";
import { useState } from "react"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { BookmarksContent } from "@/components/personal/mypage/bookmarks/BookmarksContent"

export default function BookmarksPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={toggleSidebar} />

      <div className="flex pt-16">
        <PersonalSidebar isOpen={isSidebarOpen} activeItem="스크랩" />

        <main className="flex-1 p-6 ml-0 md:ml-64 transition-all duration-300">
          <BookmarksContent />
        </main>
      </div>
    </div>
  )
}
