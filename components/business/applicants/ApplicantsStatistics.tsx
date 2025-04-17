import type React from "react"
import { Users, Clock, CheckCircle, XCircle, Calendar, CircleDot, Award } from "lucide-react"

type StatCardProps = {
  icon: React.ReactNode
  count: number
  label: string
  color: string
}

const StatCard = ({ icon, count, label, color }: StatCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center">
      <div className={`mb-1 ${color}`}>{icon}</div>
      <div className="text-xl font-bold">{count}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}

export const ApplicantsStatistics = () => {
  return (
    <div className="mb-6 grid grid-cols-7 gap-4">
      <StatCard icon={<Users className="h-5 w-5" />} count={5} label="총 지원자" color="text-gray-700" />
      <StatCard icon={<Clock className="h-5 w-5" />} count={1} label="서류검토중" color="text-blue-500" />
      <StatCard icon={<CheckCircle className="h-5 w-5" />} count={1} label="서류합격" color="text-green-500" />
      <StatCard icon={<XCircle className="h-5 w-5" />} count={1} label="서류불합격" color="text-red-500" />
      <StatCard icon={<Calendar className="h-5 w-5" />} count={1} label="면접예정" color="text-amber-500" />
      <StatCard icon={<CircleDot className="h-5 w-5" />} count={0} label="면접완료" color="text-indigo-500" />
      <StatCard icon={<Award className="h-5 w-5" />} count={1} label="최종합격" color="text-teal-500" />
    </div>
  )
}
