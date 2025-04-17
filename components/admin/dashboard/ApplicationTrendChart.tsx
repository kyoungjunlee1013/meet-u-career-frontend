"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "1월", total: 16000, inProgress: 8000, accepted: 4000 },
  { month: "2월", total: 17000, inProgress: 8500, accepted: 4200 },
  { month: "3월", total: 18000, inProgress: 9000, accepted: 4500 },
  { month: "4월", total: 19500, inProgress: 9500, accepted: 5000 },
  { month: "5월", total: 21000, inProgress: 10000, accepted: 5200 },
  { month: "6월", total: 22500, inProgress: 10500, accepted: 5500 },
  { month: "7월", total: 24000, inProgress: 11000, accepted: 5800 },
  { month: "8월", total: 25500, inProgress: 11500, accepted: 6000 },
  { month: "9월", total: 27000, inProgress: 12000, accepted: 6200 },
  { month: "10월", total: 28500, inProgress: 12500, accepted: 6500 },
  { month: "11월", total: 30000, inProgress: 13000, accepted: 6800 },
  { month: "12월", total: 32000, inProgress: 14000, accepted: 7000 },
]

export function ApplicationTrendChart() {
  return (
    <div className="h-[300px]">
      <div className="flex items-center gap-6 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>총 지원 건수</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <span>합격</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span>불합격</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
          <Line
            type="monotone"
            dataKey="inProgress"
            stroke="#f87171"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line type="monotone" dataKey="accepted" stroke="#4ade80" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
