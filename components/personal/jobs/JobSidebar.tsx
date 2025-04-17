import Link from "next/link"
import { Home, FileText, Briefcase } from "lucide-react"

export const JobSidebar = () => {
  return (
    <div className="flex flex-col items-center gap-6 sticky top-6">
      <Link
        href="/personal/jobs"
        className="w-12 h-12 flex flex-col items-center justify-center text-blue-600 hover:text-blue-700"
      >
        <Home className="h-5 w-5 mb-1" />
        <span className="text-xs">채용정보</span>
      </Link>

      <div className="w-12 h-12 flex flex-col items-center justify-center text-gray-400">
        <div className="flex items-center justify-center h-5 w-5 mb-1">
          <span className="text-sm">i</span>
        </div>
        <span className="text-xs">공고정보</span>
      </div>

      <Link
        href="/personal/myresume"
        className="w-12 h-12 flex flex-col items-center justify-center text-gray-600 hover:text-gray-700"
      >
        <FileText className="h-5 w-5 mb-1" />
        <span className="text-xs">자기소개서</span>
      </Link>

      <Link
        href="/personal/myapplications"
        className="w-12 h-12 flex flex-col items-center justify-center text-gray-600 hover:text-gray-700"
      >
        <Briefcase className="h-5 w-5 mb-1" />
        <span className="text-xs">지원내역</span>
      </Link>
    </div>
  )
}
