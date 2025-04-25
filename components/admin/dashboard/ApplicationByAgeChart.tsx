"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ApplicationAgeGroupDTO } from "@/types/admin/dashboard";

interface ApplicationByAgeChartProps {
  data: ApplicationAgeGroupDTO[];
}

export function ApplicationByAgeChart({ data }: ApplicationByAgeChartProps) {
  return (
    <>
      <div className="bg-white rounded-lg shadow transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">지원자 연령분포</h3>
        </div>

        <div className="h-[300px]">
          <div className="flex items-center gap-6 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>지원자 수</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span>서류합격</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span>서류불합격</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="age" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Bar
                dataKey="applications"
                name="지원자 수"
                fill="#4f46e5"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
