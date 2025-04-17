interface LoginHistoryItemProps {
  browser: string
  os: string
  location: string
  date: string
  isCurrentSession: boolean
}

export default function LoginHistoryItem({ browser, os, location, date, isCurrentSession }: LoginHistoryItemProps) {
  return (
    <div className="flex justify-between text-sm">
      <div>
        <p className="font-medium">
          {browser} / {os}
        </p>
        <p className="text-gray-500">{location}</p>
      </div>
      <div className="text-right">
        <p className="text-gray-500">{date}</p>
        {isCurrentSession && <p className="text-green-600">현재 세션</p>}
      </div>
    </div>
  )
}
