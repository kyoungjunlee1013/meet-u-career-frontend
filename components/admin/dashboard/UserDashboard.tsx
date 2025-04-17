import { MetricCards } from "@/components/admin/dashboard/MetricCards"
import { UserGrowthChart } from "@/components/admin/dashboard/UserGrowthChart"
import { UserDistributionChart } from "@/components/admin/dashboard/UserDistributionChart"
import { JobPostingGrowthChart } from "@/components/admin/dashboard/JobPostingGrowthChart"
import { JobCategoryChart } from "@/components/admin/dashboard/JobCategoryChart"
import { RecentLogins } from "@/components/admin/dashboard/RecentLogins"
import { PopularJobPostings } from "@/components/admin/dashboard/PopularJobPostings"

export default function UserDashboard() {
  return (
    <>
      <div className="mt-6">
        <MetricCards />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <UserGrowthChart />
        <UserDistributionChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <JobPostingGrowthChart />
        <JobCategoryChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentLogins />
        <PopularJobPostings />
      </div>
    </>
  )
}
