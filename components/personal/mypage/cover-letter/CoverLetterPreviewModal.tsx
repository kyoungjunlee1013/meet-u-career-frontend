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
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{coverLetter.title}</DialogTitle>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{coverLetter.company}</span>
            <span>최종 수정일: {formatDate(coverLetter.updatedAt)}</span>
          </div>
        </DialogHeader>

        <div className="space-y-6 my-4">
          {coverLetter.sections.map((section: any, index: number) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-medium border-b pb-1">{section.title}</h3>
              <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>닫기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
