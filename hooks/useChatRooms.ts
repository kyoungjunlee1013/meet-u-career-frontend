"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";

interface ChatRoom {
  roomId: number;
  name: string;                // 상대방 이름
  avatar: string;              // 상대방 프로필 이미지
  lastMessage: string;         // 마지막 메시지
  lastMessageTime: string;     // 포맷된 시간
  unreadCount: number;
}


export function useChatRooms() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await apiClient.get<{ data: ChatRoom[] }>(
          "/api/chat/rooms"
        );
        setChatRooms(response.data.data);
      } catch (err) {
        console.error("❌ 채팅방 리스트 가져오기 실패", err);
        setError("채팅방을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  /**
   * ✅ 읽음 처리 (서버에 요청 + 상태 반영)
   */
  const markRoomAsRead = async (roomId: number) => {
    try {
      await apiClient.post(`/api/chat/rooms/${roomId}/read`);
      setChatRooms((prev) =>
        prev.map((room) =>
          room.roomId === roomId ? { ...room, unreadCount: 0 } : room
        )
      );
      console.log(`✅ 채팅방 ${roomId} 읽음 처리 완료`);
    } catch (error) {
      console.error("❌ 채팅방 읽음 처리 실패", error);
    }
  };

  return {
    chatRooms,
    loading,
    error,
    markRoomAsRead,
  };
}
