"use client"

import Image from "next/image"

interface ChatMessage {
  id: string
  sender: {
    name: string
    avatar: string
    company?: string
    position?: string
  }
  preview: string
  time: string
  unread: boolean
}

export function ChatDropdown() {
  // Mock chat messages data
  const chatMessages: ChatMessage[] = [
    {
      id: "1",
      sender: {
        name: "김채용",
        avatar: "/diverse-recruiter-team.png",
        company: "ABC 회사",
        position: "인사 담당자",
      },
      preview: "안녕하세요, 지원해주셔서 감사합니다. 면접 일정을 조율하고 싶습니다.",
      time: "10분 전",
      unread: true,
    },
    {
      id: "2",
      sender: {
        name: "이매니저",
        avatar: "/diverse-team-meeting.png",
        company: "XYZ 회사",
        position: "팀 리더",
      },
      preview: "포트폴리오를 확인했습니다. 추가 질문이 있어 연락드립니다.",
      time: "1시간 전",
      unread: true,
    },
    {
      id: "3",
      sender: {
        name: "박대표",
        avatar: "/diverse-leadership.png",
        company: "스타트업",
        position: "대표",
      },
      preview: "우리 회사에 관심 가져주셔서 감사합니다. 더 자세한 이야기를 나누고 싶습니다.",
      time: "어제",
      unread: false,
    },
  ]

  const markAllAsRead = () => {
    // Logic to mark all chats as read
    console.log("Mark all chats as read")
  }

  const openChatWindow = (chatId?: string) => {
    const url = chatId ? `/chat?id=${chatId}` : "/chat"
    const width = 1075
    const height = 745
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    window.open(url, "_blank", `width=${width},height=${height},left=${left},top=${top}`)
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-700">메시지</h3>
        <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
          모두 읽음 표시
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {chatMessages.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {chatMessages.map((message) => (
              <button
                key={message.id}
                onClick={() => openChatWindow(message.id)}
                className={`block w-full text-left p-4 hover:bg-gray-50 transition-colors ${message.unread ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Image
                      src={message.sender.avatar || "/placeholder.svg"}
                      alt={message.sender.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">{message.sender.name}</p>
                      <p className="text-xs text-gray-500">{message.time}</p>
                    </div>
                    {message.sender.company && (
                      <p className="text-xs text-gray-500">
                        {message.sender.company} {message.sender.position && `· ${message.sender.position}`}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-gray-500 truncate">{message.preview}</p>
                  </div>
                  {message.unread && (
                    <div className="ml-2 flex-shrink-0">
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">메시지가 없습니다.</div>
        )}
      </div>

      <div className="p-3 border-t text-center">
        <button onClick={() => openChatWindow()} className="text-sm font-medium text-blue-600 hover:text-blue-800">
          채팅 더보기
        </button>
      </div>
    </div>
  )
}
