import { ArrowLeft, Download, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const ApplicantDetailHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <Link href="/business/applicants" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">지원자 상세 정보</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>이력서 다운로드</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Mail className="h-4 w-4" />
          <span>이메일 보내기</span>
        </Button>
      </div>
    </div>
  )
}
