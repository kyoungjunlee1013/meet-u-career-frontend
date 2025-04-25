"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye } from "lucide-react";
import { JobPostingGrowthChartData } from "@/types/admin/dashboard";

interface JobPostingGrowthChartProps {
  data: JobPostingGrowthChartData[];
}

export function JobPostingGrowthChart({ data }: JobPostingGrowthChartProps) {
  const [period, setPeriod] = useState("month");

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">채용공고 증가 추이</h3>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-blue-400 mr-2"></div>
          <span className="text-xs text-gray-500">채용공고 수</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              domain={[0, "auto"]}
            />
            <Tooltip
              formatter={(value) => `채용공고 수 : ${value}`} // 툴팁에 "채용공고 수 : n" 형태로 변경
            />
            <Line
              type="monotone"
              dataKey="jobPostingCount"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 3, fill: "#3B82F6" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
