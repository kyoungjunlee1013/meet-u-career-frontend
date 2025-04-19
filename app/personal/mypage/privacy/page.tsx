"use client";
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { PrivacyContent } from "@/components/personal/mypage/privacy/PrivacyContent"
import { useSidebar } from "@/components/personal/mypage/SidebarProvider"

export default function PrivacyPage() {
  const { sidebarOpen } = useSidebar();
  return (
    <main className="min-h-screen bg-gray-50">
      <PersonalHeader />
      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : 'md:pl-0'}`}>
        <PersonalSidebar activeItem="열람 차단 설정" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PrivacyContent />
        </div>
      </div>
    </main>
  )
}
