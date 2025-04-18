import { useState } from "react";

const TAB_LIST = [
  { key: "전체", label: <>전체 <span className="ml-1 text-blue-600">5</span></> },
  { key: "지원완료", label: <>지원완료 <span className="ml-1 text-gray-500">1</span></> },
  { key: "서류통과", label: <>서류통과 <span className="ml-1 text-gray-500">1</span></> },
  { key: "최종합격", label: <>최종합격 <span className="ml-1 text-gray-500">1</span></> },
  { key: "불합격", label: <>불합격 <span className="ml-1 text-gray-500">1</span></> },
];

export const ApplicationsTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex">
        {TAB_LIST.map(tab => (
          <button
            key={tab.key}
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
