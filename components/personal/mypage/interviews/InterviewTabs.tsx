"use client"

export function InterviewTabs({ activeTab, onTabChange, counts }) {
  const tabs = [
    { id: "status", label: "면접 현황", count: counts["status"] },
    { id: "reviews", label: "면접 리뷰", count: counts["reviews"] },
  ];
  return (
    <div className="border-b border-gray-200">
      <nav className="flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={
              "py-4 px-4 text-sm font-medium border-b-2 whitespace-nowrap " +
              (activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")
            }
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label} <span className={activeTab === tab.id ? "text-blue-600 ml-1" : "text-gray-500 ml-1"}>{tab.count}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
