import { ResumeCard } from "./ResumeCard"

interface Resume {
  id: number
  title: string
  updatedAt: string
  resumeType: number
  isPrimary: boolean
  status: number
}

interface ResumeCardListProps {
  resumes: Resume[]
  onSetPrimary: (id: number) => void
  onDelete: (id: number) => void
}

export const ResumeCardList = ({ resumes, onSetPrimary, onDelete }: ResumeCardListProps) => {
  // Sort resumes to show primary first
  const sortedResumes = [...resumes].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1
    if (!a.isPrimary && b.isPrimary) return 1
    return 0
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {sortedResumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} onSetPrimary={onSetPrimary} onDelete={onDelete} />
      ))}
    </div>
  )
}
