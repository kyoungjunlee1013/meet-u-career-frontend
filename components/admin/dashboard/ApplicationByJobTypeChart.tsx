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
import { JobTypeData } from "@/types/admin/dashboard";

interface JobTypeDataProps {
  data: JobTypeData[];
}

export function ApplicationByJobTypeChart({ data }: JobTypeDataProps) {
  const chartData = data.map((item) => ({
    categoryName: item.categoryName,
    jobPostingCount: item.jobPostingCount,
  }));

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">직무별 지원 현황</h3>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" axisLine={false} tickLine={false} />
              <YAxis
                dataKey="categoryName"
                type="category"
                axisLine={false}
                tickLine={false}
                width={60}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: any) => [`${value}건`, "지원 건수"]}
                labelFormatter={(label: any) => `${label}`}
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
                dataKey="jobPostingCount"
                fill="#4f46e5"
                radius={[0, 4, 4, 0]}
                barSize={30}
                activeBar={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
