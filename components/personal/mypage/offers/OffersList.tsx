import { OfferCard } from "./OfferCard"

export function OffersList() {
  const offers = [
    {
      id: 1,
      company: "(주)서울인HR",
      position: "프론트엔드 개발자",
      location: "서울 강남구",
      deadline: "2023-03-20",
      description: "React, TypeScript 경험이 있는 프론트엔드 개발자를 찾고 있습니다. 3년 이상의 경력자 우대합니다.",
      status: "검토중",
    },
    {
      id: 2,
      company: "테크스타트(주)",
      position: "백엔드 개발자",
      location: "서울 서초구",
      deadline: "2023-03-18",
      description:
        "Node.js, Express, MongoDB 경험이 있는 백엔드 개발자를 찾고 있습니다. 클라우드 서비스 경험자 우대합니다.",
      status: "수락함",
    },
    {
      id: 3,
      company: "글로벌소프트(주)",
      position: "풀스택 개발자",
      location: "서울 영등포구",
      deadline: "2023-03-15",
      description: "React와 Node.js를 활용한 풀스택 개발 경험이 있는 개발자를 찾고 있습니다. AWS 경험자 우대합니다.",
      status: "거절함",
    },
  ]

  return (
    <div className="mt-6 space-y-4">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  )
}
