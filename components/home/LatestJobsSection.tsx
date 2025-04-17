import Link from "next/link"
import { TextJobCard } from "./TextJobCard"

export const LatestJobsSection = () => {
  const jobs = [
    {
      id: 1,
      title: "우아한 주식회사 신입/경력 상시 채용 안내",
      company: "우아한 주식회사",
      location: "서울특별시 강남구",
      views: 303689,
      isBookmarked: false,
    },
    {
      id: 2,
      title: "신한금융투자 주식회사 2023년 하반기 경력 채용 공고입니다",
      company: "신한금융투자",
      location: "서울특별시 중구",
      views: 0,
      isBookmarked: false,
    },
    {
      id: 3,
      title: "네이버웹툰(주)웹툰 PD(작가지원) 채용합니다",
      company: "네이버웹툰",
      location: "경기도 성남시",
      views: 0,
      isBookmarked: false,
    },
    {
      id: 4,
      title: "한국투자증권(주) 경력직 상시 채용 공고 안내",
      company: "한국투자증권",
      location: "서울특별시 영등포구",
      views: 63189,
      isBookmarked: false,
    },
    {
      id: 5,
      title: "SK하이닉스(반도체) 전문직/기술/사무 채용 공고",
      company: "SK하이닉스",
      location: "경기도 이천시",
      views: 54249,
      isBookmarked: false,
    },
    {
      id: 6,
      title: "2023년 신입/경력 채용 공고합니다",
      company: "카카오",
      location: "제주도 제주시",
      views: 29000,
      isBookmarked: false,
    },
  ]

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">최근 올라온 공고</h2>
        <Link href="/personal/jobs" className="text-xs text-gray-500 hover:text-gray-700">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        {jobs.map((job) => (
          <TextJobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}
