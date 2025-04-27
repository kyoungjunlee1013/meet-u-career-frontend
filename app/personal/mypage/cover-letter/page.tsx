"use client";

import Link from "next/link";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader";
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar";
import { CoverLetterContent } from "@/components/personal/mypage/cover-letter/CoverLetterContent";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useSidebar } from "@/components/personal/mypage/SidebarProvider";

export default function CoverLetterPage() {
  const isChecking = useAuthGuard("personal"); // personal만 접근 가능

  const { sidebarOpen } = useSidebar();

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <main className="min-h-screen bg-gray-50">
      <PersonalHeader />
      <div
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "md:pl-64" : "md:pl-0"
        }`}
      >
        <PersonalSidebar activeItem="자기소개서 관리" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              자기소개서 관리
            </h1>
            <Link href="/personal/mypage/cover-letter/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" />새 자기소개서 등록
              </Button>
            </Link>
          </div>
          <CoverLetterContent />
        </div>
      </div>
    </main>
  );
}
