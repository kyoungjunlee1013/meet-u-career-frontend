import Link from "next/link"
import { TextJobCard } from "./TextJobCard"

export const RecentJobs = () => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium">요즘 주목받는 공고 (스타트업)</h2>
        <Link href="/jobs/startup" className="text-xs text-gray-500 hover:underline">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-6">
        {startupJobs.map((job, index) => (
          <TextJobCard key={index} title={job.title} company={job.company} viewCount={job.viewCount} />
        ))}
      </div>
    </section>
  )
}

const startupJobs = [
  {
    title: "2023년 신입/경력 인턴 및 정규직 모집",
    company: "신입채용",
    viewCount: "295,080명",
  },
  {
    title: "(주)삼성전자 채용과 채용 채용 (채용형 인턴)",
    company: "채용안내",
    viewCount: "253,189명",
  },
  {
    title: "2023 상반기 공채자 공채채용 (서스틴테크코리아 모집)",
    company: "공채채용",
    viewCount: "215,118명",
  },
  {
    title: "(주)현대자동차 인턴 채용자 채용(인턴)",
    company: "인턴 채용",
    viewCount: "0-0",
  },
  {
    title: "(주)하이테크 부산을 선도할 신입 채용",
    company: "신입채용",
    viewCount: "56,098명",
  },
  {
    title: "LG디스플레이 2023년 상반기 인재채용",
    company: "인재 채용",
    viewCount: "56,098명",
  },
]
