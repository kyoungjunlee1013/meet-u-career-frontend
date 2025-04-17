"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { time: "오전", male: 15, female: 7, other: 2 },
  { time: "1-3시", male: 35, female: 25, other: 18 },
  { time: "4-7시", male: 25, female: 20, other: 28 },
  { time: "8-11시", male: 15, female: 18, other: 25 },
  { time: "12-3시", male: 8, female: 10, other: 15 },
  { time: "3시 이후", male: 3, female: 5, other: 7 },
]

export function ApplicationTimeAnalysis() {
  return (
    <div>
      <div className="h-[300px]">
        <div className="flex items-center gap-6 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>지원 완료</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <span>지원 취소</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span>지원 수정</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Bar dataKey="male" name="지원 완료" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="female" name="지원 취소" fill="#f97316" radius={[4, 4, 0, 0]} />
            <Bar dataKey="other" name="지원 수정" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div>
          <p className="text-sm text-gray-500">평균 지원 완료 시간</p>
          <p className="text-lg font-medium mt-1">5.2일</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">평균 지원 검토 처리 시간</p>
          <p className="text-lg font-medium mt-1">7.8일</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">평균 지원 결과 통보 시간</p>
          <p className="text-lg font-medium mt-1">9.5일</p>
        </div>
      </div>
    </div>
  )
}
