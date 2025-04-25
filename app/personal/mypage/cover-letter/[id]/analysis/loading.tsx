"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader";
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={() => {}} />
      <PersonalSidebar isOpen={true} activeItem="자기소개서 관리" />

      <main className="pt-16 md:pl-64">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-24 w-full rounded-lg" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-lg" />
                ))}
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-96 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
