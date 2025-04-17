"use client"

import type React from "react"

import { useState } from "react"
import { Paperclip, Send, Smile } from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  text: string
  sender: "user" | "other"
  time: string
}

interface ChatMainProps {
  chatId: string | null
}

export function ChatMain({ chatId }: ChatMainProps) {
  const [newMessage, setNewMessage] = useState("")

  // Mock data for the selected chat
  const selectedChat = {
    id: "1",
    name: "(주)사람인HR 채용담당자",
    company: "(주)사람인HR",
    position: "채용담당자",
    status: "최근 접속: 오늘",
    avatar: "/mystical-forest-spirit.png",
    messages: [
      {
        id: "1",
        text: "안녕하세요, 홍길동님. 지원해주신 포지션에 관심을 가져주셔서 감사합니다. 귀하의 이력서를 검토한 결과, 저희 회사와 잘 맞는 역량을 갖추고 계신 것 같습니다. 다음 단계로 진행하기 위해 인터뷰 일정을 조율하고 싶습니다.",
        sender: "other",
        time: "오전 10:30",
      },
      {
        id: "2",
        text: "네, 안녕하세요. 연락 주셔서 감사합니다. 인터뷰 기회를 주셔서 정말 기쁩니다. 다음 주 화요일부터 목요일 사이에 시간이 가능합니다. 특시 어 기간 중에 가능한 시간이 있으신가요?",
        sender: "user",
        time: "오전 10:32",
      },
      {
        id: "3",
        text: "안녕하세요, 포지션에 관심 있으신가요? 다음 주 수요일 오후 2시에 화상 인터뷰를 진행하면 어떨까요? 약 1시간 정도 소요될 예정입니다. 가능하시다면 회신 부탁드립니다.",
        sender: "other",
        time: "10분 전",
      },
    ],
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Here you would typically send the message to your backend
    console.log("Sending message:", newMessage)

    // Clear the input field
    setNewMessage("")
  }

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">채팅을 선택해주세요</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={selectedChat.avatar || "/placeholder.svg"}
            alt={selectedChat.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="ml-3">
            <h2 className="text-lg font-medium">{selectedChat.name}</h2>
            <p className="text-sm text-gray-500">{selectedChat.status}</p>
          </div>
        </div>
        <div className="text-gray-400">
          <button className="p-2 hover:text-gray-600">
            <span className="sr-only">More options</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="6" r="2" fill="currentColor" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <circle cx="12" cy="18" r="2" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {selectedChat.messages.map((message) => (
          <div key={message.id} className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            {message.sender === "other" && (
              <div className="flex-shrink-0 mr-3">
                <Image
                  src={selectedChat.avatar || "/placeholder.svg"}
                  alt={selectedChat.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === "user" ? "bg-blue-500 text-white" : "bg-white border border-gray-200"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center">
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700" aria-label="Attach file">
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 mx-2 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700" aria-label="Add emoji">
          <Smile className="h-5 w-5" />
        </button>
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}
