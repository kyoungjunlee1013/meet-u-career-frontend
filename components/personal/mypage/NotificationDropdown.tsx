"use client"

import { X, Bell } from "lucide-react"

export function NotificationDropdown() {
  // Mock notifications data
  const notifications = [
    {
      id: "1",
      title: "지원한 포지션 업데이트",
      description: "ABC 회사의 프론트엔드 개발자 포지션에 서류 합격하셨습니다.",
      time: "10분 전",
      read: false,
    },
    {
      id: "2",
      title: "새로운 메시지",
      description: "XYZ 회사의 채용 담당자가 메시지를 보냈습니다.",
      time: "1시간 전",
      read: false,
    },
    {
      id: "3",
      title: "면접 일정 알림",
      description: "내일 오후 2시 DEF 회사와의 화상 면접이 예정되어 있습니다.",
      time: "3시간 전",
      read: true,
    },
    {
      id: "4",
      title: "새로운 추천 공고",
      description: "회원님의 프로필과 일치하는 5개의 새로운 채용공고가 있습니다.",
      time: "어제",
      read: true,
    },
  ]

  const markAllAsRead = () => {
    // Logic to mark all notifications as read
    console.log("Mark all as read")
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-700">알림</h3>
        <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
          모두 읽음 표시
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Bell className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{notification.description}</p>
                    <p className="mt-1 text-xs text-gray-400">{notification.time}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      aria-label="Dismiss notification"
                    >
                      <span className="sr-only">닫기</span>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">알림이 없습니다.</div>
        )}
      </div>

      <div className="p-3 border-t text-center">
        <a href="/personal/notifications" className="text-sm font-medium text-blue-600 hover:text-blue-800">
          모든 알림 보기
        </a>
      </div>
    </div>
  )
}
