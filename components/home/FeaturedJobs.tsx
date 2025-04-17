import Link from "next/link"
import { JobCard } from "./JobCard"

export const FeaturedJobs = () => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium">최근에 인기 있는 공고 (관심많기)</h2>
        <Link href="/jobs/popular" className="text-xs text-gray-500 hover:underline">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {popularJobs.map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            company={job.company}
            viewCount={job.viewCount}
            hasImage={true}
            hasTag={job.hasTag}
          />
        ))}
      </div>
    </section>
  )
}

const popularJobs = [
  {
    title: "2023년 하반기 전문직 채용",
    company: "",
    viewCount: "303,508명",
    hasTag: true,
  },
  {
    title: "2023년 하반기 공채 공채 채용",
    company: "",
    viewCount: "253,189명",
    hasTag: true,
  },
  {
    title: "우아한형제들(배달의민족) 신입 개발자 채용 기회",
    company: "",
    viewCount: "253,118명",
    hasTag: true,
  },
  {
    title: "2023년 하반기 상품기획 신입사원 채용",
    company: "",
    viewCount: "204,536명",
    hasTag: true,
  },
]
