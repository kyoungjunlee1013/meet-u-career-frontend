'use client';
import { useEffect, useState } from "react";
import { NotificationBox } from "./NotificationBox";
import { CoachingSectionEditor, CoachingSection } from "./CoachingSectionEditor";
import { apiClient } from "@/api/apiClient";
import { useAuthStore } from "@/store/useAuthStore";

const initialSections: CoachingSection[] = [
  { sectionKey: "growth", sectionTitle: "성장 과정", content: "" },
  { sectionKey: "strengths", sectionTitle: "성격의 장단점 및 보완 노력", content: "" },
  { sectionKey: "motivation", sectionTitle: "지원 동기", content: "" },
  { sectionKey: "future", sectionTitle: "입사 후 포부", content: "" },
];

export const CoachingContent = () => {
  const [sections, setSections] = useState<CoachingSection[]>(initialSections);
  const { accessToken, isHydrated, restoreTokens } = useAuthStore();

  useEffect(() => {
    restoreTokens(); // 토큰 복구
  }, []);

  const isLoggedIn = isHydrated && !!accessToken;

  if (!isHydrated) return null;

  const requestAIFeedback = async (index: number) => {
    setSections((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, isLoading: true, error: undefined } : s
      )
    );
    try {
      const res = await apiClient.post("/api/personal/coverletter/coaching", {
        contentId: null,
        sectionTitle: sections[index].sectionTitle,
        content: sections[index].content,
      });
      const data = res.data?.data;
      setSections((prev) =>
        prev.map((s, i) =>
          i === index
            ? {
                ...s,
                feedback: data?.feedback || '',
                revisedContent: data?.revisedContent || '',
                isLoading: false,
                error: undefined,
              }
            : s
        )
      );
    } catch (e: any) {
      setSections((prev) =>
        prev.map((s, i) =>
          i === index
            ? { ...s, isLoading: false, error: e?.message || "오류 발생" }
            : s
        )
      );
    }
  };

  const handleContentChange = (index: number, value: string) => {
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, content: value } : s))
    );
  };

  const [activeTab, setActiveTab] = useState<string>(sections[0].sectionKey);
  const tabList = [
    { key: "growth", label: "성장 과정" },
    { key: "strengths", label: "성격의 장단점 및 보완 노력" },
    { key: "motivation", label: "지원 동기" },
    { key: "future", label: "입사 후 포부" },
  ];
  const activeIdx = sections.findIndex(s => s.sectionKey === activeTab);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      {isHydrated && !isLoggedIn && <NotificationBox />}
      <div className="mb-6">
        <div className="flex gap-2 border-b">
          {tabList.map(tab => (
            <button
              key={tab.key}
              className={`px-6 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {activeIdx !== -1 && (
        <CoachingSectionEditor
          section={sections[activeIdx]}
          onContentChange={value => handleContentChange(activeIdx, value)}
          onAIFeedback={() => requestAIFeedback(activeIdx)}
        />
      )}
    </div>
  );
};
