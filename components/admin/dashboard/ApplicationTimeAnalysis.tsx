"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { ApplicationTimeStats } from "@/types/dashboard";

interface ApplicationTimeStatsProps {
  data: ApplicationTimeStats[];
}

export function ApplicationTimeAnalysis({ data }: ApplicationTimeStatsProps) {
  const chartData = data.map((item) => ({
    timeSlot: item.timeSlot,
    applied: item.applied,
  }));

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">지원 시간 분석</h3>
        </div>

        <div>
          <div className="h-64">
            <div className="flex items-center gap-6 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>지원 완료</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="timeSlot" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value: any) => [`지원 완료 수: ${value}`]}
                  labelFormatter={(label) => `${label}`}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "6px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff", fontSize: 13 }}
                  labelStyle={{ color: "#fff", fontWeight: "bold" }}
                />
                <Bar
                  dataKey="applied"
                  name="지원 완료"
                  fill="#4f46e5"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
