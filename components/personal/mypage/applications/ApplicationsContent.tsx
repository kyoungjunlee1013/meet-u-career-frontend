import { useState } from "react";
import { ApplicationsHeader } from "./ApplicationsHeader";
import { ApplicationsStats } from "./ApplicationsStats";
import { ApplicationsTabs } from "./ApplicationsTabs";
import { ApplicationsSearch } from "./ApplicationsSearch";
import { ApplicationsFilter } from "./ApplicationsFilter";
import { ApplicationsTable } from "./ApplicationsTable";
import { ApplicationsPagination } from "./ApplicationsPagination";

const APPLICATIONS = [
  {
    id: 1,
    company: "(주)사람인HR",
    position: "웹 프론트엔드 개발자",
    appliedAt: "2023-05-15",
    deadline: "2023-05-30",
    status: "서류통과",
    resume: "웹 개발자 이력서",
  },
  {
    id: 2,
    company: "네트워크솔루션(주)",
    position: "Node.js 백엔드 개발자",
    appliedAt: "2023-04-10",
    deadline: "2023-04-25",
    status: "면접예정",
    resume: "백엔드 개발자 이력서",
  },
  {
    id: 3,
    company: "(주)잡플래닛",
    position: "React 프론트엔드 개발자",
    appliedAt: "2023-03-01",
    deadline: "2023-03-20",
    status: "최종합격",
    resume: "프론트엔드 이력서",
  },
  {
    id: 4,
    company: "(주)원티드랩",
    position: "Python 백엔드 개발자",
    appliedAt: "2023-02-10",
    deadline: "2023-02-28",
    status: "불합격",
    resume: "백엔드 이력서",
  },
  {
    id: 5,
    company: "(주)코드잇",
    position: "풀스택 개발자",
    appliedAt: "2023-01-15",
    deadline: "2023-01-31",
    status: "지원완료",
    resume: "풀스택 이력서",
  },
];

export const ApplicationsContent = () => {
  const [activeTab, setActiveTab] = useState("전체");
  // 탭에 따라 데이터 필터링
  const filtered = activeTab === "전체"
    ? APPLICATIONS
    : APPLICATIONS.filter(app => app.status === activeTab);

  return (
    <div className="space-y-6">
      <ApplicationsHeader />
      <ApplicationsStats />
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ApplicationsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <ApplicationsSearch />
            <ApplicationsFilter />
          </div>
          <ApplicationsTable data={filtered} />
          <ApplicationsPagination />
        </div>
      </div>
    </div>
  );
};