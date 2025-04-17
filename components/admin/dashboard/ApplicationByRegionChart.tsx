"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "서울", value: 45 },
  { name: "경기/인천", value: 25 },
  { name: "부산", value: 10 },
  { name: "대구", value: 8 },
  { name: "기타", value: 12 },
]

const COLORS = ["#4f46e5", "#f97316", "#ef4444", "#8b5cf6", "#10b981"]

export function ApplicationByRegionChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value) => <span className="text-xs">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
