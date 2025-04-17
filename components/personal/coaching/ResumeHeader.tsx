import { Lock } from "lucide-react"

export const ResumeHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-medium">새 자기소개서</h1>
      <div className="flex items-center text-sm text-gray-500">
        <Lock className="h-4 w-4 mr-1" />
        <span>조회 제한</span>
      </div>
    </div>
  )
}
