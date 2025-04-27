"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Header } from "@/components/home/Header";
import { MainNavigation } from "@/components/home/MainNavigation";
import { ScheduleContent } from "@/components/personal/schedule/ScheduleContent";
import { Footer } from "@/components/home/Footer";

export default function SchedulePage() {
  const isChecking = useAuthGuard("personal"); // personal만 접근 가능

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MainNavigation />
      <main className="flex-1 bg-gray-50">
        <ScheduleContent />
      </main>
      <Footer />
    </div>
  );
}
