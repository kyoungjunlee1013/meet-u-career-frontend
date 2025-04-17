"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { Eye } from "lucide-react"

const data = [
  { name: "서울", value: 45 },
  { name: "경기", value: 25 },
  { name: "인천", value: 10 },
  { name: "부산", value: 8 },
  { name: "기타", value: 12 },
]

const COLORS = ["#4F46E5", "#38BDF8", "#FB923C", "#F87171", "#A3A3A3"]

export function JobPostingByRegionChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">지역별 채용공고</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <Eye className="h-4 w-4" />
        </button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" iconSize={8} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
