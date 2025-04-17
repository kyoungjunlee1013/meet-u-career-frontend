"use client"

import type React from "react"

import type { CoverLetterData } from "./CoverLetterEditor"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface CoverLetterBasicInfoCardProps {
  coverLetterData: CoverLetterData
  setCoverLetterData: React.Dispatch<React.SetStateAction<CoverLetterData>>
}

export function CoverLetterBasicInfoCard({ coverLetterData, setCoverLetterData }: CoverLetterBasicInfoCardProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCoverLetterData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              자기소개서 제목 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={coverLetterData.title}
              onChange={handleChange}
              placeholder="자기소개서 제목을 입력해주세요 (예: 백엔드 개발자 자기소개서)"
              className="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="text-xs text-gray-500">
              자기소개서 제목은 타인에게 공유되지 않으며, 내 자기소개서 목록에서 구분하기 위한 용도로만 사용됩니다.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
