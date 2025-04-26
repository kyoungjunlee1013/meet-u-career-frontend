"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ApplicationTrends } from "@/types/admin/dashboard";

interface ApplicationTrendChartProps {
  data: ApplicationTrends[];
}

export function ApplicationTrendChart({ data }: ApplicationTrendChartProps) {
  const chartData = data.map((item) => ({
    date: item.date,
    total: item.totalApplications,
    accepted: item.acceptedApplications,
    rejected: item.rejectedApplication,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">지원 추이</h3>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>총 지원자 건수</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span>서류 합격</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <span>서류 불합격</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="date"
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
              formatter={(value: any, name: string) => {
                switch (name) {
                  case "total":
                    return [`${value}`, "총 지원자 건수"];
                  case "accepted":
                    return [`${value}`, "서류 합격"];
                  case "rejected":
                    return [`${value}`, "서류 불합격"];
                  default:
                    return [value, name];
                }
              }}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
              }}
              itemStyle={{
                color: "#fff",
                fontSize: 13,
              }}
              labelStyle={{
                color: "#fff",
                fontWeight: "bold",
              }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="accepted"
              stroke="#4ade80"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="rejected"
              stroke="#f87171"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
