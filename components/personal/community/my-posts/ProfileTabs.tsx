"use client"

interface ProfileTabsProps {
  activeTab: "posts" | "comments"
  onTabChange: (tab: "posts" | "comments") => void
}

export const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <div className="border-b">
      <div className="flex">
        <button
          className={`py-3 px-4 text-sm font-medium relative ${
            activeTab === "posts" ? "text-black" : "text-gray-400 hover:text-gray-600"
          }`}
          onClick={() => onTabChange("posts")}
        >
          프로필
          {activeTab === "posts" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
        </button>

        <button
          className={`py-3 px-4 text-sm font-medium relative ${
            activeTab === "comments" ? "text-black" : "text-gray-400 hover:text-gray-600"
          }`}
          onClick={() => onTabChange("comments")}
        >
          게시글
          {activeTab === "comments" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
        </button>
      </div>
    </div>
  )
}
