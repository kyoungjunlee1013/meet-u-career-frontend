"use client"

import { BusinessHeader } from "@/components/business/layout/BusinessHeader"
import { CompanyProfile } from "./CompanyProfile"
import { JobStatistics } from "./JobStatistics"
import { ViewStatistics } from "./ViewStatistics"
import { JobPostingsList } from "./JobPostingsList"
import { useSearchParams } from "next/navigation"
import { useDashboardData } from "@/app/hooks/useDashboardData"

export const BusinessDashboard = () => {
  const searchParams = useSearchParams()
  const companyIdParam = searchParams.get("companyId")
  const companyId = companyIdParam ? parseInt(companyIdParam, 10) : null

  const { data, loading } = useDashboardData(companyId)

  if (loading || !data) return <div className="p-6">로딩 중...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <CompanyProfile
          companyId={data.companyId}
          companyName={data.companyName}
          industry={data.industry}
          address={data.address}
          foundedDate={data.foundedDate}
          employeeScale={data.employeeScale}
        />
        <JobStatistics
          total={data.totalJobPostings}
          active={data.activeJobPostings}
          nearing={data.nearingDeadlineJobPostings}
          closed={data.closedJobPostings}
        />
        <ViewStatistics postings={data.jobPostings} />
        <JobPostingsList postings={data.jobPostings} />
      </main>
    </div>
  )
}