"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { JobPostingForm } from "@/components/business/jobs/register/JobPostingForm";

export default function RegisterJobPostingPage() {
  const isChecking = useAuthGuard("business"); // business만 접근 가능

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">공고 작성하기</h1>
        <JobPostingForm />
      </main>
    </div>
  );
}
