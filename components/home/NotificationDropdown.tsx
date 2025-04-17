import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

const notifications = [
  {
    id: 1,
    title: "지원한 회사에서 메시지가 도착했습니다",
    company: "ABC 주식회사",
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: 2,
    title: "면접 일정이 확정되었습니다",
    company: "테크 솔루션즈",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
  },
  {
    id: 3,
    title: "새로운 채용 공고가 등록되었습니다",
    company: "글로벌 시스템즈",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: 4,
    title: "이력서가 검토되었습니다",
    company: "디지털 미디어",
    time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
  },
]

const NotificationDropdown = () => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-medium text-sm">알림</h3>
        <button className="text-xs text-blue-600 hover:text-blue-800">모두 읽기</button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-6 text-center text-gray-500 text-sm">알림이 없습니다</div>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${
                  notification.read ? "" : "bg-blue-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{notification.company}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(notification.time, {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </p>
                  </div>
                  {!notification.read && <span className="h-2 w-2 bg-blue-500 rounded-full mt-1"></span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default NotificationDropdown
