import Link from "next/link"
import { TextCard } from "./TextCard"

export const LatestSection = () => {
  const latestItems = [
    {
      id: 1,
      title: "[채용][다차현] 중심축/채용 당점지 증대",
      category: "증대지원",
      viewCount: "147,760명",
      href: "/personal/jobs/latest/1",
    },
    {
      id: 2,
      title: "[진한재택] 시스템 운영/개발 담당자 채용",
      category: "시스템 채용",
      viewCount: "53,518명",
      href: "/personal/jobs/latest/2",
    },
    {
      id: 3,
      title: "KT 플랫폼/앱 미래지향 승 미래작 채용",
      category: "15,300명",
      viewCount: "15,300명",
      href: "/personal/jobs/latest/3",
    },
    {
      id: 4,
      title: "[채택] 중심향/앞근 엔지닉 채용",
      category: "6,300명",
      viewCount: "6,300명",
      href: "/personal/jobs/latest/4",
    },
    {
      id: 5,
      title: "[진한채택] 사업화니/플랫 담당 채용",
      category: "시스위럇",
      viewCount: "12,600명",
      href: "/personal/jobs/latest/5",
    },
    {
      id: 6,
      title: "프로젝트벌 작업퇴 신경뇌 운영담당",
      category: "11,240명",
      viewCount: "11,240명",
      href: "/personal/jobs/latest/6",
    },
  ]

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">최근 올라온 공고 (최신순)</h2>
        <Link href="/personal/jobs/latest" className="text-xs text-gray-500 hover:underline">
          더보기 &gt;
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-4 mb-4">
        {latestItems.slice(0, 5).map((item) => (
          <TextCard
            key={item.id}
            title={item.title}
            category={item.category}
            viewCount={item.viewCount}
            href={item.href}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {latestItems.slice(5, 6).map((item) => (
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
