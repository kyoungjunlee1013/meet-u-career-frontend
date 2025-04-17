import type React from "react"
import { FileText, File, Link } from "lucide-react"

interface ResumeSummaryStatsCardListProps {
  stats: {
    total: number
    meetU: number
    fileAndLink: number
  }
}

export const ResumeSummaryStatsCardList = ({ stats }: ResumeSummaryStatsCardListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        icon={<FileText className="h-6 w-6 text-blue-600" />}
        title="전체 이력서 수"
        value={stats.total}
        unit="건"
      />
      <StatCard
        icon={<File className="h-6 w-6 text-blue-600" />}
        title="MeetU 이력서 수"
        value={stats.meetU}
        unit="건"
      />
      <StatCard
        icon={<Link className="h-6 w-6 text-blue-600" />}
        title="파일/링크 이력서 수"
        value={stats.fileAndLink}
        unit="건"
      />
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: number
  unit: string
}

const StatCard = ({ icon, title, value, unit }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
      <div className="mr-4 bg-blue-50 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">
          {value}
          <span className="text-lg ml-1">{unit}</span>
        </p>
      </div>
    </div>
  )
}
