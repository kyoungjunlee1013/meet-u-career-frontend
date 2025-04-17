"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CoverLetterSectionAddModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (sectionTitle: string) => void
}

export function CoverLetterSectionAddModal({ isOpen, onClose, onAdd }: CoverLetterSectionAddModalProps) {
  const [sectionTitle, setSectionTitle] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!sectionTitle.trim()) {
      setError("항목 제목을 입력해주세요.")
      return
    }

    onAdd(sectionTitle)
    setSectionTitle("")
    setError("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>자기소개서 항목 추가</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="sectionTitle">항목 제목</Label>
              <Input
                id="sectionTitle"
                value={sectionTitle}
                onChange={(e) => {
                  setSectionTitle(e.target.value)
                  if (e.target.value.trim()) setError("")
                }}
                placeholder="예: 지원 동기, 직무 경험, 성장 비전 등"
                className={error ? "border-red-500" : ""}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">추가</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
