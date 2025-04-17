import Link from "next/link"
import { TextCard } from "./TextCard"

export const TrendingSection = () => {
  const trendingItems = [
    {
      id: 1,
      title: "2023년 신입/경력 인턴 및 정규직 모집",
      category: "신입채용",
      viewCount: "295,080",
      href: "/personal/jobs/trending/1",
    },
    {
      id: 2,
      title: "(주)삼성전자 채용과 채용 채용 (채용형 인턴)",
      category: "채용안내 안내",
      viewCount: "253,189",
      href: "/personal/jobs/trending/2",
    },
    {
      id: 3,
      title: "2023 상반기 공채자 공채채용 (서스틴테크코리아 모집)",
      category: "공채채용 채용",
      viewCount: "33,518명",
      href: "/personal/jobs/trending/3",
    },
    {
      id: 4,
      title: "(주)현대자동차 인턴 채용자 채용(인턴)",
      category: "인턴 채용",
      viewCount: "0-0",
      href: "/personal/jobs/trending/4",
    },
    {
      id: 5,
      title: "(주)하이테크 부산을 선도할 신입 채용",
      category: "신입채용 채용",
      viewCount: "56,098",
      href: "/personal/jobs/trending/5",
    },
    {
      id: 6,
      title: "LG전자(주) 2023년 상반기 인재채용",
      category: "인재 채용",
      viewCount: "56,098",
      href: "/personal/jobs/trending/6",
    },
  ]

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">요즘 주목받는 공고 (스타트업)</h2>
        <Link href="/personal/jobs/trending" className="text-xs text-gray-500 hover:underline">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {trendingItems.slice(0, 3).map((item) => (
          <TextCard
            key={item.id}
            title={item.title}
            category={item.category}
            viewCount={item.viewCount}
            href={item.href}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {trendingItems.slice(3, 6).map((item) => (
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
