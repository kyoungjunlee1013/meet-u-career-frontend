"use client"

import { BusinessHeader } from "@/components/business/layout/BusinessHeader"
import { JobsHeader } from "@/components/business/jobs/JobsHeader"
import { JobsStatistics } from "@/components/business/jobs/JobsStatistics"
import { JobsSearch } from "@/components/business/jobs/JobsSearch"
import { JobsTable } from "@/components/business/jobs/JobsTable"
import { useEffect, useState } from "react"
import { apiClient } from "@/api/apiClient"

export const BusinessJobsManagement = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    setLoading(true);
    apiClient.get('/api/business/job/my-list')
      .then(res => {
        setJobs(res.data.data || []);
        setError(null);
      })
      .catch(err => setError("공고 목록을 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <main className="max-w-[1200px] mx-auto px-6 py-6">
        <JobsHeader />
        <JobsStatistics jobs={jobs} />
        <JobsSearch />
        <JobsTable jobs={jobs} loading={loading} error={error} />
      </main>
    </div>
  )
}
