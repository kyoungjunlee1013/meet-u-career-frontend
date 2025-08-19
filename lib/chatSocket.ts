// lib/chatSocket.ts
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient: Client | null = null;
let connectPromise: Promise<void> | null = null; // 중복 연결 방지

// 런타임 도메인/프로토콜 기반으로 소켓 URL 자동 결정
// - 로컬: http://localhost:8080/ws-stomp
// - 배포: (현재 호스트)/ws-stomp  (Nginx 프록시 전제)
const getChatSockUrl = () => {
  if (typeof window === "undefined") return "http://localhost:8080/ws-stomp";
  const { protocol, hostname, host } = window.location;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:8080/ws-stomp";
  }
  const scheme = protocol === "https:" ? "https" : "http";
  return `${scheme}://${host}/ws-stomp`;
};

// 연결 (accountId를 인자로 받음)
export function connectSocket(accountId?: number): Promise<void> {
  if (stompClient?.connected) return Promise.resolve();
  if (connectPromise) return connectPromise;

  connectPromise = new Promise((resolve, reject) => {
    if (!accountId) {
      console.error("❌ 사용자 정보 없음 - 소켓 연결 중단");
      connectPromise = null;
      return reject("사용자 정보 없음");
    }

    const sock = new SockJS(getChatSockUrl());
    stompClient = new Client({
      webSocketFactory: () => sock,        // brokerURL 대신 SockJS
      connectHeaders: { accountId: String(accountId) },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("✅ STOMP 연결 완료");
        connectPromise = null;
        resolve();
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 오류", frame);
        connectPromise = null;
        reject(new Error("STOMP 연결 실패"));
      },
    });

    stompClient.activate();
  });

  return connectPromise;
}

// 해제 (Promise 반환 — cleanup에서 .catch 사용 가능)
export async function disconnectSocket(): Promise<void> {
  if (!stompClient) return;
  try {
    await stompClient.deactivate(); // 비동기 종료 대기
  } finally {
    stompClient = null;
    connectPromise = null;
  }
}

// 채팅방 구독
export function subscribeToRoom(
  roomId: string,
  callback: (message: IMessage) => void
): StompSubscription | null {
  console.log("📡 구독 시작: /topic/chat/" + roomId);
  return stompClient?.subscribe(`/topic/chat/${roomId}`, callback) ?? null;
}

// 송신
export function sendSocketMessage(roomId: string, payload: any) {
  if (!stompClient || !stompClient.connected) {
    console.error("❌ STOMP 연결 안됨: 메시지 전송 실패");
    return;
  }
  stompClient.publish({
    destination: "/app/chat/message",
    body: JSON.stringify(payload),
  });
}
