import Link from "next/link"
import { JobCard } from "./JobCard"

export const PopularJobs = () => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium">부동산 경매/투자/자산관리 채용</h2>
        <Link href="/jobs/trending" className="text-xs text-gray-500 hover:underline">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trendingJobs.map((job, index) => (
          <JobCard key={index} title={job.title} company={job.company} viewCount={job.viewCount} hasImage={true} />
        ))}
      </div>
    </section>
  )
}

const trendingJobs = [
  {
    title: "부동산 경매/투자/자산관리 채용",
    company: "",
    viewCount: "147,398명",
  },
  {
    title: "인재채용(인사/재무/기획/법무)공고",
    company: "",
    viewCount: "54,749명",
  },
]
