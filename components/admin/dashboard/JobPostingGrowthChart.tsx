"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Eye } from "lucide-react"

const data = [
  { month: "1월", value: 1500 },
  { month: "2월", value: 1700 },
  { month: "3월", value: 1900 },
  { month: "4월", value: 2100 },
  { month: "5월", value: 2300 },
  { month: "6월", value: 2500 },
  { month: "7월", value: 2700 },
  { month: "8월", value: 2900 },
  { month: "9월", value: 3100 },
  { month: "10월", value: 3300 },
  { month: "11월", value: 3500 },
  { month: "12월", value: 3700 },
]

export function JobPostingGrowthChart() {
  const [period, setPeriod] = useState("month")

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">채용공고 증가 추이</h3>
        <div className="flex items-center space-x-2">
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <button
              onClick={() => setPeriod("day")}
              className={`px-3 py-1 text-xs ${
                period === "day" ? "bg-gray-100 text-gray-800" : "bg-white text-gray-500"
              }`}
            >
              일간
            </button>
            <button
              onClick={() => setPeriod("week")}
              className={`px-3 py-1 text-xs ${
                period === "week" ? "bg-gray-100 text-gray-800" : "bg-white text-gray-500"
              }`}
            >
              주간
            </button>
            <button
              onClick={() => setPeriod("month")}
              className={`px-3 py-1 text-xs ${
                period === "month" ? "bg-gray-100 text-gray-800" : "bg-white text-gray-500"
              }`}
            >
              월간
            </button>
            <button
              onClick={() => setPeriod("year")}
              className={`px-3 py-1 text-xs ${
                period === "year" ? "bg-gray-100 text-gray-800" : "bg-white text-gray-500"
              }`}
            >
              연간
            </button>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-blue-400 mr-2"></div>
          <span className="text-xs text-gray-500">채용공고 수</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              domain={[0, 4000]}
              ticks={[0, 1000, 2000, 3000, 4000]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 3, fill: "#3B82F6" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
