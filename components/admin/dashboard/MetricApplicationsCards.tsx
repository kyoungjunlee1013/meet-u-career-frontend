import { Users, Building2, Briefcase } from "lucide-react";
import { ApplicationMetricDTO } from "@/types/admin/dashboard";

interface MetricApplicationsCardsProps {
  totalApplications: ApplicationMetricDTO;
  acceptedApplications: ApplicationMetricDTO;
  rejectedApplications: ApplicationMetricDTO;
}

export function MetricApplicationsCards({
  totalApplications,
  acceptedApplications,
  rejectedApplications,
}: MetricApplicationsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        icon={<Users className="text-blue-500" />}
        value={totalApplications.current.toLocaleString()}
        label="총 지원 수"
        change={totalApplications.growthRate}
        positive={totalApplications.growthRate >= 0}
      />
      <MetricCard
        icon={<Building2 className="text-blue-400" />}
        value={acceptedApplications.current.toLocaleString()}
        label="서류합격 수"
        change={acceptedApplications.growthRate}
        positive={acceptedApplications.growthRate >= 0}
      />
      <MetricCard
        icon={<Briefcase className="text-red-400" />}
        value={rejectedApplications.current.toLocaleString()}
        label="서류불합격 수"
        change={rejectedApplications.growthRate}
        positive={rejectedApplications.growthRate >= 0}
      />
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  change: number;
  positive: boolean;
}

function MetricCard({ icon, value, label, change, positive }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 relative">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mb-4">
        {icon}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <div
        className={`text-xs ${
          positive ? "text-green-500" : "text-red-500"
        } flex items-center`}
      >
        <span className="mr-1">{positive ? "↑" : "↓"}</span>
        <span>{Math.abs(change).toFixed(1)}% 지난 달 대비</span>
      </div>
    </div>
  );
}
