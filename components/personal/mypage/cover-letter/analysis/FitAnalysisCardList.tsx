"use client"

import { useState, useEffect } from "react"
import { FitAnalysisCard } from "./FitAnalysisCard"
import { Button } from "@/components/ui/button"
import { analyzeAllContents } from "./actions"
import { Loader2 } from "lucide-react"

interface FitAnalysisCardListProps {
  coverLetterId: string
  contents: any[]
  jobTitle: string | null
  jobPostingId: string | null
  onAnalysisComplete: (contents: any[]) => void
}

export const FitAnalysisCardList = ({
  coverLetterId,
  contents,
  jobTitle,
  jobPostingId,
  onAnalysisComplete,
}: FitAnalysisCardListProps) => {
  const [analysisContents, setAnalysisContents] = useState<any[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setAnalysisContents(contents)
  }, [contents])

  const handleAnalyzeAll = async () => {
    if (!jobTitle) {
      setError("직무를 선택해주세요.")
      return
    }

    try {
      setAnalyzing(true)
      setError(null)

      const results = await analyzeAllContents(
        coverLetterId,
        analysisContents.map((c) => c.id),
        jobTitle,
        jobPostingId,
      )

      setAnalysisContents(results)
      onAnalysisComplete(results)
    } catch (err) {
      setError("분석 중 오류가 발생했습니다. 다시 시도해주세요.")
      console.error(err)
    } finally {
      setAnalyzing(false)
    }
  }

  const updateContentAnalysis = (contentId: string, analysisData: any) => {
    setAnalysisContents((prev) =>
      prev.map((content) => (content.id === contentId ? { ...content, analysis: analysisData } : content)),
    )

    // Check if all contents are analyzed
    const updatedContents = analysisContents.map((content) =>
      content.id === contentId ? { ...content, analysis: analysisData } : content,
    )

    onAnalysisComplete(updatedContents)
  }

  if (analysisContents.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">분석할 자기소개서 항목이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">항목별 분석</h2>
        <Button onClick={handleAnalyzeAll} disabled={analyzing || !jobTitle}>
          {analyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              전체 분석 중...
            </>
          ) : (
            "전체 항목 분석하기"
          )}
        </Button>
      </div>

      {error && <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm mb-4">{error}</div>}

      {analysisContents.map((content) => (
        <FitAnalysisCard
          key={content.id}
          content={content}
          jobTitle={jobTitle}
          jobPostingId={jobPostingId}
          onAnalysisComplete={updateContentAnalysis}
        />
      ))}
    </div>
  )
}
