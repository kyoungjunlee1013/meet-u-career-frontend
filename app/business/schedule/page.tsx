"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { BusinessSchedule } from "@/components/business/schedule/BusinessSchedule";

export default function SchedulePage() {
  const isChecking = useAuthGuard("business"); // business만 접근 가능

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return <BusinessSchedule />;
}
