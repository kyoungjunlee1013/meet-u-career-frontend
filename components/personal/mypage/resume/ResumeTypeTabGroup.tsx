"use client"

interface ResumeTypeTabGroupProps {
  activeTab: number | null
  setActiveTab: (tab: number | null) => void
}

export const ResumeTypeTabGroup = ({ activeTab, setActiveTab }: ResumeTypeTabGroupProps) => {
  const tabs = [
    { id: null, label: "전체" },
    { id: 0, label: "MeetU 이력서" },
    { id: 1, label: "파일 이력서" },
    { id: 2, label: "링크 이력서" },
  ]

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex flex-wrap -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`inline-block py-4 px-4 text-sm font-medium border-b-2 ${
              activeTab === tab.id
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
