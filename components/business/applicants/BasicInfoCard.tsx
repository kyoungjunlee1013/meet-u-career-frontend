import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type Applicant, type ApplicantStatus, statusColors } from "./types"

interface BasicInfoCardProps {
  applicant: Applicant
  status: ApplicantStatus
}

export const BasicInfoCard = ({ applicant, status }: BasicInfoCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>기본 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">이름</p>
            <p className="font-medium">{applicant.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">이메일</p>
            <p className="font-medium">{applicant.email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">전화번호</p>
            <p className="font-medium">{applicant.phone}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">지원 포지션</p>
            <p className="font-medium">{applicant.position}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">지원일</p>
            <p className="font-medium">{applicant.applyDate}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">현재 상태</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>{status}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
