"use client";

import { useSearchParams } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useSidebar } from "@/components/personal/mypage/SidebarProvider";
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader";
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar";
import { ResumeEditor } from "@/components/personal/mypage/resume/ResumeEditor";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";

interface Profile {
  profileId: number;
  accountId: number;
  name: string;
  email: string;
  phone: string;
  profileImageKey?: string;
  desiredJobCategoryName?: string | null;
  desiredLocationName?: string | null;
  experienceLevel?: string | null;
  educationLevel?: string | null;
  desiredSalaryCode?: string | null;
  skills?: string;
  profileImageUrl?: string | null;
}

export default function CreateResumePage() {
  const isChecking = useAuthGuard("personal"); // personal만 접근 가능

  const searchParams = useSearchParams();
  const resumeType = searchParams.get("type") || "direct";
  const { sidebarOpen: isSidebarOpen } = useSidebar();

  // profile 상태 관리
  const [profile, setProfile] = useState<Profile | null>(null);
  // resumeId 상태 관리
  const [resumeId, setResumeId] = useState<string | undefined>(searchParams.get("id") || undefined);

  // profile 정보 가져오기
  useEffect(() => {
    apiClient.get("/api/personal/profile/me")
      .then(res => setProfile(res.data.data))
      .catch(() => setProfile(null));
  }, []);

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <main className="min-h-screen bg-gray-50">
      <PersonalHeader />
      <div
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? "md:pl-64" : "md:pl-0"
        }`}
      >
        <PersonalSidebar activeItem="이력서 관리" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ResumeEditor
  resumeType={resumeType}
  resumeId={resumeId}
  profile={profile}
  isEditMode={!!resumeId}
/>
        </div>
      </div>
    </main>
  );
}
