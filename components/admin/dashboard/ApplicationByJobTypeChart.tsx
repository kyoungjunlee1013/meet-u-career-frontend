"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Maximize2, Minimize2 } from "lucide-react";

const data = [
  { name: "개발", value: 95000 },
  { name: "마케팅", value: 45000 },
  { name: "디자인", value: 35000 },
  { name: "영업", value: 28000 },
  { name: "엔지니어링", value: 38000 },
  { name: "경영지원", value: 18000 },
  { name: "프로덕트", value: 12000 },
  { name: "기타", value: 11000 },
];

export function ApplicationByJobTypeChart() {
  return (
    <>
      <div className="bg-white rounded-lg shadow transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">직무별 지원 현황</h3>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
              />
              <XAxis type="number" axisLine={false} tickLine={false} />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                width={60}
                tick={{ fontSize: 12 }}
              />
              <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
