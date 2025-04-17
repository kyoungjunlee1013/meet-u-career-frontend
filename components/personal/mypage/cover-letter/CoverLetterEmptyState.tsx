import { FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CoverLetterEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-lg mt-6 bg-gray-50">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <FileText className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="text-lg font-medium mb-2">자기소개서가 없습니다</h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        새로운 자기소개서를 작성하여 취업 준비를 시작해보세요. 작성한 자기소개서는 AI 분석을 통해 직무 적합도를 확인할
        수 있습니다.
      </p>
      <Link href="/personal/mypage/cover-letter/create">
        <Button className="flex items-center gap-1">
          <Plus size={16} />새 자기소개서 작성
        </Button>
      </Link>
    </div>
  )
}
