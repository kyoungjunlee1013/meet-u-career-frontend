"use client"

import { BusinessHeader } from "@/components/business/layout/BusinessHeader"
import { CompanyProfile } from "./CompanyProfile"
import { JobStatistics } from "./JobStatistics"
import { ViewStatistics } from "./ViewStatistics"
import { JobPostingsList } from "./JobPostingsList"

export const BusinessDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <CompanyProfile />
        <JobStatistics />
        <ViewStatistics />
        <JobPostingsList />
      </main>
    </div>
  )
}
