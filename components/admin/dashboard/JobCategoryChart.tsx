"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { Maximize2 } from "lucide-react"

const data = [
  { category: "개발", count: 35 },
  { category: "마케팅", count: 20 },
  { category: "디자인", count: 15 },
  { category: "영업", count: 10 },
  { category: "경영지원", count: 15 },
  { category: "기타", count: 5 },
]

const COLORS = ["#4f46e5", "#38bdf8", "#fb923c", "#a78bfa", "#f87171", "#d1d5db"]

export function JobCategoryChart() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">채용공고 카테고리 분포</h3>
        <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-gray-600">
          <Maximize2 size={18} />
        </button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" axisLine={false} tickLine={false} domain={[0, 35]} />
            <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} width={80} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
