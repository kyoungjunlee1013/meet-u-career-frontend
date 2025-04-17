"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Maximize2 } from "lucide-react"

const data = [
  { month: "1월", users: 12000 },
  { month: "2월", users: 13500 },
  { month: "3월", users: 15000 },
  { month: "4월", users: 16500 },
  { month: "5월", users: 18000 },
  { month: "6월", users: 19500 },
  { month: "7월", users: 21000 },
  { month: "8월", users: 22500 },
  { month: "9월", users: 24000 },
  { month: "10월", users: 25500 },
  { month: "11월", users: 27000 },
  { month: "12월", users: 28500 },
]

export function UserGrowthChart() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">사용자 증가 추이</h3>
        <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-gray-600">
          <Maximize2 size={18} />
        </button>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        </div>
        <span className="text-sm text-gray-500">사용자 수</span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis
              domain={[12000, 30000]}
              ticks={[12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000, 28000]}
              axisLine={false}
              tickLine={false}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
