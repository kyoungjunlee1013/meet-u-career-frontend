"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/api/apiClient";
import { Search } from "lucide-react";
import Image from "next/image";

interface RecommendedJob {
  id: number;
  title: string;
  industry: string;
  jobType: string;
  salaryRange: string;
}

export const SearchBar = () => {
  const [featuredJobs, setFeaturedJobs] = useState<RecommendedJob[]>([]);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const response = await apiClient.get("/api/personal/job/recommend");
        setFeaturedJobs(response.data.data);
      } catch (error) {
        console.error("추천 공고 조회 실패", error);
      }
    };

    fetchRecommendedJobs();
  }, []);

  return (
    <div className="bg-gray-50 p-6 rounded-lg mt-3 mb-12">
      <div className="flex items-center bg-[#15274a] rounded-2xl text-white px-[20px] py-[5px] w-fit mb-[10px]">
        <Search className="h-5 w-5 text-white mr-2" />
        <span className="text-sm font-medium">회원님을 위한 추천공고</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {featuredJobs.map((job) => (
          <Link href={`/personal/jobs/${job.id}`} key={job.id}>
            <div className="bg-white border border-gray-100 rounded-md p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-gray-100 mb-3">
                <Image
                  src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/thumbnail/generic-app-icon.png"
                  alt="로고"
                  width={120}
                  height={35}
                  priority
                />
              </div>
              <h3 className="text-sm font-medium mb-1 line-clamp-2 h-10">
                {job.title}
              </h3>
              <div className="text-xs text-gray-500 mb-1">{job.industry}</div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{job.salaryRange}</span>
                <button className="text-gray-300 hover:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
