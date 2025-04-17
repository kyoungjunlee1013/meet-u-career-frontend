"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { PersonalHeader } from "./PersonalHeader"
import { PersonalSidebar } from "./PersonalSidebar"
import { SidebarProvider, useSidebar } from "./SidebarProvider"
import { ProfileCard } from "./ProfileCard"
import { RecentApplications } from "./RecentApplications"
import { RecommendedJobs } from "./RecommendedJobs"

export const PersonalMyPageContent = () => {
  return (
    <>
      <ProfileCard />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">최근 지원 현황</h2>
          <Link
            href="/personal/applications"
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            전체보기 <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <RecentApplications />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">추천 공고</h2>
          <Link href="/personal/jobs" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            전체보기 <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <RecommendedJobs />
      </div>
    </>
  )
}
