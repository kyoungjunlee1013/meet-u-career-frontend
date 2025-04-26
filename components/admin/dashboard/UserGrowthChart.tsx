"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";
import { Info } from "lucide-react";
import { UserGrowthChartProps } from "@/types/admin/dashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  const chartData = data.map((item) => ({
    month: item.month,
    users: item.userCount,
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium flex items-baseline">
          사용자 증가 추이
          <span className="ml-2 cursor-pointer">
            <Info
              size={16}
              className="text-gray-500"
              data-tooltip-id="user-tooltip"
            />
            <ReactTooltip id="user-tooltip" place="top">
              사용자 = 개인회원 + 기업회원
            </ReactTooltip>
          </span>
        </h3>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        </div>
        <span className="text-sm text-gray-500">사용자 수</span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis domain={[0, "auto"]} axisLine={false} tickLine={false} />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const { month, users } = payload[0].payload;
                  return (
                    <div
                      className="bg-black text-white p-2 rounded shadow-md text-xs"
                      style={{
                        backgroundColor: "#000",
                        color: "#fff",
                      }}
                    >
                      <div><strong>{month}</strong></div>
                      <div>사용자 수: {users}명</div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
