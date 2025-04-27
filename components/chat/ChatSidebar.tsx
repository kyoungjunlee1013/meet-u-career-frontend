"use client"

import { Search } from "lucide-react"
import Image from "next/image"

interface ChatItem {
  id: string
  name: string
  company: string
  position: string
  lastMessage: string
  time: string
  avatar: string
  unread: boolean
}

interface ChatSidebarProps {
  selectedChatId: string | null
  onSelectChat: (id: string) => void
}

export function ChatSidebar({ selectedChatId, onSelectChat }: ChatSidebarProps) {
  // Mock chat data
  const chats: ChatItem[] = [
    {
      id: "1",
      name: "(주)사람인HR 채용담당자",
      company: "(주)사람인HR",
      position: "채용담당자",
      lastMessage: "안녕하세요, 포지션에 관심 있으신가요?",
      time: "10분 전",
      avatar: "/mystical-forest-spirit.png",
      unread: false,
    },
    {
      id: "2",
      name: "테크스타트(주) 인사팀",
      company: "테크스타트(주)",
      position: "인사팀",
      lastMessage: "면접 일정 조율 부탁드립니다.",
      time: "1시간 전",
      avatar: "/mystical-forest-spirit.png",
      unread: false,
    },
    {
      id: "3",
      name: "글로벌소프트(주) 면접팀",
      company: "글로벌소프트(주)",
      position: "면접팀",
      lastMessage: "면접 결과를 안내드립니다.",
      time: "3시간 전",
      avatar: "/mystical-forest-spirit.png",
      unread: false,
    },
  ]

  return (
    <div className="w-[365px] border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-bold mb-4">채팅</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="메시지 검색"
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-4 flex items-start cursor-pointer hover:bg-gray-100 ${selectedChatId === chat.id ? "bg-gray-100" : ""
              }`}
          >
            <div className="flex-shrink-0">
              <Image
                src={chat.avatar || "/images/etc/placeholder.svg"}
                alt={chat.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">{chat.time}</p>
              </div>
              <p className="text-sm text-gray-500 truncate mt-1">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
