import { ChevronDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type ApplicantStatus = "서류검토중" | "서류합격" | "서류불합격" | "면접예정" | "면접완료" | "최종합격"

type Applicant = {
  id: number
  name: string
  email: string
  position: string
  date: string
  status: ApplicantStatus
}

const statusColors: Record<ApplicantStatus, string> = {
  서류검토중: "bg-blue-100 text-blue-800",
  서류합격: "bg-green-100 text-green-800",
  서류불합격: "bg-red-100 text-red-800",
  면접예정: "bg-amber-100 text-amber-800",
  면접완료: "bg-indigo-100 text-indigo-800",
  최종합격: "bg-teal-100 text-teal-800",
}

const applicants: Applicant[] = [
  {
    id: 1,
    name: "김지원",
    email: "jiwon.kim@example.com",
    position: "프론트엔드 개발자 (React/TypeScript)",
    date: "2023.11.15",
    status: "서류검토중",
  },
  {
    id: 2,
    name: "이민수",
    email: "minsu.lee@example.com",
    position: "프론트엔드 개발자 (React/TypeScript)",
    date: "2023.11.14",
    status: "서류합격",
  },
  {
    id: 3,
    name: "박서연",
    email: "seoyeon.park@example.com",
    position: "프론트엔드 개발자 (React/TypeScript)",
    date: "2023.11.13",
    status: "면접예정",
  },
  {
    id: 4,
    name: "최준호",
    email: "junho.choi@example.com",
    position: "프론트엔드 개발자 (React/TypeScript)",
    date: "2023.11.12",
    status: "최종합격",
  },
  {
    id: 5,
    name: "정다은",
    email: "daeun.jung@example.com",
    position: "프론트엔드 개발자 (React/TypeScript)",
    date: "2023.11.11",
    status: "서류불합격",
  },
]

export const ApplicantsTable = () => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="grid grid-cols-[2fr,3fr,1fr,1fr] bg-gray-50 border-b border-gray-200">
        <div className="p-4 font-medium text-gray-700">이름</div>
        <div className="p-4 font-medium text-gray-700">지원 포지션</div>
        <div className="p-4 font-medium text-gray-700 flex items-center">
          지원일
          <button className="ml-1">
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="p-4 font-medium text-gray-700">상태</div>
      </div>

      {applicants.map((applicant) => (
        <div
          key={applicant.id}
          className="grid grid-cols-[2fr,3fr,1fr,1fr,40px] border-b border-gray-200 hover:bg-gray-50"
        >
          <div className="p-4">
            <Link href={`/business/applicants/${applicant.id}`} className="hover:underline">
              <div className="font-medium">{applicant.name}</div>
              <div className="text-sm text-gray-500">{applicant.email}</div>
            </Link>
          </div>
          <div className="p-4 flex items-center">{applicant.position}</div>
          <div className="p-4 flex items-center">{applicant.date}</div>
          <div className="p-4 flex items-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[applicant.status]}`}>
              {applicant.status}
            </span>
          </div>          
        </div>
      ))}
    </div>
  )
}
