import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Eye } from "lucide-react";

interface LocationStats {
  locationName: string;
  jobPostingCount: number;
}

interface JobPostingByRegionChartProps {
  data: LocationStats[];
}

const COLORS = [
  "#4F46E5",
  "#38BDF8",
  "#FB923C",
  "#F87171",
  "#A3A3A3",
  "#D1D5DB",
];

/**
 * 데이터 가공: 상위 5개 지역을 표시하고, 나머지는 '그 외'로 처리
 */
const processData = (data: LocationStats[]) => {
  const sortedData = [...data].sort(
    (a, b) => b.jobPostingCount - a.jobPostingCount
  );
  const top5 = sortedData.slice(0, 5); // 상위 5개 지역
  const others = sortedData.slice(5); // 나머지 지역
  const othersCount = others.reduce(
    (sum, item) => sum + item.jobPostingCount,
    0
  );

  // '그 외' 카테고리 추가
  if (othersCount > 0) {
    top5.push({ locationName: "그 외", jobPostingCount: othersCount });
  }

  return top5;
};

export function JobPostingByRegionChart({
  data,
}: JobPostingByRegionChartProps) {
  const processedData = processData(data); // 데이터 가공

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">지역별 채용공고</h3>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
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
            <Tooltip
              content={(e) => {
                if (e.active && e.payload && e.payload.length > 0) {
                  const { locationName, jobPostingCount } =
                    e.payload[0].payload;
                  return (
                    <div
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        padding: "5px",
                        borderRadius: "5px",
                        fontSize: "12px",
                        color: "#333",
                      }}
                    >
                      {locationName}: {jobPostingCount} 개
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              formatter={(value) => {
                const foundData = processedData.find(
                  (item) => item.locationName === value
                );
                return foundData
                  ? `${foundData.locationName} : ${foundData.jobPostingCount}`
                  : value;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
