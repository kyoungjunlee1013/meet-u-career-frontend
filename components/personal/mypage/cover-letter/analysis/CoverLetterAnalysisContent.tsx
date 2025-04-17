"use client"

import { useEffect, useState } from "react"
import { AnalysisHeader } from "./AnalysisHeader"
import { FitAnalysisCardList } from "./FitAnalysisCardList"
import { AnalysisSidebar } from "./AnalysisSidebar"
import { getCoverLetterById } from "./actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

interface CoverLetterAnalysisContentProps {
  coverLetterId: string
}

export const CoverLetterAnalysisContent = ({ coverLetterId }: CoverLetterAnalysisContentProps) => {
  const [coverLetter, setCoverLetter] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedJobCategory, setSelectedJobCategory] = useState<string | null>(null)
  const [selectedJobTitle, setSelectedJobTitle] = useState<string | null>(null)
  const [selectedJobPosting, setSelectedJobPosting] = useState<string | null>(null)
  const [allAnalysisComplete, setAllAnalysisComplete] = useState(false)

  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        setLoading(true)
        const data = await getCoverLetterById(coverLetterId)
        setCoverLetter(data)
        setError(null)
      } catch (err) {
        setError("자기소개서 정보를 불러오는데 실패했습니다.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCoverLetter()
  }, [coverLetterId])

  const checkAllAnalysisComplete = (contents: any[]) => {
    if (!contents || contents.length === 0) return false

    const allComplete = contents.every((content) => content.analysis && content.analysis.fitScore !== undefined)

    setAllAnalysisComplete(allComplete)
    return allComplete
  }

  if (loading) {
    return <div className="text-center py-10">자기소개서 정보를 불러오는 중...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <AnalysisHeader
        title={coverLetter?.title || "제목 없음"}
        onJobCategoryChange={setSelectedJobCategory}
        onJobTitleChange={setSelectedJobTitle}
        onJobPostingChange={setSelectedJobPosting}
      />

      {allAnalysisComplete && (
        <Alert className="bg-green-50 border-green-200 mb-6">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">모든 항목에 대한 분석이 완료되었습니다.</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FitAnalysisCardList
            coverLetterId={coverLetterId}
            contents={coverLetter?.contents || []}
            jobTitle={selectedJobTitle}
            jobPostingId={selectedJobPosting}
            onAnalysisComplete={(contents) => checkAllAnalysisComplete(contents)}
          />
        </div>
        <div className="lg:col-span-1">
          <AnalysisSidebar contents={coverLetter?.contents || []} />
        </div>
      </div>
    </div>
  )
}
