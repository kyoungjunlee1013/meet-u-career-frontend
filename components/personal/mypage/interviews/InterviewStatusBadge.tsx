interface InterviewStatusBadgeProps {
  status: "scheduled" | "completed"
}

export function InterviewStatusBadge({ status }: InterviewStatusBadgeProps) {
  if (status === "scheduled") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <span className="h-1.5 w-1.5 mr-1.5 rounded-full bg-blue-500"></span>
        예정됨
      </span>
    )
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      <span className="h-1.5 w-1.5 mr-1.5 rounded-full bg-green-500"></span>
      완료됨
    </span>
  )
}
