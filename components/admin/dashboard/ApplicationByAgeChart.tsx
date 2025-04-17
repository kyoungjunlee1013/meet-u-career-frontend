"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { age: "20대", applications: 120000, accepted: 40000, rejected: 80000 },
  { age: "30대", applications: 90000, accepted: 35000, rejected: 55000 },
  { age: "40대", applications: 50000, accepted: 20000, rejected: 30000 },
  { age: "50대", applications: 20000, accepted: 8000, rejected: 12000 },
  { age: "60대 이상", applications: 2000, accepted: 800, rejected: 1200 },
]

export function ApplicationByAgeChart() {
  return (
    <div className="h-[300px]">
      <div className="flex items-center gap-6 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>지원자 수</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span>합격</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <span>불합격</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="age" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Bar dataKey="applications" name="지원자 수" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
