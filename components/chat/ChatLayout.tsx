"use client";

import { ChatSidebar } from "./ChatSidebar";
import { ChatMain } from "./ChatMain";
import { useState } from "react";

interface SelectedChat {
  roomId: string;
  name: string;
  avatar: string;
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
      />
    </div>
  );
}
