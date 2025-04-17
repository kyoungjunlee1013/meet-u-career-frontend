import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock } from "lucide-react"

interface CoverLetterStatsCardListProps {
  totalCount: number
  recentCount: number
}

export function CoverLetterStatsCardList({ totalCount, recentCount }: CoverLetterStatsCardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="flex items-center p-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">전체 자기소개서</p>
            <p className="text-2xl font-bold">{totalCount}개</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-4">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">최근 1개월 작성</p>
            <p className="text-2xl font-bold">{recentCount}개</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
