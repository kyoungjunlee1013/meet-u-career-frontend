"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, RefreshCcw, Check } from "lucide-react"
import type { CoverLetterSection } from "./CoverLetterEditor"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface CoverLetterContentEditorCardProps {
  section: CoverLetterSection
  onSectionTitleChange: (value: string) => void
  onContentChange: (value: string) => void
  onRequestFeedback: () => void
  onApplyFeedback: () => void
}

export function CoverLetterContentEditorCard({
  section,
  onSectionTitleChange,
  onContentChange,
  onRequestFeedback,
  onApplyFeedback,
}: CoverLetterContentEditorCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hasFeedback = !!section.feedback && !!section.revisedContent

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Input
            value={section.sectionTitle}
            onChange={(e) => onSectionTitleChange(e.target.value)}
            placeholder="항목 제목을 입력해주세요"
            className="font-medium text-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
          <Textarea
            value={section.content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="내용을 입력해주세요 (최대 4000자)"
            className="min-h-[200px] resize-y border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            maxLength={4000}
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">{section.content.length} / 4000자</div>
            <Button type="button" onClick={onRequestFeedback} variant="outline" className="text-sm">
              AI 피드백 요청
            </Button>
          </div>
        </div>

        {hasFeedback && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-md overflow-hidden">
            <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-blue-600">💬 AI 피드백</span>
                {section.isApplied && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">적용됨</span>
                )}
              </div>
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 bg-gray-50 space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">피드백 요약</h4>
                <p className="text-sm text-gray-700">{section.feedback}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">수정 제안</h4>
                <div className="bg-white p-3 rounded-md border border-gray-200 text-sm text-gray-700 whitespace-pre-wrap">
                  {section.revisedContent}
                </div>
              </div>
              <div className="flex space-x-2 justify-end">
                <Button
                  type="button"
                  onClick={onRequestFeedback}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <RefreshCcw size={14} />
                  <span>다시 피드백 받기</span>
                </Button>
                <Button
                  type="button"
                  onClick={onApplyFeedback}
                  size="sm"
                  className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700"
                  disabled={section.isApplied}
                >
                  <Check size={14} />
                  <span>내용 적용하기</span>
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  )
}
