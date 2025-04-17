import Link from "next/link"
import { TextCard } from "./TextCard"

export const RecommendedSection = () => {
  const recommendedItems = [
    {
      id: 1,
      title: "우량 주식회사 브랜즈를 깊이 공부 원하일 창구",
      category: "채용정보 TOP100",
      viewCount: "303,688",
      href: "/recommended/1",
    },
    {
      id: 2,
      title: "인하테크놀로지스(주) 2023년 채용직후 직원 내 수시채용",
      category: "기업 채용의 숨은 정보",
      viewCount: "9-5",
      href: "/recommended/2",
    },
    {
      id: 3,
      title: "(시)한국해양물류(주)협회 (초기취업자) 꿀 직무(취업)별 정보",
      category: "취업/경력자 채용",
      viewCount: "5-7",
      href: "/recommended/3",
    },
    {
      id: 4,
      title: "(주)한솔패키징 동반성장 위한 구인 정보 웹 인턴공정",
      category: "기술 채용의 (인턴형태)",
      viewCount: "53,118명",
      href: "/recommended/4",
    },
    {
      id: 5,
      title: "(전)하이닉스반도체 신 취업할 신입 체험 채용",
      category: "취업자 체험 지원",
      viewCount: "0-5",
      href: "/recommended/5",
    },
    {
      id: 6,
      title: "(주)메이크리에티브 컨텍티커/케어기사 채집자 수시채용",
      category: "일평균 업로드 10%",
      viewCount: "54,940명",
      href: "/recommended/6",
    },
  ]

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">최근에 인기 공고 (관심반기)</h2>
        <Link href="/recommended" className="text-xs text-gray-500 hover:underline">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {recommendedItems.map((item) => (
          <TextCard
            key={item.id}
            title={item.title}
            category={item.category}
            viewCount={item.viewCount}
            href={item.href}
          />
        ))}
      </div>
    </section>
  )
}
