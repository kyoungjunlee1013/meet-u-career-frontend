"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/utils/date-formatter"

interface CoverLetterPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  coverLetter: any
}

export function CoverLetterPreviewModal({ isOpen, onClose, coverLetter }: CoverLetterPreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-blue-50 rounded-xl shadow-xl border border-blue-200">
        {/* 헤더: 블루 배경, 화이트 텍스트, 그림자 */}
        <div className="rounded-t-xl bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-5 shadow text-white mb-6">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold tracking-tight">{coverLetter.title}</DialogTitle>
            <span className="text-sm opacity-80">최종 수정일: {formatDate(coverLetter.updatedAt)}</span>
          </div>
          {coverLetter.company && (
            <div className="text-base mt-1 opacity-80">{coverLetter.company}</div>
          )}
        </div>

        {/* 섹션 카드들 */}
        <div className="space-y-6 px-6 pb-2">
          {(() => {
  let sections = Array.isArray(coverLetter.sections) ? [...coverLetter.sections] : [];
  // contentOrder 기준 정렬(있으면)
  if (sections.length > 0 && sections[0].contentOrder !== undefined) {
    sections.sort((a, b) => (a.contentOrder ?? 0) - (b.contentOrder ?? 0));
  }
  return sections.map((section: any, index: number) => (
    <div
      key={index}
      className="bg-white border-2 border-blue-200 rounded-lg shadow-sm px-6 py-5 mb-2"
    >
      <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
        {/* sectionTitle(신규) → title(구) 순으로 우선 표시 */}
        {section.sectionTitle || section.title}
      </h3>
      <p className="text-gray-800 whitespace-pre-line leading-relaxed text-base min-h-[32px]">
        {section.content}
      </p>
    </div>
  ));
})()}
        </div>

        <DialogFooter className="bg-blue-50 rounded-b-xl px-8 py-4 mt-2 flex justify-end">
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white px-7">닫기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
