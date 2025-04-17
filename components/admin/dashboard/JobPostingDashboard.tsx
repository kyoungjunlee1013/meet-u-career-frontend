import { JobPostingMetricCards } from "@/components/admin/dashboard/JobPostingMetricCards"
import { JobPostingGrowthChart } from "@/components/admin/dashboard/JobPostingGrowthChart"
import { JobPostingByIndustryChart } from "@/components/admin/dashboard/JobPostingByIndustryChart"
import { JobPostingByRegionChart } from "@/components/admin/dashboard/JobPostingByRegionChart"
import { JobPostingStatus } from "@/components/admin/dashboard/JobPostingStatus"
import { TopCompanies } from "@/components/admin/dashboard/TopCompanies"
import { PopularKeywords } from "@/components/admin/dashboard/PopularKeywords"

export default function JobPostingDashboard() {
  return (
    <>
      <div className="mt-6">
        <JobPostingMetricCards />
      </div>

      <div className="mt-6">
        <JobPostingGrowthChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <JobPostingByIndustryChart />
        <JobPostingByRegionChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <JobPostingStatus />
        <TopCompanies />
      </div>

      <div className="mt-6">
        <PopularKeywords />
      </div>
    </>
  )
}
