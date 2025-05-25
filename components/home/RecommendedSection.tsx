"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/api/apiClient";
import { Search, ChevronLeft, ChevronRight, LucideSparkles } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { calculateDday } from "@/common/dateUtils";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 rounded-md p-4 animate-pulse h-full">
    <div className="h-4 w-24 bg-gray-300 rounded mb-3" />
    <div className="w-12 h-12 bg-gray-300 rounded mb-3" />
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
    <div className="h-3 bg-gray-300 rounded w-1/2 mb-1" />
    <div className="h-3 bg-gray-300 rounded w-3/4" />
  </div>
);

interface RecommendedJob {
  jobPostingId: number;
  title: string;
  description: string | null;
  score: number;
  industry: string;
  salaryRange: string;
  expirationDate: Date;
  company: {
    id: number;
    name: string;
    address: string;
  };
}

export const RecommendedSection = () => {
  const [featuredJobs, setFeaturedJobs] = useState<RecommendedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuthStore();
  const { userInfo } = useUserStore();

  if (!accessToken || !userInfo || userInfo.role !== "PERSONAL") {
    return null;
  }

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const response = await apiClient.get<{
          count: number;
          msg: string;
          data: {
            total: number;
            recommendations: RecommendedJob[];
          };
        }>("/api/personal/job/recommend");

        setFeaturedJobs(response.data.data.recommendations);
      } catch (error) {
        console.error("추천 공고 조회 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedJobs();
  }, []);

  const topScore = Math.max(...featuredJobs.map(job => job.score), 0);

  const renderJobCard = (job: RecommendedJob) => {
    const diffMs = new Date(job.expirationDate).getTime() - Date.now();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const isExpired = daysLeft < 0;

    return (
      <Link href={`/personal/jobs/${job.jobPostingId}`} key={job.jobPostingId}>
        <div className="relative bg-white border border-gray-100 rounded-md p-4 hover:shadow-md transition-shadow cursor-pointer h-full">
          <div className="absolute top-2 right-2 z-10">
            <div className="relative bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
              {job.score === topScore && (
                <LucideSparkles
                  className="w-4 h-4 text-yellow-500 absolute -top-2 -right-2"
                  strokeWidth={2}
                />
              )}
              매칭 점수: <strong>{job.score}</strong>점
            </div>
          </div>

          <div className="w-12 h-12 bg-gray-100 mb-3">
            <Image
              src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/thumbnail/generic-app-icon.png"
              alt="로고"
              width={120}
              height={35}
              priority
            />
          </div>

          <h3 className="text-sm mb-1 line-clamp-2 h-10 font-semibold">{job.title}</h3>
          <div className="text-sm text-gray-500 mb-1 font-semibold">{job.company.name}</div>
          <div className="text-xs text-gray-400 mb-1">{job.salaryRange}</div>
          <div className="text-xs text-gray-400 truncate pr-12">{job.company.address}</div>

          <div className="absolute bottom-2 right-2 text-[11px] px-2 py-1 text-red-700 font-semibold">
            {calculateDday(job.expirationDate.toString())}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg mt-3 mb-12">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center bg-[#15274a] rounded-2xl text-white px-[20px] py-[5px] w-fit">
          <Search className="h-5 w-5 text-white mr-2" />
          <span className="text-sm font-medium">회원님을 위한 추천공고</span>
        </div>
        <span className="text-xs text-gray-500">(매칭 점수 = 스킬 + 직무 + 연봉 + 지역)</span>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : featuredJobs.length >= 6 ? (
        <div className="relative">
          <div className="absolute top-1/2 left-0 z-10 -translate-y-1/2">
            <div className="swiper-button-prev-custom p-2 bg-white border rounded-full shadow cursor-pointer hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          <div className="absolute top-1/2 right-0 z-10 -translate-y-1/2">
            <div className="swiper-button-next-custom p-2 bg-white border rounded-full shadow cursor-pointer hover:bg-gray-100">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          <Swiper
            modules={[Autoplay, Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.2 },
              1280: { slidesPerView: 5.2 },
            }}
          >
            {featuredJobs.map((job) => (
              <SwiperSlide key={job.jobPostingId}>
                {renderJobCard(job)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : featuredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {featuredJobs.map((job) => renderJobCard(job))}
        </div>
      ) : (
        <div className="text-center text-sm text-gray-500 py-10">
          현재 추천할 공고가 없습니다.
        </div>
      )}
    </div>
  );
};
