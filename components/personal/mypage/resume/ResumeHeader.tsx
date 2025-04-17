import Link from "next/link"
import { FileText, Upload, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ResumeHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">이력서 관리</h1>
        <p className="text-gray-600 mt-1">등록된 이력서를 관리하고, 지원 시 사용할 대표 이력서를 선택하세요.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/personal/mypage/resume/create?type=direct">
            <FileText className="mr-2 h-4 w-4" />
            MeetU 이력서 작성
          </Link>
        </Button>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/personal/mypage/resume/create?type=file">
            <Upload className="mr-2 h-4 w-4" />
            파일로 작성
          </Link>
        </Button>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/personal/mypage/resume/create?type=url">
            <LinkIcon className="mr-2 h-4 w-4" />
            URL로 작성
          </Link>
        </Button>
      </div>
    </div>
  )
}
