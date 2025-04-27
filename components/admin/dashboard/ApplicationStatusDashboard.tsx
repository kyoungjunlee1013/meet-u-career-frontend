"use client";

import { useEffect, useState } from "react";
import { MetricApplicationsCards } from "./MetricApplicationsCards";
import { ApplicationTrendChart } from "./ApplicationTrendChart";
import { ApplicationByJobTypeChart } from "./ApplicationByJobTypeChart";
import { ApplicationByAgeChart } from "./ApplicationByAgeChart";
import { TopApplicationCompanies } from "./TopApplicationCompanies";
import { ApplicationTimeAnalysis } from "./ApplicationTimeAnalysis";
import { apiClient } from "@/api/apiClient";
import { DashboardApplicationMetrics } from "@/types/admin/dashboard";

export default function ApplicationStatusDashboard() {
  const [metrics, setMetrics] = useState<DashboardApplicationMetrics>({
    totalApplications: {
      current: 0,
      previous: 0,
      growthRate: 0,
    },
    acceptedApplications: {
      current: 0,
      previous: 0,
      growthRate: 0,
    },
    rejectedApplications: {
      current: 0,
      previous: 0,
      growthRate: 0,
    },
    applicationTrends: [],
    conversionRates: [],
    applicantAgeGroupChart: [],
    top5Companies: [],
    applicationTimeStats: [],
    jobCategoryPostings: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/api/admin/dashboard/applicationstats`);
        const data = response.data?.data;

        setMetrics({
          totalApplications: data?.totalApplications,
          acceptedApplications: data?.acceptedApplications,
          rejectedApplications: data?.rejectedApplications,
          applicationTrends: data?.applicationTrends,
          conversionRates: data?.conversionRates,
          applicantAgeGroupChart: data?.applicantAgeGroupChart,
          top5Companies: data?.top5Companies,
          applicationTimeStats: data?.applicationTimeStats,
          jobCategoryPostings: data?.jobCategoryPostings,
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
        <MetricApplicationsCards
          totalApplications={metrics.totalApplications}
          acceptedApplications={metrics.acceptedApplications}
          rejectedApplications={metrics.rejectedApplications}
        />
      </div>

      <div className="mt-6">
        <ApplicationTrendChart data={metrics.applicationTrends} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ApplicationByAgeChart data={metrics.applicantAgeGroupChart} />
        <ApplicationByJobTypeChart data={metrics.jobCategoryPostings} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <TopApplicationCompanies data={metrics.top5Companies} />
        <ApplicationTimeAnalysis data={metrics.applicationTimeStats} />
      </div>
    </>
  );
}
