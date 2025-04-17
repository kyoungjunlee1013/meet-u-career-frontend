import Link from "next/link"
import { JobCard } from "./JobCard"

export const TopJobsSection = () => {
  const jobs = [
    {
      id: 1,
      title: "[현대자동차] 3분기 전략적 채용 공고입니다",
      company: "현대자동차",
      location: "서울 강남구",
      views: 123456,
      isBookmarked: false,
    },
    {
      id: 2,
      title: "[삼성전자 & 삼성그룹] 하반기 신입 공채합니다 (전국 채용)",
      company: "삼성전자",
      location: "경기도 수원시",
      views: 112,
      isBookmarked: false,
    },
    {
      id: 3,
      title: "[네이버] 기획자/구매 경력 채용 공고입니다",
      company: "네이버",
      location: "경기도 성남시",
      views: 98765,
      isBookmarked: false,
    },
    {
      id: 4,
      title: "[SK하이닉스] 메모리반도체 신입 채용 공고 안내",
      company: "SK하이닉스",
      location: "경기도 이천시",
      views: 54321,
      isBookmarked: false,
    },
    {
      id: 5,
      title: "신입 서비스 백엔드 개발자 채용합니다",
      company: "카카오",
      location: "제주도 제주시",
      views: 67890,
      isBookmarked: false,
    },
  ]

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">취업하기 가장 좋은 공고</h2>
        <Link href="/personal/jobs" className="text-xs text-gray-500 hover:text-gray-700">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}
