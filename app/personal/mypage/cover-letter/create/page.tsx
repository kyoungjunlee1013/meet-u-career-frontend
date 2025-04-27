"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useSidebar } from "@/components/personal/mypage/SidebarProvider";
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader";
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar";
import { CoverLetterEditor } from "@/components/personal/mypage/cover-letter/CoverLetterEditor";

export default function CreateCoverLetterPage() {
  const isChecking = useAuthGuard("personal"); // personal만 접근 가능

  const { sidebarOpen, toggleSidebar } = useSidebar();

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader/>
      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : 'md:pl-0'}`}>
        <PersonalSidebar activeItem="자기소개서 관리" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <CoverLetterEditor id={null} isEditMode={false} />
        </div>
      </div>
    </div>
  );
}
