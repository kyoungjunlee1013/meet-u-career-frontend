import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { Eye, Pencil, BarChart2, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CoverLetterCardFooterProps {
  id: string
  onDelete: () => void
  onPreview: () => void
  onAnalyze: () => void
}

export function CoverLetterCardFooter({ id, onDelete, onPreview, onAnalyze }: CoverLetterCardFooterProps) {
  return (
    <CardFooter className="grid grid-cols-2 gap-2 pt-4 border-t">
      <Button variant="outline" size="sm" onClick={onPreview}>
        <Eye size={14} className="mr-1" />
        보기
      </Button>
      <Link href={`/personal/mypage/cover-letter/${id}/edit`} className="block">
        <Button variant="outline" size="sm" className="w-full">
          <Pencil size={14} className="mr-1" />
          수정
        </Button>
      </Link>
      <Button variant="outline" size="sm" className="w-full" onClick={onAnalyze}>
        <BarChart2 size={14} className="mr-1" />
        분석
      </Button>
      <Button variant="outline" size="sm" onClick={onDelete} className="text-red-500 hover:text-red-700">
        <Trash2 size={14} className="mr-1" />
        삭제
      </Button>
    </CardFooter>
  )
}
