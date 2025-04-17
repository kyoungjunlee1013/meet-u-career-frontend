"use client";
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { BookmarksContent } from "@/components/personal/mypage/bookmarks/BookmarksContent"

import { useSidebar } from "@/components/personal/mypage/SidebarProvider"

export default function BookmarksPage() {
  const { sidebarOpen } = useSidebar();
  return (
    <main className="min-h-screen bg-gray-50">
      <PersonalHeader />
      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : 'md:pl-0'}`}>
        <PersonalSidebar activeItem="스크랩" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">스크랩</h1>
          </div>
          <BookmarksContent />
        </div>
      </div>
    </main>
  )
}
