import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/utils/date-formatter"
import { CoverLetterCardFooter } from "./CoverLetterCardFooter"

interface CoverLetterCardProps {
  coverLetter: any
  onDelete: () => void
  onPreview: () => void
}

export function CoverLetterCard({ coverLetter, onDelete, onPreview }: CoverLetterCardProps) {
  // Check if sections is an array, if not, create an empty array
  const sections = Array.isArray(coverLetter.sections) ? coverLetter.sections : []

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-1">{coverLetter.title}</CardTitle>
        <p className="text-sm text-gray-500">{coverLetter.company}</p>
        <p className="text-xs text-gray-400">최종 수정일: {formatDate(coverLetter.updatedAt)}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          {sections.slice(0, 2).map((section: any, index: number) => (
            <div key={index} className="space-y-1">
              <h4 className="text-sm font-medium">{section.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{section.content}</p>
            </div>
          ))}
          {sections.length > 2 && <p className="text-xs text-gray-400">+ {sections.length - 2}개 섹션 더 보기</p>}
        </div>
      </CardContent>
      <CoverLetterCardFooter id={coverLetter.id} onDelete={onDelete} onPreview={onPreview} />
    </Card>
  )
}
