import { CoverLetterCard } from "./CoverLetterCard"

interface CoverLetterCardListProps {
  coverLetters: any[]
  onDelete: (coverLetter: any) => void
  onPreview: (coverLetter: any) => void
}

export function CoverLetterCardList({ coverLetters, onDelete, onPreview }: CoverLetterCardListProps) {
  // 분석 핸들러: 상세 데이터 fetch 후 분석 페이지로 이동
  const handleAnalyze = (coverLetter: any) => {
    window.location.href = `/personal/mypage/cover-letter/${coverLetter.id}/analysis`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {coverLetters.map((coverLetter) => (
        <CoverLetterCard
          key={coverLetter.id}
          coverLetter={coverLetter}
          onDelete={() => onDelete(coverLetter)}
          onPreview={() => onPreview(coverLetter)}
          onAnalyze={() => handleAnalyze(coverLetter)}
        />
      ))}
    </div>
  )
}
