"use client";

import { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { UserDistributionChartProps } from "@/types/admin/dashboard";
import { Info } from "lucide-react";

const COLORS = ["#4f46e5", "#38bdf8"]; // 관리자 색상은 제외

export function UserDistributionChart({ data }: UserDistributionChartProps) {
  const [expanded, setExpanded] = useState(false);

  // 관리자는 제외하고, 개인회원(0)과 기업회원(1)만 필터링
  const filteredData = data.filter((entry) => entry.accountType !== 2);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium flex items-baseline">
          사용자 유형 분포
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

      <div className="h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              dataKey="count"
            >
              {filteredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const { payload: chartData } = payload[0];
                  const label =
                    chartData.accountType === 0
                      ? "개인회원"
                      : chartData.accountType === 1
                        ? "기업회원"
                        : "기타";

                  return (
                    <div
                      className="p-2 rounded shadow-md text-xs"
                      style={{
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      <div>
                        <strong>{label}</strong>: {chartData.count}명
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center space-x-6 mt-4">
        {filteredData.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-sm text-gray-600">
              {entry.accountType === 0
                ? "개인회원"
                : entry.accountType === 1
                  ? "기업회원"
                  : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
