"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/api/apiClient";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
      }
    };

    fetchRecommendedJobs();
  }, []);

  const renderJobCard = (job: RecommendedJob) => {
    const diffMs = new Date(job.expirationDate).getTime() - Date.now();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24)); // 남은 일수 계산
    const isExpired = daysLeft < 0;

    return (
      <Link href={`/personal/jobs/${job.jobPostingId}`} key={job.jobPostingId}>
        <div className="relative bg-white border border-gray-100 rounded-md p-4 hover:shadow-md transition-shadow cursor-pointer h-full">

          {/* 매칭 점수 + 툴팁 (생략 안함) */}
          <div className="absolute top-2 right-2 group">
            <div className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
              매칭 점수: <strong>{job.score}</strong>점
            </div>
            <div className="absolute -top-10 right-0 z-10 hidden group-hover:block">
              <div
                className="relative text-white text-xs rounded-md px-3 py-2 shadow-md whitespace-nowrap"
                style={{ backgroundColor: "#1842a3" }}
              >
                매칭 점수 = 스킬 일치 수 + 직무 일치 + 연봉 조건 만족 여부에 따라 계산됩니다.
                <div
                  className="absolute -bottom-1 right-2 w-2 h-2 rotate-45"
                  style={{ backgroundColor: "#1842a3" }}
                ></div>
              </div>
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

          <h3 className="text-sm mb-1 line-clamp-2 h-10 font-semibold">
            {job.title}
          </h3>

          <div className="text-sm text-gray-500 mb-1 font-semibold">{job.company.name}</div>
          {/* <div className="text-xs text-gray-500 mb-1">{job.industry}</div> */}
          <div className="text-xs text-gray-400 mb-1">{job.salaryRange}</div>
          <div className="text-xs text-gray-400 truncate pr-12">{job.company.address}</div>

          {/* D-day 표시 */}
          <div className="absolute bottom-2 right-2 text-[11px] px-2 py-1 text-red-700 font-semibold">
            {isExpired ? "마감" : `D-${daysLeft}`}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg mt-3 mb-12">
      <div className="flex items-center bg-[#15274a] rounded-2xl text-white px-[20px] py-[5px] w-fit mb-[10px]">
        <Search className="h-5 w-5 text-white mr-2" />
        <span className="text-sm font-medium">회원님을 위한 추천공고</span>
      </div>

      {featuredJobs.length >= 6 ? (
        <div className="relative">
          {/* 왼쪽 버튼 */}
          <div className="absolute top-1/2 left-0 z-10 -translate-y-1/2">
            <div className="swiper-button-prev-custom p-2 bg-white border rounded-full shadow cursor-pointer hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          {/* 오른쪽 버튼 */}
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {featuredJobs.map((job) => renderJobCard(job))}
        </div>
      )}
    </div>
  );
};
