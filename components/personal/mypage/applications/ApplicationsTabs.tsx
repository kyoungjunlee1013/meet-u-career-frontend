import { useState } from "react";

// props: total, applied, passed, rejected
export const ApplicationsTabs = ({ activeTab, onTabChange, total, applied, passed, rejected }) => {
  const TAB_LIST = [
    { key: null, label: <>전체 <span className="ml-1 text-blue-600">{total}</span></> },
    { key: 0, label: <>지원완료 <span className="ml-1 text-gray-500">{applied}</span></> },
    { key: 1, label: <>서류통과 <span className="ml-1 text-gray-500">{passed}</span></> },
    { key: 2, label: <>불합격 <span className="ml-1 text-gray-500">{rejected}</span></> },
  ];
  return (
    <div className="border-b border-gray-200">
      <nav className="flex">
        {TAB_LIST.map(tab => (
          <button
            key={tab.key === null ? "all" : tab.key}
            type="button"
            className={
              "inline-block py-4 px-4 text-sm font-medium border-b-2 " +
              (activeTab === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")
            }
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
