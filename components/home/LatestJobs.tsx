import Link from "next/link"
import { TextJobCard } from "./TextJobCard"

export const LatestJobs = () => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium">최근 올라온 공고 (최신순)</h2>
        <Link href="/jobs/latest" className="text-xs text-gray-500 hover:underline">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6">
        {latestJobs.map((job, index) => (
          <TextJobCard key={index} title={job.title} company={job.company} viewCount={job.viewCount} small={true} />
        ))}
      </div>
    </section>
  )
}

const latestJobs = [
  {
    title: "[현대차] 신차개발/생산 담당자 모집",
    company: "신입채용",
    viewCount: "147,398명",
  },
  {
    title: "[기아/현대] 서스틴 공학/기계 담당 개발 채용",
    company: "채용안내",
    viewCount: "53,516명",
  },
  {
    title: "KT 클라우드 미디어개발 및 마케팅 채용",
    company: "공채채용",
    viewCount: "15,369명",
  },
  {
    title: "[현대] 물류/인사/QC 엔지니 채용",
    company: "인턴 채용",
    viewCount: "6,300명",
  },
  {
    title: "[기아/현대] 사업전략/개발 담당 채용",
    company: "신입채용",
    viewCount: "12,600명",
  },
  {
    title: "프로젝트매니저 경력자 공채채용",
    company: "인재 채용",
    viewCount: "11,236명",
  },
]
