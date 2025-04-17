"use client"

import { useEffect } from "react"
import { X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  resumeTitle: string
}

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, resumeTitle }: DeleteConfirmModalProps) => {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">이력서 삭제</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-4 text-amber-600">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <span className="font-medium">주의</span>
            </div>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">"{resumeTitle}"</span> 이력서를 삭제하시겠습니까?
            </p>
            <p className="text-gray-600 text-sm">삭제된 이력서는 복구할 수 없습니다.</p>
          </div>

          <div className="border-t p-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={onConfirm}>
              삭제
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
