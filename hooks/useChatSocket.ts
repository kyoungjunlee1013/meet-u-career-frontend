"use client";

import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket, subscribeToRoom, sendSocketMessage } from "@/lib/chatSocket";
import { apiClient } from "@/api/apiClient";
import { IMessage } from "@stomp/stompjs";

interface ChatMessage {
  chatRoomId: string; 
  senderId: number;
  senderName: string;
  message: string;
  isRead: number;
  type: string;
  senderType: number;
  createdAt?: string;
}

export function useChatSocket(roomId: string | null) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const connectAndSubscribe = async () => {
      try {
        // ✅ 초기 메시지 불러오기
        const res = await apiClient.get(`/api/chat/rooms/${roomId}/messages`);
        setMessages(res.data.data);

        // ✅ WebSocket 연결
        await connectSocket();
        setConnected(true);

        // ✅ 실시간 메시지 구독
        subscribeToRoom(roomId, (message: IMessage) => {
          const body = JSON.parse(message.body);
          setMessages((prev) => [...prev, body]);
        });
      } catch (error) {
        console.error("소켓 연결 또는 메시지 불러오기 실패", error);
      }
    };

    connectAndSubscribe();

    return () => {
      disconnectSocket();
      setConnected(false);
    };
  }, [roomId]);

  const sendMessage = (payload: ChatMessage) => {
    if (connected && roomId) {
      sendSocketMessage(roomId, payload);
    }
  };

  return { connected, messages, sendMessage };
}
