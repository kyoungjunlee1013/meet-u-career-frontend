"use client"

import { ChatSidebar } from "./ChatSidebar"
import { ChatMain } from "./ChatMain"
import { useState } from "react"

export function ChatLayout() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>("1")

  return (
    <div className="flex h-screen bg-white">
      <ChatSidebar selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
      <ChatMain chatId={selectedChatId} />
    </div>
  )
}
