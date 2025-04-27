"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface LocationStats {
  locationName: string;
  jobPostingCount: number;
}

interface JobPostingByRegionChartProps {
  data: LocationStats[];
}

// 색상 팔레트 (충분히 다양한 색상 제공)
const COLORS = [
  "#4F46E5", "#38BDF8", "#FB923C", "#F87171", "#A3A3A3", "#10B981",
  "#FBBF24", "#C084FC", "#EC4899", "#F43F5E", "#14B8A6", "#8B5CF6",
  "#E879F9", "#6366F1", "#22D3EE", "#FACC15"
];

/**
 * 상위 10개 + 그 외 데이터 가공
 */
const processData = (data: LocationStats[]) => {
  const sortedData = [...data].sort((a, b) => b.jobPostingCount - a.jobPostingCount);
  const top10 = sortedData.slice(0, 10);
  const others = sortedData.slice(10);
  const othersCount = others.reduce((sum, item) => sum + item.jobPostingCount, 0);

  if (othersCount > 0) {
    top10.push({ locationName: "그 외", jobPostingCount: othersCount });
  }

  return top10;
};

// 툴팁 커스터마이징
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0) {
    const { locationName, jobPostingCount } = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "6px 10px",
          borderRadius: "6px",
          fontSize: "12px",
          boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        }}
      >
        {locationName}: {jobPostingCount}개
      </div>
    );
  }
  return null;
};

export function JobPostingByRegionChart({ data }: JobPostingByRegionChartProps) {
  const processedData = processData(data);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">지역별 채용공고</h3>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 40 }}>
            <Pie
              data={processedData}
              cx="50%"
              cy="45%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="jobPostingCount"
              label={false}
            >
              {processedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                marginTop: "12px",
                fontSize: "12px",
                lineHeight: "20px",
              }}
              formatter={(value, entry: any) => {
                const payload = entry.payload as LocationStats;
                return `${payload.locationName} (${payload.jobPostingCount})`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
