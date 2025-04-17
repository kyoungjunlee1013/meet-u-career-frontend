"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Eye } from "lucide-react"

const data = [
  { name: "개발", value: 7500 },
  { name: "마케팅", value: 3500 },
  { name: "디자인", value: 2500 },
  { name: "영업", value: 2000 },
  { name: "경영지원", value: 3000 },
  { name: "연구개발", value: 1000 },
  { name: "엔지니어", value: 800 },
  { name: "기타", value: 700 },
]

export function JobPostingByIndustryChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">직무별 채용공고</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <Eye className="h-4 w-4" />
        </button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              domain={[0, 8000]}
            />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              width={60}
            />
            <Bar dataKey="value" fill="#4F46E5" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
