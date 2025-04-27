"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import type { DashboardUserMetrics } from "@/types/dashboard";
import { MetricUserCards } from "@/components/admin/dashboard/MetricUserCards";
import { UserGrowthChart } from "@/components/admin/dashboard/UserGrowthChart";
import { UserDistributionChart } from "@/components/admin/dashboard/UserDistributionChart";

export default function UserDashboard() {
  const [metrics, setMetrics] = useState<DashboardUserMetrics>({
    userCount: null,
    companyCount: null,
    jobPostingCount: null,
    communityPostCount: null,
    userGrowthChart: [],
    userTypeChart: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/api/admin/dashboard/userstats`);
        const data = response.data?.data;
        setMetrics({
          userCount: data.userCount,
          companyCount: data.companyCount,
          jobPostingCount: data.jobPostingCount,
          communityPostCount: data.communityPostCount,
          userGrowthChart: data.userGrowthChart,
          userTypeChart: data.userTypeChart,
        });
      } catch (error) {
        console.error("사용자 통계 API 호출 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-24 bg-gray-200 rounded-lg" />
          <div className="h-24 bg-gray-200 rounded-lg" />
          <div className="h-24 bg-gray-200 rounded-lg" />
          <div className="h-24 bg-gray-200 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="h-64 bg-gray-200 rounded-lg" />
          <div className="h-64 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6">
        {metrics.userCount &&
          metrics.companyCount &&
          metrics.jobPostingCount &&
          metrics.communityPostCount && (
            <MetricUserCards
              userCount={metrics.userCount}
              companyCount={metrics.companyCount}
              jobPostingCount={metrics.jobPostingCount}
              communityPostCount={metrics.communityPostCount}
            />
          )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <UserGrowthChart data={metrics.userGrowthChart} />
        <UserDistributionChart data={metrics.userTypeChart} />
      </div>
    </>
  );
}
