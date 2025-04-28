"use client"

import type { CoverLetterSection } from "./CoverLetterEditor"
import { CoverLetterContentEditorCard } from "./CoverLetterContentEditorCard"

interface CoverLetterContentEditorListProps {
  sections: CoverLetterSection[]
  onSectionContentUpdate: (sectionId: string, field: keyof CoverLetterSection, value: string) => void
  onRequestFeedback: (sectionId: string) => void
  onApplyFeedback: (sectionId: string) => void
}

export function CoverLetterContentEditorList({
  sections,
  onSectionContentUpdate,
  onRequestFeedback,
  onApplyFeedback,
}: CoverLetterContentEditorListProps) {
  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <CoverLetterContentEditorCard
          key={section.id || idx}
          section={section}
          onSectionTitleChange={(value) => onSectionContentUpdate(section.id, "sectionTitle", value)}
          onContentChange={(value) => onSectionContentUpdate(section.id, "content", value)}
          onRequestFeedback={() => onRequestFeedback(section.id)}
          onApplyFeedback={() => onApplyFeedback(section.id)}
        />
      ))}
      {sections.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">항목을 추가해주세요.</p>
        </div>
      )}
    </div>
  )
}
