"use client"

import { BusinessHeader } from "@/components/business/layout/BusinessHeader"
import { JobsHeader } from "@/components/business/jobs/JobsHeader"
import { JobsStatistics } from "@/components/business/jobs/JobsStatistics"
import { JobsSearch } from "@/components/business/jobs/JobsSearch"
import { JobsTable } from "@/components/business/jobs/JobsTable"

export const BusinessJobsManagement = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <main className="max-w-[1200px] mx-auto px-6 py-6">
        <JobsHeader />
        <JobsStatistics />
        <JobsSearch />
        <JobsTable />
      </main>
    </div>
  )
}
