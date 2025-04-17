import Link from "next/link"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResumeEmptyStateProps {
  activeTab: number | null
}

export const ResumeEmptyState = ({ activeTab }: ResumeEmptyStateProps) => {
  const getMessage = () => {
    switch (activeTab) {
      case 0:
        return "직접 작성한 MeetU 이력서가 없습니다."
      case 1:
        return "등록된 파일 이력서가 없습니다."
      case 2:
        return "등록된 URL 이력서가 없습니다."
      default:
        return "등록된 이력서가 없습니다."
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <FileText className="h-10 w-10 text-gray-400" />
      </div>
      <p className="text-gray-600 mb-4 text-center">{getMessage()}</p>
      <Button asChild className="bg-blue-600 hover:bg-blue-700">
        <Link href="/personal/mypage/resume/create?type=direct">이력서 작성하러 가기 →</Link>
      </Button>
    </div>
  )
}
