"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Users, Clock, CheckCircle, XCircle, CircleDot } from "lucide-react";
import axios from "axios";
import type { ApplicantStatus } from "@/types/applicants";

type StatCardProps = {
  icon: React.ReactNode;
  count: number;
  label: string;
  color: string;
  status?: ApplicantStatus | "all";
  onStatusSelect?: (status: ApplicantStatus | null) => void;
  isSelected?: boolean;
};

const StatCard = ({
  icon,
  count,
  label,
  color,
  status,
  onStatusSelect,
  isSelected = false,
}: StatCardProps) => {
  const handleClick = () => {
    if (onStatusSelect) {
      if (status === "all") onStatusSelect(null);
      else if (status !== undefined) {
        onStatusSelect(isSelected ? null : status);
      }
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "ring-2 ring-blue-500 shadow-md" : ""
      }`}
      onClick={handleClick}
    >
      <div className={`mb-1 ${color}`}>{icon}</div>
      <div className="text-xl font-bold">{count}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
};

interface ApplicantsStatisticsProps {
  onStatusSelect?: (status: ApplicantStatus | null) => void;
  selectedStatus?: ApplicantStatus | null;
  jobPostingId?: number;
}

export const ApplicantsStatistics = ({
  onStatusSelect,
  selectedStatus,
  jobPostingId = 0,
}: ApplicantsStatisticsProps) => {
  const [stats, setStats] = useState<Record<string, number>>({
    total: 0,
    서류검토중: 0,
    서류합격: 0,
    서류불합격: 0,
    면접완료: 0,
  });

  useEffect(() => {
    if (!jobPostingId) return;

    const fetchStats = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          `/api/business/applicants/${jobPostingId}/stats`,
          {
            headers,
          }
        );
        setStats(response.data.data);
      } catch (error) {
        console.error("통계 정보 불러오기 실패:", error);
        // 실패 시 기본값 유지
        setStats({
          total: 0,
          서류검토중: 0,
          서류합격: 0,
          서류불합격: 0,
          면접완료: 0,
        });
      }
    };

    fetchStats();
  }, [jobPostingId]);

  return (
    <div className="mb-6 grid grid-cols-5 gap-4">
      <StatCard
        icon={<Users className="h-5 w-5" />}
        count={stats.total}
        label="총 지원자"
        color="text-gray-700"
        status="all"
        onStatusSelect={onStatusSelect}
        isSelected={selectedStatus === null}
      />
      <StatCard
        icon={<Clock className="h-5 w-5" />}
        count={stats["서류검토중"]}
        label="서류검토중"
        color="text-blue-500"
        status="서류검토중"
        onStatusSelect={onStatusSelect}
        isSelected={selectedStatus === "서류검토중"}
      />
      <StatCard
        icon={<CheckCircle className="h-5 w-5" />}
        count={stats["서류합격"]}
        label="서류합격"
        color="text-green-500"
        status="서류합격"
        onStatusSelect={onStatusSelect}
        isSelected={selectedStatus === "서류합격"}
      />
      <StatCard
        icon={<XCircle className="h-5 w-5" />}
        count={stats["서류불합격"]}
        label="서류불합격"
        color="text-red-500"
        status="서류불합격"
        onStatusSelect={onStatusSelect}
        isSelected={selectedStatus === "서류불합격"}
      />
      <StatCard
        icon={<CircleDot className="h-5 w-5" />}
        count={stats["면접완료"]}
        label="면접완료"
        color="text-amber-500"
        status="면접완료"
        onStatusSelect={onStatusSelect}
        isSelected={selectedStatus === "면접완료"}
      />
    </div>
  );
};
