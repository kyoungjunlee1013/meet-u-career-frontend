"use client";

interface CoverLetterTypeTabGroupProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const CoverLetterTypeTabGroup = ({ activeTab, setActiveTab }: CoverLetterTypeTabGroupProps) => {
  const tabs = [
    { id: "all", label: "전체" },
    { id: "analyzed", label: "분석 완료" },
    { id: "unanalyzed", label: "미분석" },
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex flex-wrap -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`inline-block py-4 px-4 text-sm font-medium border-b-2 ${
              activeTab === tab.id
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
