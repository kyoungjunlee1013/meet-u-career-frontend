"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { ProfileContent } from "@/components/business/profile/ProfileContent";

export default function BusinessProfilePage() {
  const isChecking = useAuthGuard("business"); // business만 접근 가능

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <ProfileContent />
    </div>
  );
}
