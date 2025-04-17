import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CoverLetterContentProps {
  coverLetter: string
}

export const CoverLetterContent = ({ coverLetter }: CoverLetterContentProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>자기소개서</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-line">{coverLetter}</div>
      </CardContent>
    </Card>
  )
}
