"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Maximize2 } from "lucide-react"

const data = [
  { name: "개인 사용자", value: 65 },
  { name: "기업 사용자", value: 25 },
  { name: "관리자", value: 10 },
]

const COLORS = ["#4f46e5", "#38bdf8", "#f43f5e"]

export function UserDistributionChart() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">사용자 유형 분포</h3>
        <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-gray-600">
          <Maximize2 size={18} />
        </button>
      </div>

      <div className="h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center space-x-6 mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            <span className="text-sm text-gray-600">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
