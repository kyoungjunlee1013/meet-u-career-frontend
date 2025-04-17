import Link from "next/link"
import { ImageJobCard } from "./ImageJobCard"

export const PopularJobsSection = () => {
  const jobs = [
    {
      id: 1,
      title: "2023년 하반기 전문직 채용",
      company: "현대자동차",
      views: 301008,
      isTop: true,
      isBookmarked: false,
    },
    {
      id: 2,
      title: "2023년 하반기 공채 채용",
      company: "삼성전자",
      views: 253189,
      isTop: true,
      isBookmarked: false,
    },
    {
      id: 3,
      title: "우아한형제들(배달의민족) 신입 개발자 채용",
      company: "우아한형제들",
      views: 253189,
      isTop: true,
      isBookmarked: false,
    },
    {
      id: 4,
      title: "2023년 하반기 상품기획 신입사원 채용",
      company: "네이버",
      views: 204536,
      isTop: true,
      isBookmarked: false,
    },
  ]

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">최근에 인기 공고</h2>
        <Link href="/personal/jobs" className="text-xs text-gray-500 hover:text-gray-700">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <ImageJobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}
