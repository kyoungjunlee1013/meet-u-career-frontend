"use client"

import { Eye, Users } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface JobPostingItem {
  jobPostingId: number
  title: string
  viewCount: number
  applicationCount: number
}

interface Props {
  postings: JobPostingItem[]
}

const COLORS = ["#3b82f6", "#10b981", "#f4ec7a", "#a3a3a3"]
const RATIO_COLORS = ["#EF4444", "#3b82f6"]

export const ViewStatistics = ({ postings }: Props) => {
  const totalViews = postings.reduce((acc, p) => acc + p.viewCount, 0)
  const totalApplications = postings.reduce((acc, p) => acc + p.applicationCount, 0)

  const sortedPostings = postings
    .map((p) => ({ name: p.title, value: p.viewCount }))
    .sort((a, b) => b.value - a.value)

  const topThree = sortedPostings.slice(0, 3)
  const othersValue = sortedPostings.slice(3).reduce((sum, p) => sum + p.value, 0)
  const chartData = [...topThree, ...(othersValue > 0 ? [{ name: "기타", value: othersValue }] : [])]

  const ratioData = [
    { name: "지원자 수", value: totalApplications },
    { name: "비지원 수", value: Math.max(totalViews - totalApplications, 0) },
  ]

  return (
    <div className="bg-white rounded-md shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">조회 통계</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 도넛 1: 상위 공고 기준 조회 분포 */}
        <div>
          <div className="flex items-center mb-2">
            <Eye className="h-5 w-5 text-blue-500 mr-2" />
            <span className="font-medium">조회수 상위 공고</span>
          </div>
          <div className="text-center text-2xl font-bold mb-2">{totalViews.toLocaleString()}명</div>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label={false} // ✅ 라벨 제거
              >
                {chartData.map((_, i) => (
                  <Cell key={`view-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <ul className="mt-4 text-sm text-gray-600 space-y-2">
            {chartData.map((entry, i) => (
              <li key={entry.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span>{entry.name}</span>
                </div>
                <span>{entry.value.toLocaleString()}명</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 도넛 2: 전체 조회수 대비 지원율 */}
        <div>
          <div className="flex items-center mb-2">
            <Users className="h-5 w-5 text-blue-500 mr-2" />
            <span className="font-medium">지원 전환율</span>
          </div>
          <div className="text-center text-2xl font-bold mb-2">{totalApplications.toLocaleString()}명</div>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ratioData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label={false}
              >
                {ratioData.map((_, i) => (
                  <Cell key={`ratio-${i}`} fill={RATIO_COLORS[i % RATIO_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <ul className="mt-4 text-sm text-gray-600 space-y-2">
            {ratioData.map((entry, i) => (
              <li key={entry.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: RATIO_COLORS[i % RATIO_COLORS.length] }} />
                  <span>{entry.name}</span>
                </div>
                <span>{entry.value.toLocaleString()}명</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
