"use client"

export function OffersTabs({ activeTab, onTabChange, counts }) {
  const tabs = [
    { id: "전체", label: "전체", count: counts["전체"] },
    { id: "검토중", label: "검토중", count: counts["검토중"] },
    { id: "수락함", label: "수락", count: counts["수락함"] },
    { id: "거절함", label: "거절", count: counts["거절함"] },
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
