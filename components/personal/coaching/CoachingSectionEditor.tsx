"use client";

import { Sparkles } from "lucide-react";
import React from "react";

export type CoachingSection = {
  sectionKey: string;
  sectionTitle: string;
  content: string;
  feedback?: string;
  revisedContent?: string;
  isLoading?: boolean;
  error?: string;
};

interface CoachingSectionEditorProps {
  section: CoachingSection;
  onContentChange: (value: string) => void;
  onAIFeedback: () => void;
  onApplyRevisedContent?: () => void;
}

export const CoachingSectionEditor: React.FC<CoachingSectionEditorProps> = ({
  section,
  onContentChange,
  onAIFeedback,
  onApplyRevisedContent,
}) => {
  const [showCopied, setShowCopied] = React.useState(false);
  return (
    <div className="bg-white border rounded-md p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">{section.sectionTitle}</h2>
      <div className="flex gap-6 flex-wrap md:flex-nowrap h-full min-h-[320px]">
        <div className="w-full md:w-5/12 min-w-[220px] flex flex-col h-full min-h-[340px] justify-between">
          <div className="flex-1 flex flex-col">
            <textarea
              className="w-full flex-1 min-h-[260px] h-[320px] p-4 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="내용을 입력하세요... (최대 1000자)"
              value={section.content}
              maxLength={1000}
              onChange={(e) => {
                if (e.target.value.length <= 1000) onContentChange(e.target.value);
              }}
              disabled={section.isLoading}
              style={{height: '320px'} as React.CSSProperties}
            ></textarea>
          </div>
          <div>
            <div className="flex justify-between items-center mt-2">
              <div style={{ minHeight: '20px' }}>
                {section.content.trim().length > 0 && section.content.trim().length < 50 ? (
                  <span className="text-xs text-red-500">AI 피드백을 받으려면 최소 50자 이상 입력해 주세요.</span>
                ) : (
                  <span className="text-xs invisible">AI 피드백을 받으려면 최소 50자 이상 입력해 주세요.</span>
                )}
              </div>
              <span className={`text-xs ${section.content.length > 1000 ? "text-red-500" : "text-gray-500"}`}>{section.content.length}/1000자</span>
            </div>
            {section.content.length > 1000 && (
              <div className="text-xs text-red-500 mt-1">1000자 이내로 입력해 주세요.</div>
            )}
          </div>
        </div>
        <div className="w-full md:w-7/12 min-w-[280px] bg-gray-50 rounded-md p-6 flex flex-col min-h-[320px] shadow-sm h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold">AI 코칭 피드백</h3>
            <div className="flex flex-col items-end">
              <button
                className="flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 font-semibold text-base transition-all duration-150 disabled:bg-gray-300 disabled:text-gray-400 disabled:shadow-none"
                type="button"
                disabled={section.isLoading || section.content.trim().length < 50 || section.content.length > 1000}
                onClick={onAIFeedback}
                style={{ minHeight: '44px' }}
              >
                <Sparkles className="h-3 w-3" />
                <span>AI 코칭 받기</span>
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-[110px] max-h-60 overflow-y-auto border border-dashed border-gray-200 bg-white rounded p-3">
            {section.isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400 mb-2"></div>
                <p className="text-sm">AI 피드백을 생성 중입니다...</p>
              </div>
            ) : section.error ? (
              <p className="text-sm text-red-500">{section.error}</p>
            ) : section.feedback || section.revisedContent ? (
              <div className="space-y-3">
                {section.feedback && (
                  <div className="bg-blue-50 border border-blue-100 rounded px-3 py-2 flex items-start gap-2">
                    <span className="font-semibold text-blue-700 shrink-0">피드백</span>
                    <span className="text-sm text-gray-800">{section.feedback}</span>
                  </div>
                )}
                {section.revisedContent && (
                  <div className="bg-green-50 border border-green-100 rounded px-3 py-2 flex items-start gap-2 relative">
                    <span className="font-semibold text-green-700 shrink-0">AI 수정 예시</span>
                    <span className="text-sm text-gray-800 flex-1">{section.revisedContent}</span>
                    <button
                      className="ml-2 px-2 py-0.5 text-xs border border-green-200 rounded bg-white text-green-700 hover:bg-green-100 transition"
                      style={{ fontSize: '11px', minWidth: '36px' }}
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(section.revisedContent || "");
                        setShowCopied(true);
                        setTimeout(() => setShowCopied(false), 1500);
                      }}
                    >복사</button>
                    {onApplyRevisedContent && (
                      <button
                        className="ml-2 px-2 py-0.5 text-xs border border-green-200 rounded bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
                        style={{ fontSize: '11px', minWidth: '52px' }}
                        type="button"
                        onClick={onApplyRevisedContent}
                        disabled={section.content === section.revisedContent}
                      >수정안 적용</button>
                    )}
                    {showCopied && (
                      <div className="absolute top-0 right-0 mt-[-32px] mr-1 bg-green-600 text-white text-xs rounded px-2 py-1 shadow z-10 animate-fade-in-out">
                        복사되었습니다
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400">내용을 입력하고 AI 코칭을 요청하면 피드백을 받을 수 있습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
