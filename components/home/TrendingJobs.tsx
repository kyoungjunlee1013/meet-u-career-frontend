import Link from "next/link"
import { TextJobCard } from "./TextJobCard"

export const TrendingJobs = () => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium">최근에 인기 공고 (관심반기)</h2>
        <Link href="/jobs/recent" className="text-xs text-gray-500 hover:underline">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-6">
        {recentJobs.map((job, index) => (
          <TextJobCard key={index} title={job.title} company={job.company} viewCount={job.viewCount} />
        ))}
      </div>
    </section>
  )
}

const recentJobs = [
  {
    title: "우량 주식회사 브랜즈를 깊이 공부 원하일 창구",
    company: "채용정보 TOP100",
    viewCount: "303,689명",
  },
  {
    title: "인하테크놀로지스(주) 2023년 채용직후 직원 내 수시채용",
    company: "기업 채용의 숨은 정보",
    viewCount: "0-5",
  },
  {
    title: "(시)한국해양물류(주)협회 (초기취업자) 꿀 직무(취업)별 정보",
    company: "취업/경력자 채용",
    viewCount: "0-7",
  },
  {
    title: "(주)한솔패키징 동반성장 위한 구인 정보 웹 인턴공정",
    company: "기술 채용의 (인턴형태)",
    viewCount: "53,118명",
  },
  {
    title: "(전)하이닉스반도체 신 취업할 신입 체험 채용",
    company: "취업자 체험 지원",
    viewCount: "0-5",
  },
  {
    title: "(주)메이크리에티브 컨텍티커/케어기사 채집자 수시채용",
    company: "일평균 업로드 10%",
    viewCount: "54,940명",
  },
]
