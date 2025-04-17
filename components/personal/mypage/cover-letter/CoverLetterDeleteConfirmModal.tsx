"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface CoverLetterDeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  coverLetterTitle: string
}

export function CoverLetterDeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  coverLetterTitle,
}: CoverLetterDeleteConfirmModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>자기소개서 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium">{coverLetterTitle}</span> 자기소개서를 삭제하시겠습니까?
            <br />
            삭제된 자기소개서는 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-500 hover:bg-red-600">
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
