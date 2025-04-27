"use client";

import { Header } from "@/components/home/Header";
import { LoginHeader } from "@/components/home/LoginHeader";
import { MainNavigation } from "@/components/home/MainNavigation"
import { JobsContent } from "@/components/personal/jobs/JobsContent"
import { Footer } from "@/components/home/Footer"
import { useUserStore } from "@/store/useUserStore";
import { useSearchParams } from "next/navigation";

export default function JobsPage() {
  const { userInfo, isUserInfoHydrated } = useUserStore();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  console.log("keyword : " + keyword);

  if (!isUserInfoHydrated) {
    return null; // 아직 복구 중이면 화면 그리지 않음
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {userInfo ? <LoginHeader /> : <Header />}
      <MainNavigation />
      <main className="flex-1">
        <JobsContent />
      </main>
      <Footer />
    </div>
  )
}
