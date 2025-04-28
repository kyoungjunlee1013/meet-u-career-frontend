"use client";

import { Check, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ChatMessage = {
  id: string;
  sender: string;
  message: string;
  time: string;
  isRead: boolean;
  avatar: string;
};

// Mock data for chat messages
const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "김지원",
    message: "안녕하세요, 면접 일정 관련해서 문의드립니다.",
    time: "10분 전",
    isRead: false,
    avatar:
      "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    sender: "이현우",
    message: "제출한 이력서 확인 부탁드립니다.",
    time: "30분 전",
    isRead: false,
    avatar:
      "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    sender: "박서연",
    message: "감사합니다. 다음 주에 뵙겠습니다.",
    time: "2시간 전",
    isRead: true,
    avatar:
      "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    sender: "최민준",
    message: "포트폴리오 추가 자료 보내드립니다.",
    time: "어제",
    isRead: true,
    avatar:
      "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=40&width=40",
  },
];

interface ChatDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  messageCount?: number;
}

export const ChatDropdown = ({
  isOpen,
  onClose,
  messageCount = 2,
}: ChatDropdownProps) => {
  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>(mockChatMessages);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMarkAllAsRead = () => {
    setChatMessages(
      chatMessages.map((message) => ({
        ...message,
        isRead: true,
      }))
    );
  };

  const openChatWindow = (chatId?: string) => {
    const url = chatId ? `/chat?id=${chatId}` : "/chat";
    const width = 1075;
    const height = 745;

    // 브라우저 창 기준 가운데 정렬
    const left = window.innerWidth / 2 + window.screenX - width / 2;
    const top = window.innerHeight / 2 + window.screenY - height / 2;

    window.open(
      url,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 overflow-hidden"
    >
      <div className="p-3 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">메시지</h3>
        <button
          onClick={handleMarkAllAsRead}
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
        >
          <Check className="h-3 w-3 mr-1" />
          모두 읽기
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {chatMessages.length > 0 ? (
          <div>
            {chatMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => openChatWindow(message.id)}
                className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  !message.isRead ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <Image
                      src={message.avatar || "/placeholder.svg"}
                      alt={`${message.sender}의 프로필 이미지`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm text-gray-800">
                        {message.sender}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {message.message}
                    </p>
                  </div>
                </div>
                {!message.isRead && (
                  <div className="mt-1 flex justify-end">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            메시지가 없습니다.
          </div>
        )}
      </div>
      <div className="p-2 border-t border-gray-100">
        <button className="w-full p-2 text-sm text-blue-600 hover:bg-gray-50 rounded flex items-center justify-center">
          <button
            onClick={() => openChatWindow()}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            채팅 더보기
          </button>
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
