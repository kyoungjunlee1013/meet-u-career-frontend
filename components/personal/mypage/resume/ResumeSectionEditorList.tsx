import { ResumeSectionEditorCard } from "./ResumeSectionEditorCard"
import type { ResumeSection } from "./ResumeEditor"

interface ResumeSectionEditorListProps {
  sections: ResumeSection[]
  onSectionContentUpdate: (sectionId: string, content: any) => void
}

export function ResumeSectionEditorList({ sections, onSectionContentUpdate }: ResumeSectionEditorListProps) {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <ResumeSectionEditorCard
          key={section.id}
          section={section}
          onContentUpdate={(content) => onSectionContentUpdate(section.id, content)}
        />
      ))}
    </div>
  )
}
