import { useState, useMemo } from "react";
import { OffersHeader } from "./OffersHeader";
import { OffersStats } from "./OffersStats";
import { OffersTabs } from "./OffersTabs";
import { OffersFilter } from "./OffersFilter";
import { OffersList } from "./OffersList";

const OFFERS = [
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
];

export function OffersContent() {
  const [activeTab, setActiveTab] = useState("전체");
  const counts = useMemo(() => ({
    "전체": OFFERS.length,
    "검토중": OFFERS.filter(o => o.status === "검토중").length,
    "수락함": OFFERS.filter(o => o.status === "수락함").length,
    "거절함": OFFERS.filter(o => o.status === "거절함").length,
  }), []);
  const filtered = activeTab === "전체" ? OFFERS : OFFERS.filter(o => o.status === activeTab);

  return (
    <div className="space-y-6">
      <OffersHeader />
      <OffersStats />
      <div className="bg-white rounded-lg shadow-sm p-6">
        <OffersTabs activeTab={activeTab} onTabChange={setActiveTab} counts={counts} />
        <div className="mt-4 flex justify-end">
          <OffersFilter />
        </div>
        <OffersList offers={filtered} />
      </div>
    </div>
  );
}
