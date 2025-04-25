"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "오전", male: 15 },
  { time: "1-3시", male: 35 },
  { time: "4-7시", male: 25 },
  { time: "8-11시", male: 15 },
  { time: "12-3시", male: 8 },
  { time: "3시 이후", male: 3 },
];

export function ApplicationTimeAnalysis() {
  return (
    <>
      <div className="bg-white rounded-lg shadow transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">지원 시간 분석</h3>
        </div>

        <div>
          <div className="h-[300px]">
            <div className="flex items-center gap-6 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>지원 완료</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Bar
                  dataKey="male"
                  name="지원 완료"
                  fill="#4f46e5"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div>
              <p className="text-sm text-gray-500">평균 지원 완료 시간</p>
              <p className="text-lg font-medium mt-1">5.2일</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
