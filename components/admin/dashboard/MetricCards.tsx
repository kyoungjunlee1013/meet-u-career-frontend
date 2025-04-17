import type React from "react"
import { Users, Building2, Briefcase, MessageSquare, MoreVertical } from "lucide-react"

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        icon={<Users className="text-blue-500" />}
        value="27,000"
        label="사용자"
        change={5.8}
        positive={true}
      />
      <MetricCard
        icon={<Building2 className="text-blue-400" />}
        value="3,700"
        label="기업"
        change={4.2}
        positive={true}
      />
      <MetricCard
        icon={<Briefcase className="text-orange-400" />}
        value="22,000"
        label="채용공고"
        change={6.3}
        positive={true}
      />
      <MetricCard
        icon={<MessageSquare className="text-pink-400" />}
        value="8,500"
        label="커뮤니티 게시글"
        change={2.1}
        positive={true}
      />
    </div>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  value: string
  label: string
  change: number
  positive: boolean
}

function MetricCard({ icon, value, label, change, positive }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 relative">
      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <MoreVertical size={18} />
      </button>
      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mb-4">{icon}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <div className={`text-xs ${positive ? "text-green-500" : "text-red-500"} flex items-center`}>
        <span className="mr-1">{positive ? "↑" : "↓"}</span>
        <span>{change}% 지난 달 대비</span>
      </div>
    </div>
  )
}
