import type React from "react"
import { MoreHorizontal, Briefcase, Building, Eye } from "lucide-react"

export function JobPostingMetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        icon={<Briefcase className="h-5 w-5 text-blue-500" />}
        title="총 채용공고"
        value="22,000"
        change="+6.3%"
        isPositive={true}
      />
      <MetricCard
        icon={<Briefcase className="h-5 w-5 text-blue-500" />}
        title="활성 채용공고"
        value="14,500"
        change="+5.2%"
        isPositive={true}
      />
      <MetricCard
        icon={<Building className="h-5 w-5 text-orange-500" />}
        title="참여 기업"
        value="3,700"
        change="+4.2%"
        isPositive={true}
      />
      <MetricCard
        icon={<Eye className="h-5 w-5 text-pink-500" />}
        title="조회수"
        value="1.2M"
        change="+12.5%"
        isPositive={true}
      />
    </div>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  title: string
  value: string
  change: string
  isPositive: boolean
}

function MetricCard({ icon, title, value, change, isPositive }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 relative">
      <div className="absolute top-4 right-4">
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 mb-4">{icon}</div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
      <p className={`text-xs mt-2 ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {isPositive ? "↑" : "↓"} {change} 전년 대비
      </p>
    </div>
  )
}
