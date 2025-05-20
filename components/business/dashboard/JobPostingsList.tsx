// JobPostingsList.tsx
"use client";

import { BusinessDashboardData } from "@/lib/fetchBusinessDashboard"; // ✅ 수정됨

interface Props {
  data: BusinessDashboardData; // ✅ 수정됨: 전체 대시보드 데이터 받도록 수정
}

export const JobPostingsList = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">채용공고 목록</h2>
      <div className="space-y-4">
        {data.jobPostings.length === 0 ? ( // ✅ 수정됨: data → data.jobPostings
          <div className="text-gray-500 text-center py-8">등록된 채용공고가 없습니다.</div>
        ) : (
          data.jobPostings.map((job) => ( // ✅ 수정됨
            <div
              key={job.jobPostingId}
              className="border border-gray-200 rounded-md p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{job.title}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    {job.location} | {job.jobType} | {job.salaryRange}
                  </div>
                </div>
                <div className="flex space-x-4 items-center">
                  <div className="text-sm text-gray-500">조회 {job.viewCount}</div>
                  <div className="text-sm text-gray-500">지원 {job.applicationCount}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>  
    </div>
  );
};
