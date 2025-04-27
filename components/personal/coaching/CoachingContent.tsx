'use client';

import { ResumeHeader } from "./ResumeHeader";
import { ResumeSettings } from "./ResumeSettings";
import { NotificationBox } from "./NotificationBox";
import { CoachingSectionEditor, CoachingSection } from "./CoachingSectionEditor";
import { useState } from "react";


const initialSections: CoachingSection[] = [
  { sectionKey: "growth", sectionTitle: "성장 과정", content: "" },
  { sectionKey: "strengths", sectionTitle: "성격의 장단점 및 보완 노력", content: "" },
  { sectionKey: "motivation", sectionTitle: "지원 동기", content: "" },
  { sectionKey: "future", sectionTitle: "입사 후 포부", content: "" },
];

export const CoachingContent = () => {
  const [sections, setSections] = useState<CoachingSection[]>(initialSections);

  // AI 피드백 요청 함수 (Spring Boot API 연동)
  const requestAIFeedback = async (index: number) => {
    setSections((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, isLoading: true, error: undefined } : s
      )
    );
    try {
      const res = await fetch("/api/personal/coverletter/coaching", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: null, // 비회원 연습이므로 null
          sectionTitle: sections[index].sectionTitle,
          content: sections[index].content,
        }),
      });
      if (!res.ok) throw new Error("AI 피드백 요청 실패");
      const result = await res.json();
      // Spring Boot ResultData<CoachingResponseDTO> 구조: { success, count, data }
      const data = result?.data;
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

  // TODO: 실제 로그인 연동 시 isLoggedIn 값을 교체하세요.
  const isLoggedIn = false;
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
      {!isLoggedIn && <NotificationBox />}
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
}

