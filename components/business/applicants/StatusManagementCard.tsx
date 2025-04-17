"use client"

import { useState } from "react"
import { Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { type ApplicantStatus, statusColors } from "./types"

interface StatusManagementCardProps {
  currentStatus: ApplicantStatus
  onStatusChange: (status: ApplicantStatus) => void
}

export const StatusManagementCard = ({ currentStatus, onStatusChange }: StatusManagementCardProps) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (newStatus: ApplicantStatus) => {
    setIsUpdating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onStatusChange(newStatus)
    setIsUpdating(false)
    toast({
      title: "상태 업데이트 완료",
      description: `지원자 상태가 ${newStatus}(으)로 변경되었습니다.`,
    })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>지원자 상태 관리</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">현재 상태</p>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[currentStatus]}`}>
            {currentStatus}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">상태 변경</p>
          <Select
            value={currentStatus}
            onValueChange={(value) => handleStatusChange(value as ApplicantStatus)}
            disabled={isUpdating}
          >
            <SelectTrigger>
              <SelectValue placeholder="상태 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="서류검토중">서류검토중</SelectItem>
              <SelectItem value="서류합격">서류합격</SelectItem>
              <SelectItem value="서류불합격">서류불합격</SelectItem>
              <SelectItem value="면접예정">면접예정</SelectItem>
              <SelectItem value="면접완료">면접완료</SelectItem>
              <SelectItem value="최종합격">최종합격</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="font-medium">빠른 액션</p>
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" className="justify-start">
              <Mail className="h-4 w-4 mr-2" />
              이메일 보내기
            </Button>
            <Button variant="outline" className="justify-start">
              <Phone className="h-4 w-4 mr-2" />
              전화하기
            </Button>
            <Button variant="default" className="justify-start">
              면접 일정 잡기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
