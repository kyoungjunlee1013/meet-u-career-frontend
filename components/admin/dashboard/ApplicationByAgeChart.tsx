"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ApplicationAgeGroup } from "@/types/dashboard";

interface ApplicationByAgeChartProps {
  data: ApplicationAgeGroup[];
}

export function ApplicationByAgeChart({ data }: ApplicationByAgeChartProps) {
  const chartData = data.map((item) => ({
    ageGroup: item.ageGroup,
    count: item.count,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">지원자 연령분포</h3>
      </div>

      <div className="h-64">
        <div className="flex items-center gap-6 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>지원자 수</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="ageGroup" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value: any) => [`지원자 수: ${value}`]}
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
              dataKey="count"
              name="지원자 수"
              fill="#4f46e5"
              radius={[4, 4, 0, 0]}
              barSize={30}
              activeBar={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
