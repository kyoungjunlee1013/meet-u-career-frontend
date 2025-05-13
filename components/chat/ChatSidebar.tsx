"use client";

import { useChatRooms } from "@/hooks/useChatRooms";
import { Search } from "lucide-react";
import Image from "next/image";

interface ChatSidebarProps {
  selectedChatId: string | null;
  onSelectChat: (chat: {
    roomId: string;
    name: string;
    avatar: string;
    opponentId: number;
  }) => void;
}

export function ChatSidebar({ selectedChatId, onSelectChat }: ChatSidebarProps) {
  const { chatRooms, loading, error, markRoomAsRead } = useChatRooms();

  const handleSelectChat = (chat: any) => {
    onSelectChat({
      roomId: chat.roomId.toString(),
      name: chat.name,
      avatar: chat.avatar,
      opponentId: chat.opponentId ?? 0, // ✅ 추가: 전달
    });
    markRoomAsRead(chat.roomId);
  };

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
        {loading && (
          <div className="flex items-center justify-center h-full text-gray-500">
            채팅방 불러오는 중...
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-full text-red-500">
            {error}
          </div>
        )}
        {!loading && !error && chatRooms.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500">
            채팅방이 없습니다.
          </div>
        )}
        {!loading &&
          !error &&
          chatRooms.map((chat) => (
            <div
              key={chat.roomId}
              onClick={() => handleSelectChat(chat)}
              className={`p-4 flex items-start cursor-pointer hover:bg-gray-100 ${
                selectedChatId === chat.roomId.toString() ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex-shrink-0 relative">
                <Image
                  src={chat.avatar || "/placeholder.svg"}
                  alt="프로필"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {chat.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {chat.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage}
                </p>
                <p className="text-xs text-gray-400">{chat.lastMessageTime}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
