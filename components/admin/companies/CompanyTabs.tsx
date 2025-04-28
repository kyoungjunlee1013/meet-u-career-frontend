"use client";

type Tab = {
  id: "all" | "pending" | "approved"; // id 타입을 명확히 지정
  label: string;
};

const tabs: Tab[] = [
  { id: "all", label: "전체 기업" },
  { id: "pending", label: "검수 대기 기업" },
  { id: "approved", label: "검수 완료 기업" },
];

interface CompanyTabsProps {
  activeTab: "all" | "pending" | "approved"; // activeTab 타입을 명확히 지정
  onTabChange: (tabId: "all" | "pending" | "approved") => void; // onTabChange 타입을 명확히 지정
}

export default function CompanyTabs({
  activeTab,
  onTabChange,
}: CompanyTabsProps) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)} // tab.id의 타입은 "all" | "pending" | "approved"
            className={`py-2 px-1 -mb-px font-medium text-l ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
