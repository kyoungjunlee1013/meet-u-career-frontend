import { CoverLetterCard } from "./CoverLetterCard"

interface CoverLetterCardListProps {
  coverLetters: any[]
  onDelete: (coverLetter: any) => void
  onPreview: (coverLetter: any) => void
}

export function CoverLetterCardList({ coverLetters, onDelete, onPreview }: CoverLetterCardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {coverLetters.map((coverLetter) => (
        <CoverLetterCard
          key={coverLetter.id}
          coverLetter={coverLetter}
          onDelete={() => onDelete(coverLetter)}
          onPreview={() => onPreview(coverLetter)}
        />
      ))}
    </div>
  )
}
