import type React from "react";
import {
  Users,
  Building2,
  Briefcase,
  MessageSquare,
  MoreVertical,
} from "lucide-react";
import type { MetricCardsProps } from "@/types/admin/dashboard";

export function MetricCards({
  userCount,
  companyCount,
  jobPostingCount,
  communityPostCount,
}: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        icon={<Users className="text-blue-500" />}
        value={userCount.current.toLocaleString()}
        label="사용자"
        change={userCount.growthRate}
        positive={userCount.growthRate >= 0}
      />
      <MetricCard
        icon={<Building2 className="text-blue-400" />}
        value={companyCount.current.toLocaleString()}
        label="기업"
        change={companyCount.growthRate}
        positive={companyCount.growthRate >= 0}
      />
      <MetricCard
        icon={<Briefcase className="text-orange-400" />}
        value={jobPostingCount.current.toLocaleString()}
        label="채용공고"
        change={jobPostingCount.growthRate}
        positive={jobPostingCount.growthRate >= 0}
      />
      <MetricCard
        icon={<MessageSquare className="text-pink-400" />}
        value={communityPostCount.current.toLocaleString()}
        label="커뮤니티 게시글"
        change={communityPostCount.growthRate}
        positive={communityPostCount.growthRate >= 0}
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
      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <MoreVertical size={18} />
      </button>
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
