"use client"

import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Notification = {
  id: string
  title: string
  message: string
  time: string
  isRead: boolean
}

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "지원자 알림",
    message: "새로운 지원자가 '프론트엔드 개발자' 포지션에 지원했습니다.",
    time: "10분 전",
    isRead: false,
  },
  {
    id: "2",
    title: "면접 일정",
    message: "내일 오후 2시에 '김지원' 님과의 면접이 예정되어 있습니다.",
    time: "1시간 전",
    isRead: false,
  },
  {
    id: "3",
    title: "공고 마감",
    message: "'백엔드 개발자' 공고가 3일 후 마감됩니다.",
    time: "3시간 전",
    isRead: true,
  },
  {
    id: "4",
    title: "시스템 알림",
    message: "기업 정보가 성공적으로 업데이트되었습니다.",
    time: "어제",
    isRead: true,
  },
]

interface NotificationDropdownProps {
  isOpen: boolean
  onClose: () => void
  notificationCount?: number
}

export const NotificationDropdown = ({ isOpen, onClose, notificationCount = 2 }: NotificationDropdownProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    )
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div ref={dropdownRef} className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 overflow-hidden">
      <div className="p-3 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">알림</h3>
        <button onClick={handleMarkAllAsRead} className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
          <Check className="h-3 w-3 mr-1" />
          모두 읽기
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          <div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  !notification.isRead ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium text-sm text-gray-800">{notification.title}</span>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                {!notification.isRead && (
                  <div className="mt-1 flex justify-end">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">알림이 없습니다.</div>
        )}
      </div>
    </div>
  )
}
