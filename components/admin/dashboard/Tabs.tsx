"use client"

interface TabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        <button
          onClick={() => setActiveTab("user")}
          className={`mr-8 py-4 text-sm font-medium ${
            activeTab === "user"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          사용자
        </button>
        <button
          onClick={() => setActiveTab("jobPosting")}
          className={`mr-8 py-4 text-sm font-medium ${
            activeTab === "jobPosting"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          채용공고
        </button>
        <button
          onClick={() => setActiveTab("applicationStatus")}
          className={`py-4 text-sm font-medium ${
            activeTab === "applicationStatus"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          지원 현황
        </button>
      </nav>
    </div>
  )
}
