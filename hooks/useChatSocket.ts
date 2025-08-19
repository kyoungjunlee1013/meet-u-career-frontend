// hooks/useChatSocket.ts
"use client";

import { useEffect, useState } from "react";
import {
  connectSocket,
  disconnectSocket,
  subscribeToRoom,
  sendSocketMessage,
} from "@/lib/chatSocket";
import { apiClient } from "@/api/apiClient";
import { IMessage, StompSubscription } from "@stomp/stompjs";
import { useUserStore } from "@/store/useUserStore";

export interface ChatMessage {
  chatRoomId: string;
  senderId: number;
  senderName: string;
  message: string;
  isRead: number;
  type: string;      // "TALK" | "FILE" 등
  senderType: number;
  createdAt?: string;
}

export function useChatSocket(roomId: string | null): {
  connected: boolean;
  messages: ChatMessage[];
  sendMessage: (payload: ChatMessage) => void;
} {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { userInfo } = useUserStore();

  useEffect(() => {
    if (!roomId || !userInfo?.accountId) return;

    const ac = new AbortController();
    let sub: StompSubscription | null = null;
    let unmounted = false;

    const run = async () => {
      try {
        // 초기 메시지
        const res = await apiClient.get(`/api/chat/rooms/${roomId}/messages`, {
          signal: ac.signal as any,
        });
        if (!unmounted) setMessages(res.data?.data ?? []);

        // 소켓 연결
        await connectSocket(userInfo.accountId);
        if (!unmounted) setConnected(true);

        // 구독
        sub = subscribeToRoom(roomId, (m: IMessage) => {
          try {
            const body = JSON.parse(m.body) as ChatMessage;
            setMessages((prev) => [...prev, body]);
          } catch (e) {
            console.error("메시지 파싱 실패", e);
          }
        });
      } catch (e: any) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;
        console.error("소켓 연결 또는 메시지 불러오기 실패", e);
      }
    };

    void run();

    return () => {
      // 안전한 클린업
      unmounted = true;
      try { ac.abort(); } catch {}
      try { sub?.unsubscribe(); } catch {}
      void disconnectSocket().catch(() => {}); // Promise 기반 종료
      setConnected(false);
    };
  }, [roomId, userInfo?.accountId]);

  const sendMessage = (payload: ChatMessage) => {
    if (connected && roomId) {
      sendSocketMessage(roomId, payload);
    } else {
      console.warn("메시지 전송 시도 시 연결되지 않음 또는 roomId 없음");
    }
  };

  return { connected, messages, sendMessage };
}
