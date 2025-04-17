"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, BarChart2 } from "lucide-react"

interface AnalysisSidebarProps {
  contents: any[]
}

export const AnalysisSidebar = ({ contents }: AnalysisSidebarProps) => {
  const analysisStats = useMemo(() => {
    const total = contents.length
    const analyzed = contents.filter((c) => c.analysis && c.analysis.fitScore !== undefined).length
    const highScores = contents.filter((c) => c.analysis && c.analysis.fitScore >= 80).length
    const mediumScores = contents.filter(
      (c) => c.analysis && c.analysis.fitScore >= 60 && c.analysis.fitScore < 80,
    ).length
    const lowScores = contents.filter(
      (c) => c.analysis && c.analysis.fitScore < 60 && c.analysis.fitScore !== undefined,
    ).length

    const averageScore =
      analyzed > 0
        ? Math.round(
            contents
              .filter((c) => c.analysis && c.analysis.fitScore !== undefined)
              .reduce((sum, c) => sum + c.analysis.fitScore, 0) / analyzed,
          )
        : 0

    return {
      total,
      analyzed,
      notAnalyzed: total - analyzed,
      percentComplete: total > 0 ? Math.round((analyzed / total) * 100) : 0,
      highScores,
      mediumScores,
      lowScores,
      averageScore,
    }
  }, [contents])

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">분석 요약</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">분석 진행률</span>
            <span className="text-sm font-medium">{analysisStats.percentComplete}%</span>
          </div>
          <Progress value={analysisStats.percentComplete} className="h-2" />

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-600">분석 완료: {analysisStats.analyzed}</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm text-gray-600">미분석: {analysisStats.notAnalyzed}</span>
            </div>
          </div>
        </div>

        {analysisStats.analyzed > 0 && (
          <>
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center mb-3">
                <BarChart2 className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium">평균 적합도 점수</span>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-3xl font-bold text-blue-600">{analysisStats.averageScore}</div>
                <div className="text-lg ml-1">점</div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="text-sm font-medium mb-3">항목별 점수 분포</div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">높음 (80점 이상)</span>
                  <span className="text-sm font-medium text-green-600">{analysisStats.highScores}개</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">중간 (60-79점)</span>
                  <span className="text-sm font-medium text-amber-600">{analysisStats.mediumScores}개</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">낮음 (60점 미만)</span>
                  <span className="text-sm font-medium text-red-600">{analysisStats.lowScores}개</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="text-sm font-medium mb-3">개선 제안</div>
              <p className="text-sm text-gray-600">
                {analysisStats.lowScores > 0
                  ? `${analysisStats.lowScores}개 항목의 점수가 낮습니다. 해당 항목을 직무와 연관성 있게 수정해보세요.`
                  : "모든 항목이 적절한 점수를 받았습니다. 필요시 코멘트를 참고하여 개선해보세요."}
              </p>
            </div>
          </>
        )}

        {analysisStats.analyzed === 0 && (
          <div className="py-6 text-center">
            <p className="text-gray-500 text-sm">
              아직 분석된 항목이 없습니다.
              <br />
              직무를 선택하고 분석을 진행해주세요.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
