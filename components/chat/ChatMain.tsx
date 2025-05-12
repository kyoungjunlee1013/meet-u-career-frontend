"use client";

import { useEffect, useState } from "react";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import { Paperclip, Send, Smile } from "lucide-react";

interface ChatMainProps {
  chatId: string | null;
  opponentName: string;
  opponentAvatar: string;
}

export function ChatMain({ chatId, opponentName, opponentAvatar }: ChatMainProps) {
  const { userInfo } = useUserStore();
  const { messages, connected, sendMessage } = useChatSocket(chatId);
  const [newMessage, setNewMessage] = useState("");

  if (!userInfo) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">사용자 정보가 없습니다.</p>
      </div>
    );
  }

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">채팅을 선택해주세요</p>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    sendMessage({
      chatRoomId: chatId,
      senderId: userInfo.accountId,
      senderName: userInfo.name,
      senderType: 0,
      message: newMessage,
      type: "TALK",
      isRead: 0,
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full flex-1">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={opponentAvatar || "/placeholder.svg"}
            alt="상대 프로필"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="ml-3">
            <h2 className="text-lg font-medium">{opponentName}</h2>
            <p className="text-sm text-gray-500">{connected ? "온라인" : "오프라인"}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.senderId === userInfo.accountId ? "justify-end" : "justify-start"
            }`}
          >
            {message.senderId !== userInfo.accountId && (
              <div className="flex-shrink-0 mr-3">
                <Image
                  src={opponentAvatar || "/placeholder.svg"}
                  alt="상대 프로필"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === userInfo.accountId
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              <p className="text-sm">{message.message}</p>
              {message.senderId === userInfo.accountId && (
                <p className="text-xs mt-1 text-right">
                  {message.isRead === 1 ? "읽음" : "전송됨"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-200 flex items-center"
      >
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 mx-2 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
          <Smile className="h-5 w-5" />
        </button>
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
