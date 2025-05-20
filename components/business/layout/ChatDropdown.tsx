"use client";

import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";
import { useChatRooms } from "@/hooks/useChatRooms";

export function ChatDropdown() {
  const { chatRooms, markRoomAsRead } = useChatRooms();

  const markAllAsRead = () => {
    chatRooms.forEach((room) => {
      if (room.unreadCount > 0) {
        markRoomAsRead(room.roomId);
      }
    });
  };

  const openChatWindow = (chatId?: number) => {
    const url = chatId ? `/chat?id=${chatId}` : "/chat";
    const width = 1075;
    const height = 745;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      url,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-700">메시지</h3>
        <button
          onClick={markAllAsRead}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          모두 읽음 표시
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {chatRooms.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {chatRooms.map((room) => (
              <button
                key={room.roomId}
                onClick={() => {
                  markRoomAsRead(room.roomId);
                  openChatWindow(room.roomId);
                }}
                className={`block w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  room.unreadCount > 0 ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        room.avatar ||
                        "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg"
                      }
                      alt={room.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {room.name}
                      </p>
                      <p className="text-xs text-gray-500">{room.lastMessageTime}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 truncate">
                      {room.lastMessage}
                    </p>
                  </div>
                  {room.unreadCount > 0 && (
                    <div className="ml-2 flex-shrink-0">
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            메시지가 없습니다.
          </div>
        )}
      </div>

      <div className="p-3 border-t text-center">
        <button
          onClick={() => openChatWindow()}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          채팅 더보기
          <ChevronRight className="h-4 w-4 ml-1 inline" />
        </button>
      </div>
    </div>
  );
}
