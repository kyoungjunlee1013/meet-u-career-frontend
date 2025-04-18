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
    <div className="space-y-10">
      <ProfileCard />

      <div className="space-y-10">
        <RecentApplications />
        <RecommendedJobs />
      </div>
    </div>
  )
}
