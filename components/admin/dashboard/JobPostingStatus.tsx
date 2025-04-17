import { Eye } from "lucide-react"

export function JobPostingStatus() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">채용공고 상태</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <Eye className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-6">
        <StatusBar label="활성 채용공고" count="14,500개" percentage={65.9} color="bg-blue-500" />
        <StatusBar label="마감된 채용공고" count="6,800개" percentage={30.9} color="bg-orange-500" />
        <StatusBar label="임시저장 채용공고" count="700개" percentage={3.2} color="bg-gray-300" />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <MetricBox value="54.3회" description="공고당 평균 조회수" />
        <MetricBox value="12.8명" description="공고당 평균 지원자 수" />
        <MetricBox value="18.5일" description="평균 공고 게시 기간" />
      </div>
    </div>
  )
}

interface StatusBarProps {
  label: string
  count: string
  percentage: number
  color: string
}

function StatusBar({ label, count, percentage, color }: StatusBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{count}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="text-right mt-1">
        <span className="text-xs text-gray-500">{percentage}%</span>
      </div>
    </div>
  )
}

interface MetricBoxProps {
  value: string
  description: string
}

function MetricBox({ value, description }: MetricBoxProps) {
  return (
    <div className="text-center">
      <p className="text-lg font-bold text-blue-600">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  )
}
