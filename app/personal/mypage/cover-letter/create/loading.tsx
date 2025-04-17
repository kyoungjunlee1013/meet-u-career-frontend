"use client";
import { Skeleton } from "@/components/ui/skeleton"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={() => {}} />
      <div className="pt-16 md:pl-64">
        <PersonalSidebar isOpen={false} activeItem="자기소개서 관리" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-40 w-full mb-6" />
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-7/10 lg:w-7/10">
              <div className="space-y-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
            <div className="w-full md:w-3/10 lg:w-3/10">
              <Skeleton className="h-80 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
