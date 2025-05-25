"use client";

import { RefObject, useEffect, useState } from "react";
import Link from "next/link";
import { Star, Share2, Heart } from "lucide-react";
import { ApplicantStats } from "./ApplicantStats";
import { WorkLocation } from "./WorkLocation";
import { CompanyInfo } from "./CompanyInfo";
import { ApplicationModal } from "./ApplicationModal";
import { apiClient } from "@/api/apiClient";
import { JobPostingType } from "@/types/job";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";

interface JobDetailContentProps {
  jobId: string;
  sectionRefs: {
    postRef: RefObject<HTMLDivElement | null>;
    applyRef: RefObject<HTMLDivElement | null>;
    companyRef: RefObject<HTMLDivElement | null>;
  };
}

export const JobDetailContent = ({
  jobId,
  sectionRefs,
}: JobDetailContentProps) => {
  const [jobPosting, setJobPosting] = useState<JobPostingType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isApplicationModalOpen, setIsApplicationModalOpen] =
    useState<boolean>(false);

  // 로그인 사용자 정보
  const { userInfo } = useUserStore();

  useEffect(() => {
    const fetchJobPosting = async () => {
      try {
        const response = await apiClient.get(`/api/personal/job/${jobId}`);
        const data: JobPostingType = response.data.data;
        setJobPosting(data);

        const expiration = new Date(data.jobPosting.expirationDate).getTime();
        setTimeLeft(Math.floor((expiration - Date.now()) / 1000));
      } catch (err) {
        console.error(err);
        setError("채용 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobPosting();
  }, [jobId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 마감일
  const formatTime = (seconds: number): string => {
  const maxSeconds = 365 * 24 * 60 * 60; // 1년 = 31,536,000초

  if (seconds > maxSeconds) {
    return "상시 채용";
  }

  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${days}일 ${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

  // 디데이
  const calculateDday = (expirationDate: string) => {
    const today = new Date();
    const deadline = new Date(expirationDate);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 💡 일정 기간 이상인 경우 "상시채용"으로 대체
    if (diffDays > 365) return "상시 채용";

    return diffDays > 0 ? `D-${diffDays}` : "마감";
  };

  // 관심기업
  const handleFollow = async () => {
    if (!userInfo) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const endpoint = jobPosting?.companyFollowed
      ? "/api/personal/company/unfollow"
      : "/api/personal/company/follow";

    try {
      await apiClient.post(endpoint, {
        companyId: jobPosting?.company.companyId,
      });

      alert(
        jobPosting?.companyFollowed
          ? "관심기업 설정이 취소되었습니다."
          : "관심기업으로 설정되었습니다!"
      );

      // 상태 갱신
      if (jobPosting) {
        setJobPosting({
          ...jobPosting,
          companyFollowed: !jobPosting.companyFollowed,
        });
      }
    } catch (error) {
      console.error("관심기업 설정 실패:", error);
      alert("관심기업 설정에 실패했습니다.");
    }
  };

  // 스크랩
  const handleBookmark = async () => {
    if (!userInfo) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const endpoint = jobPosting?.bookmarked
      ? "/api/personal/bookmark/remove"
      : "/api/personal/bookmark/add";

    try {
      await apiClient.post(endpoint, {
        jobPostingId: jobPosting?.id,
      });

      alert(
        jobPosting?.bookmarked
          ? "스크랩이 취소되었습니다."
          : "스크랩이 완료되었습니다!"
      );

      // 상태 갱신
      if (jobPosting) {
        setJobPosting({
          ...jobPosting,
          bookmarked: !jobPosting.bookmarked,
          bookmarkCount: jobPosting.bookmarked
            ? jobPosting.bookmarkCount - 1
            : jobPosting.bookmarkCount + 1,
        });
      }
    } catch (error) {
      console.error("스크랩 실패:", error);
      alert("스크랩에 실패했습니다.");
    }
  };

  const openApplicationModal = () => {
    if (!userInfo) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    setIsApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
  };

  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!jobPosting) return null;

  return (
    <div className="bg-white border rounded-md overflow-hidden">
      <div className="p-6">
        <div ref={sectionRefs.postRef} className="flex items-center mb-3 gap-4">
          <Link
            href={`/personal/company/${jobPosting.company.companyId}/intro`}
            className="text-md font-semibold"
          >
            {jobPosting.company.companyName}
          </Link>

          <div className="flex items-center gap-2">
            {/* 관심기업 버튼 */}
            <button
              className="flex items-center border border-gray-300 px-3 py-1 rounded-md text-sm text-gray-600 hover:text-gray-800"
              onClick={handleFollow}
            >
              <span className="mr-1">
                {jobPosting.companyFollowed ? (
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                ) : (
                  <Heart className="w-4 h-4 text-gray-600" />
                )}
              </span>
              관심기업
            </button>

            {/* 채용중 */}
            <button className="flex items-center border border-gray-300 px-3 py-1 rounded-md text-sm text-gray-600 cursor-default hover:text-gray-800">
              채용중{" "}
              <strong className="ml-1">{jobPosting.openJobPostingCount}</strong>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          {/* 공고명 */}
          <h1 className="text-xl font-bold">{jobPosting.jobPosting.title}</h1>

          <div className="flex items-center gap-2">
            {/* 스크랩 버튼 */}
            <button
              onClick={handleBookmark}
              className="flex flex-col justify-center items-center w-14 h-12 border border-gray-300 rounded-md text-sm text-gray-600 hover:text-gray-800"
            >
              <Star
                className={`h-4 w-4 mb-0.5 ${jobPosting.bookmarked
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-600"
                  }`}
              />
              <span className="text-xs">{jobPosting.bookmarkCount}</span>
            </button>

            {/* 지원하기 */}
            <div className="relative w-fit">
              <button
                className="w-28 h-10 bg-red-500 text-white font-bold rounded-md flex items-center justify-center text-sm"
                onClick={openApplicationModal}
              >
                입사지원
              </button>

              {/* D-day 뱃지 */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white border border-red-500 text-red-500 text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
                {calculateDday(jobPosting.jobPosting.expirationDate)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <h3 className="text-xs text-gray-500 mb-1">경력</h3>
            <p className="text-sm">{jobPosting.jobPosting.experienceLevelName}</p>
          </div>
          <div>
            <h3 className="text-xs text-gray-500 mb-1">급여</h3>
            <p className="text-sm">{jobPosting.jobPosting.salaryRange}</p>
          </div>
          <div>
            <h3 className="text-xs text-gray-500 mb-1">학력</h3>
            <p className="text-sm">{jobPosting.jobPosting.educationLevelName}</p>
          </div>
          <div>
            <h3 className="text-xs text-gray-500 mb-1">직무</h3>
            <p className="text-sm">{jobPosting.jobPosting.industry}</p>
          </div>
          <div>
            <h3 className="text-xs text-gray-500 mb-1">근무형태</h3>
            <p className="text-sm">{jobPosting.jobPosting.jobType}</p>
          </div>
          <div>
            <h3 className="text-xs text-gray-500 mb-1">근무지역</h3>
            <p className="text-sm">{jobPosting.jobPosting.locationCode}</p>
          </div>
        </div>

        <div className="border-t py-4 mb-8 text-gray-500 text-sm">
          <div className="mb-2 text-right text-xs">
            <span className="text-[#1842a3] font-semibold">
              최저임금계산에 대한 알림
            </span>
            하단에 명시된 급여, 근무 내용 등이 최저임금에 미달하는 경우 위
            내용이 우선합니다.
          </div>
          <div className="flex justify-end items-center gap-2 text-xs">
            <span>
              조회수{" "}
              <strong className="text-black">
                {jobPosting.jobPosting.viewCount.toLocaleString()}
              </strong>
            </span>
            <span>·</span>
            <button
              onClick={() => {
                navigator.clipboard
                  .writeText(window.location.href)
                  .then(() => {
                    alert("링크가 복사되었습니다.");
                  })
                  .catch((err) => {
                    console.error("링크 복사 실패", err);
                  });
              }}
              className="flex items-center hover:text-gray-700"
            >
              <Share2 className="h-4 w-4 mr-1" />
              공유하기
            </button>
          </div>
        </div>

        <div className="mb-24">
          <div className="bg-gray-100 h-80 flex items-center justify-center rounded-md mb-8 overflow-hidden relative">
            <Image
              src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/diverse-team-meeting.png"
              alt="공고 이미지 또는 회사 이미지"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            {
              jobPosting.jobId ?
                <>
                  <section>
                    <h3 className="text-base font-bold text-blue-600 mb-3">
                      주요업무
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>- Python 기반 백엔드 서비스 개발 및 운영</li>
                      <li>- RESTful API 설계 및 구현</li>
                      <li>- 데이터베이스 설계 및 최적화</li>
                      <li>- AWS, GCP 등의 인프라 구축</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-base font-bold text-blue-600 mb-3">
                      자격요건
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>- Python 개발 경력 2년 이상</li>
                      <li>- Django, Flask 등 웹 프레임워크 사용 경험</li>
                      <li>- SQL, NoSQL 데이터베이스 경험</li>
                      <li>- Git 등 형상관리 도구 사용 경험</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-base font-bold text-blue-600 mb-3">
                      우대사항
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>- AWS, GCP 등 클라우드 환경 경험</li>
                      <li>- Docker, Kubernetes 등 컨테이너 기술 경험</li>
                      <li>- CI/CD 파이프라인 구축 경험</li>
                      <li>- 대용량 트래픽 처리 경험</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-base font-bold text-blue-600 mb-3">
                      복지혜택
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>- 유연근무제 운영</li>
                      <li>- 건강검진 지원</li>
                      <li>- 자기계발비 지원</li>
                      <li>- 경조사 지원</li>
                      <li>- 점심 식대비 지원</li>
                      <li>- 명절 선물 지급</li>
                    </ul>
                  </section>
                </>
                :
                <section>
                  {jobPosting.jobPosting.description}
                </section>
            }
          </div>
        </div>

        {/* 근무지위치 */}
        <WorkLocation
          sectionRef={sectionRefs.companyRef}
          address={jobPosting.company.address}
        />

        <div ref={sectionRefs.applyRef} className="pt-2 mb-12">
          <h3 className="text-lg font-bold mb-2 text-left">접수기간 및 방법</h3>

          {/* 카드 전체 */}
          <div className="flex border rounded-md overflow-hidden">
            {/* 왼쪽 - 남은 기간 */}
            <div className="flex-1 p-6 bg-white flex flex-col items-center justify-center text-center border-r">
              <p className="text-sm text-[#1842a3] mb-2">남은 기간</p>
              <p className="text-3xl font-bold text-[#1842a3] mb-6">
                {formatTime(timeLeft)}
              </p>

              {/* 시작일/마감일 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs text-gray-500 border border-gray-300 rounded-full">
                    시작일
                  </span>
                  <div className="px-3 py-1 text-sm text-gray-800">
                    {new Date(jobPosting.jobPosting.postingDate).toLocaleString(
                      "ko-KR",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs text-gray-500 border border-[#1842a3] text-[#1842a3] rounded-full">
                    마감일
                  </span>
                  <div className="px-3 py-1 text-sm text-[#1842a3] font-medium">
                    {new Date(
                      jobPosting.jobPosting.expirationDate
                    ).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 - 지원 방법 */}
            <div className="flex-1 p-6 bg-gray-50 flex flex-col justify-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 w-24">지원방법</span>
                  <span className="text-sm font-medium text-gray-800">
                    홈페이지 지원
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 w-24">접수양식</span>
                  <button className="text-sm text-blue-600 hover:underline">
                    제출서류 보기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 알림 문구 */}
          <p className="text-xs text-gray-500 mt-4 flex items-center">
            <span className="mr-1">ⓘ</span> 마감일은 기업의 사정, 조기마감
            등으로 변경될 수 있습니다.
          </p>
        </div>

        <ApplicantStats
          title={jobPosting.jobPosting.title}
          applicantStats={jobPosting.applicantStats}
        />

        <CompanyInfo
          company={jobPosting.company}
          openJobPostingCount={jobPosting.openJobPostingCount}
          interviewReviewCount={jobPosting.interviewReviewCount}
        />

        <div ref={sectionRefs.companyRef} className="mt-4 text-right">
          <Link
            href={`/personal/company/1/salary`}
            className="inline-flex items-center text-sm text-blue-500 hover:underline"
          />
        </div>
      </div>

      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={closeApplicationModal}
        jobId={jobId}
        jobTitle={jobPosting.jobPosting.title}
        companyName={jobPosting.company.companyName}
      />
    </div>
  );
};
