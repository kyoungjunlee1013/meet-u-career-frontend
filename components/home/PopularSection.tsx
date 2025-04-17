import Link from "next/link"
import { ImageCard } from "./ImageCard"

export const PopularSection = () => {
  const popularItems = [
    {
      id: 1,
      title: "2023년 취업 전략과 채용",
      category: "취업전략",
      viewCount: "321,098",
      tag: "추천 TOP100",
      href: "/personal/jobs/popular/1",
    },
    {
      id: 2,
      title: "2023년 첫 취업을 꿈꾸는 채용",
      category: "신입채용",
      viewCount: "253,189",
      tag: "추천 TOP100",
      href: "/personal/jobs/popular/2",
    },
    {
      id: 3,
      title: "부산스타 취업 플랫폼서비스 (인기) 채용기회 안내",
      category: "지역채용",
      viewCount: "215,118",
      tag: "추천 TOP100",
      href: "/personal/jobs/popular/3",
    },
    {
      id: 4,
      title: "2023년 대학가 창업을 나선다! 채용",
      category: "창업채용",
      viewCount: "204,536",
      href: "/personal/jobs/popular/4",
    },
    {
      id: 5,
      title: "부산권 경력자/취업자 채용",
      category: "경력채용",
      viewCount: "147,765",
      href: "/personal/jobs/popular/5",
    },
    {
      id: 6,
      title: "인재채용(인재개발)프로젝트",
      category: "프로젝트",
      viewCount: "94,210",
      href: "/personal/jobs/popular/6",
    },
  ]

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">최신정보 자주 찾는 공고 (관심많기)</h2>
        <Link href="/personal/jobs/popular" className="text-xs text-gray-500 hover:underline">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {popularItems.slice(0, 4).map((item) => (
          <ImageCard
            key={item.id}
            title={item.title}
            category={item.category}
            viewCount={item.viewCount}
            tag={item.tag}
            href={item.href}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {popularItems.slice(4, 6).map((item) => (
          <ImageCard
            key={item.id}
            title={item.title}
            category={item.category}
            viewCount={item.viewCount}
            tag={item.tag}
            href={item.href}
          />
        ))}
      </div>
    </section>
  )
}
