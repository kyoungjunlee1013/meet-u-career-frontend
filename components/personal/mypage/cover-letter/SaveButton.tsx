"use client"

import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SaveButtonProps {
  onClick: () => void
  isEditMode: boolean
  isSaving: boolean
  progress: number
}

export function SaveButton({ onClick, isEditMode, isSaving, progress }: SaveButtonProps) {
  return (
    <Button onClick={onClick} disabled={isSaving} className="flex items-center gap-2 shadow-lg" size="lg">
      {isSaving ? (
        <>
          <div className="relative h-4 w-4">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
            <div
              className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent"
              style={{
                transform: `rotate(${progress * 3.6}deg)`,
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          <span>저장 중...</span>
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          <span>{isEditMode ? "수정 완료" : "저장하기"}</span>
        </>
      )}
    </Button>
  )
}
