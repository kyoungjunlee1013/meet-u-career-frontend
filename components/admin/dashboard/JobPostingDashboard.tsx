"use client";

import { MetricJobPostingCards } from "@/components/admin/dashboard/MetricJobPostingCards";
import { JobPostingGrowthChart } from "@/components/admin/dashboard/JobPostingGrowthChart";
import { JobPostingByRegionChart } from "@/components/admin/dashboard/JobPostingByRegionChart";
import { JobPostingStatus } from "@/components/admin/dashboard/JobPostingStatus";
import { TopCompanies } from "@/components/admin/dashboard/TopCompanies";
import { PopularKeywords } from "@/components/admin/dashboard/PopularKeywords";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { DashboardJobPostingMetrics } from "@/types/dashboard";

export default function JobPostingDashboard() {
  const [metrics, setMetrics] = useState<DashboardJobPostingMetrics>({
    totalJobPostings: {
      current: 0,
      previous: 0,
      growthRate: 0,
    },
    activeJobPostings: {
      current: 0,
      previous: 0,
      growthRate: 0,
    },
    participatingCompanies: {
      current: 0,
      previous: 0,
      growthRate: 0,
    },
    totalViews: {
      current: 0,
      previous: 0,
      growthRate: 0,
    },
    jobPostingGrowthChart: [],
    locationStatistics: [],
    jobPostingStatistics: {
      activeCount: 0,
      expiredCount: 0,
      draftCount: 0,
      averageViewCount: 0,
      averageApplyCount: 0,
      averagePostingDays: 0,
    },
    topCompanies: [],
    keywordStatistics: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/api/admin/dashboard/jobpostingstats`);
        const data = response.data?.data;
        setMetrics({
          totalJobPostings: {
            current: data?.totalJobPostings.current,
            previous: data?.totalJobPostings.previous,
            growthRate: data?.totalJobPostings.growthRate,
          },
          activeJobPostings: {
            current: data?.activeJobPostings.current,
            previous: data?.activeJobPostings.previous,
            growthRate: data?.activeJobPostings.growthRate,
          },
          participatingCompanies: {
            current: data?.participatingCompanies.current,
            previous: data?.participatingCompanies.previous,
            growthRate: data?.participatingCompanies.growthRate,
          },
          totalViews: {
            current: data?.totalViews.current,
            previous: data?.totalViews.previous,
            growthRate: data?.totalViews.growthRate,
          },
          jobPostingGrowthChart: data?.jobPostingGrowthChart || [],
          locationStatistics: data?.locationStatistics || [],
          jobPostingStatistics: data?.jobPostingStatistics || {
            activeCount: 0,
            expiredCount: 0,
            draftCount: 0,
            averageViewCount: 0,
            averageApplyCount: 0,
            averagePostingDays: 0,
          },
          topCompanies: data?.topCompanies || [],
          keywordStatistics: data?.keywordStatistics || [],
        });
      } catch (error) {
        console.error("채용 공고 통계 API 호출 실패:", error);
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

        <div className="h-64 bg-gray-200 rounded-lg" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded-lg" />
          <div className="h-64 bg-gray-200 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded-lg" />
          <div className="h-64 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6">
        <MetricJobPostingCards metrics={metrics} />
      </div>

      <div className="mt-6">
        <JobPostingGrowthChart data={metrics.jobPostingGrowthChart} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <JobPostingByRegionChart data={metrics.locationStatistics} />
        <JobPostingStatus data={metrics.jobPostingStatistics} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <TopCompanies data={metrics.topCompanies} />
        <PopularKeywords data={metrics.keywordStatistics} />
      </div>
    </>
  );
}
