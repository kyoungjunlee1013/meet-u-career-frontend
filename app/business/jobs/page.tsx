"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { BusinessJobsManagement } from "@/components/business/jobs/BusinessJobsManagement";

export default function BusinessJobsPage() {
  const isChecking = useAuthGuard("business"); // business만 접근 가능

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return <BusinessJobsManagement />;
}
