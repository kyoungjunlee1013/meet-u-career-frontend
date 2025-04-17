import { TextCard } from "./TextCard"

export const TopCards = () => {
  const topItems = [
    {
      id: 1,
      title: "[공채][2023년 3월 취업자 채용공고]",
      category: "공채정보",
      viewCount: "154,921",
      href: "/personal/jobs/1",
    },
    {
      id: 2,
      title: "[대학생인턴 & 신입공채정보] 취업 서류 준비부터 면접에 필요한 정보",
      category: "인턴/신입채용",
      viewCount: "12",
      href: "/personal/jobs/2",
    },
    {
      id: 3,
      title: "[취업] 기업연구 공유 게시 및 질문자 게시",
      category: "취업정보",
      viewCount: "69,352",
      href: "/personal/jobs/3",
    },
    {
      id: 4,
      title: "[메가스터디] 해외기업 진출 및 취업 전략",
      category: "해외취업스터디",
      viewCount: "34,578",
      href: "/personal/jobs/4",
    },
    {
      id: 5,
      title: "신규 서비스 베타테 기획자 채용",
      category: "채용정보",
      viewCount: "65,890",
      href: "/personal/jobs/5",
    },
  ]

  return (
    <section className="mb-10">
      <div className="grid grid-cols-5 gap-4">
        {topItems.map((item) => (
          <TextCard
            key={item.id}
            title={item.title}
            category={item.category}
            viewCount={item.viewCount}
            href={item.href}
            showImage={true}
            small={true}
          />
        ))}
      </div>
    </section>
  )
}
