import { Tabs } from "@/components/admin/dashboard/Tabs"
import { MetricCards } from "@/components/admin/dashboard/MetricCards"
import { UserGrowthChart } from "@/components/admin/dashboard/UserGrowthChart"
import { UserDistributionChart } from "@/components/admin/dashboard/UserDistributionChart"
import { JobPostingGrowthChart } from "@/components/admin/dashboard/JobPostingGrowthChart"
import { JobCategoryChart } from "@/components/admin/dashboard/JobCategoryChart"
import { RecentLogins } from "@/components/admin/dashboard/RecentLogins"
import { PopularJobPostings } from "@/components/admin/dashboard/PopularJobPostings"

export default function DashboardContent() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">대시보드</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">보고서 생성</button>
      </div>

      <Tabs />

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

      <footer className="mt-10 text-center text-sm text-gray-500">© 2025 Saramin. All rights reserved.</footer>
    </main>
  )
}
