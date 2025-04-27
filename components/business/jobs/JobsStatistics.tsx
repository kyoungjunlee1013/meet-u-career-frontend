"use client"

interface JobsStatisticsProps {
  jobs: any[];
}

export const JobsStatistics = ({ jobs = [] }: JobsStatisticsProps) => {
  const total = jobs.length;
  const pending = jobs.filter(job => job.status === 1).length;
  const active = jobs.filter(job => job.status === 2).length;
  const rejected = jobs.filter(job => job.status === 3).length;
  const totalViews = jobs.reduce((sum, job) => sum + (job.viewCount || 0), 0);

  const stats = [
    { label: "전체 공고", value: total, color: "text-blue-600" },
    { label: "승인 대기", value: pending, color: "text-amber-500" },
    { label: "게시 중", value: active, color: "text-green-500" },
    { label: "반려됨", value: rejected, color: "text-red-500" },
    { label: "총 열람 수", value: totalViews, color: "text-purple-500" },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-md p-4 shadow-sm border border-gray-100">
          <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};
