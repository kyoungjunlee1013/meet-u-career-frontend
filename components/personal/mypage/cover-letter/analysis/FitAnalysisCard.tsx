"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { analyzeContent } from "./actions"
import { Loader2, BarChart2 } from "lucide-react"
import { formatDate } from "@/utils/date-formatter"

interface FitAnalysisCardProps {
  content: any;
  jobTitle: string | null;
  onAnalysisComplete: (contentId: string, analysisData: any) => void;
}

export const FitAnalysisCard = ({ content, jobTitle, onAnalysisComplete }: FitAnalysisCardProps) => {
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState(content.analysis || null)

  const handleAnalyze = async () => {
    if (!jobTitle) {
      setError("직무를 선택해주세요.")
      return
    }

    try {
      setAnalyzing(true)
      setError(null)

      const result = await analyzeContent(content.id, jobTitle)

      setAnalysis(result)
      onAnalysisComplete(content.id, result)
    } catch (err) {
      setError("분석에 실패했습니다.")
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 pb-3">
        <CardTitle className="text-lg font-medium">{content.title || "제목 없음"}</CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 mb-4">{content.content}</div>
        </div>

        {error && <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm mb-4">{error}</div>}

        {analysis ? (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-2">
              <BarChart2 className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-800">분석 결과</h3>
            </div>

            <div className="mb-2">
              <span className="text-sm text-gray-600">적합도 점수:</span>
              <span className="text-xl font-bold text-blue-600 ml-2">{analysis.fitScore}점</span>
            </div>

            <div className="mb-2">
              <span className="text-sm text-gray-600">분석 코멘트:</span>
              <p className="text-sm text-gray-700 mt-1">{analysis.comment}</p>
            </div>

            <div className="text-xs text-gray-500 mt-2">분석 일시: {formatDate(analysis.createdAt)}</div>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-500 mb-2">아직 분석되지 않았습니다.</p>
            <Button onClick={handleAnalyze} disabled={analyzing || !jobTitle} className="mt-2">
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  분석 중...
                </>
              ) : (
                "분석하기"
              )}
            </Button>
          </div>
        )}
      </CardContent>

      {analysis && (
        <CardFooter className="bg-gray-50 py-3 flex justify-end">
          <Button variant="outline" onClick={handleAnalyze} disabled={analyzing} size="sm">
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                분석 중...
              </>
            ) : (
              "분석 다시하기"
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
