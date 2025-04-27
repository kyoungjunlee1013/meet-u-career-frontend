import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock } from "lucide-react"

interface CoverLetterStatsCardListProps {
  totalCount: number;
  analyzedCount: number;
  unanalyzedCount: number;
}

export function CoverLetterStatsCardList({ totalCount, analyzedCount, unanalyzedCount }: CoverLetterStatsCardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            <p className="text-sm text-gray-500">분석 완료</p>
            <p className="text-2xl font-bold">{analyzedCount}개</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center p-4">
          <div className="bg-gray-100 p-3 rounded-full mr-4">
            <FileText className="h-6 w-6 text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">미분석</p>
            <p className="text-2xl font-bold">{unanalyzedCount}개</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
