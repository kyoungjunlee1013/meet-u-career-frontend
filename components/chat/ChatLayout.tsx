"use client";

import { ChatSidebar } from "./ChatSidebar";
import { ChatMain } from "./ChatMain";
import { useState } from "react";

interface SelectedChat {
  roomId: string;
  name: string;
  avatar: string;
  opponentId: number;
}

export function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);

  return (
    <div className="flex h-screen bg-white">
      <ChatSidebar
        selectedChatId={selectedChat?.roomId || null}
        onSelectChat={setSelectedChat}
      />
      <ChatMain
        chatId={selectedChat?.roomId || null}
        opponentName={selectedChat?.name || ""}
        opponentAvatar={selectedChat?.avatar || ""}
        opponentId={selectedChat?.opponentId ?? 0}  // ✅ undefined 방지
      />
    </div>
  );
}
