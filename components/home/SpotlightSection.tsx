import Link from "next/link"
import { Card } from "./Card"

export const SpotlightSection = () => {
  const spotlightItems = [
    {
      id: 1,
      title: "2023년 신입/경력 인턴 및 정규직 모집",
      category: "신입채용",
      viewCount: "295,080",
      href: "/spotlight/1",
    },
    {
      id: 2,
      title: "(주)삼성전자 채용과 채용 채용 (채용형 인턴)",
      category: "채용안내",
      viewCount: "253,189",
      href: "/spotlight/2",
    },
    {
      id: 3,
      title: "2023 상반기 공채자 공채채용 (서스틴테크코리아 모집)",
      category: "공채채용",
      viewCount: "215,118",
      href: "/spotlight/3",
    },
    {
      id: 4,
      title: "(주)현대자동차 인턴 채용자 채용(인턴)",
      category: "인턴 채용",
      viewCount: "0",
      href: "/spotlight/4",
    },
    {
      id: 5,
      title: "(주)하이테크 부산을 선도할 신입 채용",
      category: "신입채용",
      viewCount: "56,098",
      href: "/spotlight/5",
    },
    {
      id: 6,
      title: "LG전자(주) 2023년 상반기 인재채용",
      category: "인재 채용",
      viewCount: "56,098",
      href: "/spotlight/6",
    },
  ]

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">요즘 주목받는 공고 (스타트업)</h2>
        <Link href="/spotlight" className="text-xs text-gray-500 hover:underline">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {spotlightItems.map((item) => (
          <Card key={item.id} title={item.title} category={item.category} viewCount={item.viewCount} href={item.href} />
        ))}
      </div>
    </section>
  )
}
