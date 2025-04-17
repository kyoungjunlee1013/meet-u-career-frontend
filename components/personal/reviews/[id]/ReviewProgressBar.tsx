interface ReviewProgressBarProps {
  label: string
  percentage: number
}

export const ReviewProgressBar = ({ label, percentage }: ReviewProgressBarProps) => {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-500">{percentage.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}
