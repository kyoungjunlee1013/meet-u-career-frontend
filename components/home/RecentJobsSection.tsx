import Link from "next/link"
import { ImageJobCard } from "./ImageJobCard"

export const RecentJobsSection = () => {
  const jobs = [
    {
      id: 1,
      title: "부동산 경매/투자/자산관리 채용",
      company: "부동산114",
      views: 147398,
      isBookmarked: false,
    },
    {
      id: 2,
      title: "인재채용(인사/재무/기획/법무)공고",
      company: "LG전자",
      views: 54749,
      isBookmarked: false,
    },
  ]

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">요즘 주목받는 공고</h2>
        <Link href="/personal/jobs" className="text-xs text-gray-500 hover:text-gray-700">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <ImageJobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}
