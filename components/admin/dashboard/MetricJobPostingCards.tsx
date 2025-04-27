import { DashboardJobPostingMetrics } from "@/types/dashboard";
import { Briefcase, Building, Eye } from "lucide-react";

export function MetricJobPostingCards({
  metrics,
}: {
  metrics: DashboardJobPostingMetrics;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        icon={<Briefcase className="h-5 w-5 text-blue-500" />}
        title="총 채용공고"
        value={metrics.totalJobPostings.current} // 숫자 그대로 유지
        change={metrics.totalJobPostings.growthRate} // 숫자 그대로 유지
        isPositive={metrics.totalJobPostings.growthRate >= 0}
      />
      <MetricCard
        icon={<Briefcase className="h-5 w-5 text-blue-500" />}
        title="활성 채용공고"
        value={metrics.activeJobPostings.current} // 숫자 그대로 유지
        change={metrics.activeJobPostings.growthRate} // 숫자 그대로 유지
        isPositive={metrics.activeJobPostings.growthRate >= 0}
      />
      <MetricCard
        icon={<Building className="h-5 w-5 text-orange-500" />}
        title="참여 기업"
        value={metrics.participatingCompanies.current} // 숫자 그대로 유지
        change={metrics.participatingCompanies.growthRate} // 숫자 그대로 유지
        isPositive={metrics.participatingCompanies.growthRate >= 0}
      />
      <MetricCard
        icon={<Eye className="h-5 w-5 text-pink-500" />}
        title="조회수"
        value={metrics.totalViews.current} // 숫자 그대로 유지
        change={metrics.totalViews.growthRate} // 숫자 그대로 유지
        isPositive={metrics.totalViews.growthRate >= 0}
      />
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: number; // 숫자 타입으로 수정
  change: number; // 숫자 타입으로 수정
  isPositive: boolean;
}

function MetricCard({
  icon,
  title,
  value,
  change,
  isPositive,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 relative">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mb-4">
        {icon}
      </div>
      <div className="text-2xl font-bold mb-1">{value.toLocaleString()}</div>{" "}
      <div className="text-sm text-gray-500 mb-2">{title}</div>
      <div
        className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"
          } flex items-center`}
      >
        <span className="mr-1">{isPositive ? "↑" : "↓"}</span>
        <span>{Math.abs(change).toFixed(1)}% 지난 달 대비</span>
      </div>
    </div>
  );
}
