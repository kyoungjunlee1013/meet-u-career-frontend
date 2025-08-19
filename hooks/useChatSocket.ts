// lib/chatSocket.ts
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client"; // [ADDED]

let stompClient: Client | null = null;
let connectPromise: Promise<void> | null = null; // [ADDED] 중복 연결 방지

// 런타임 도메인/프로토콜 기반으로 소켓 URL 자동 결정
// - 로컬(프론트 3000) → http://localhost:8080/ws-stomp
// - 배포(예: http://43.200.182.200) → 동일 호스트의 /ws-stomp (Nginx 프록시 전제)
const getChatSockUrl = () => {
  if (typeof window === "undefined") return "http://localhost:8080/ws-stomp"; // SSR 가드
  const { protocol, hostname, host } = window.location;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:8080/ws-stomp";
  }
  const scheme = protocol === "https:" ? "https" : "http";
  return `${scheme}://${host}/ws-stomp`;
};

// ✅ 소켓 연결 (연결 완료되면 resolve)
// accountId를 인자로 받도록 확장 (스토어 의존 제거)
export function connectSocket(accountId?: number): Promise<void> {
  if (stompClient?.connected) return Promise.resolve();
  if (connectPromise) return connectPromise; // [ADDED] 진행 중 연결 재사용

  connectPromise = new Promise((resolve, reject) => {
    if (!accountId) {
      console.error("❌ 사용자 정보 없음 - 소켓 연결 중단");
      connectPromise = null; // [ADDED]
      return reject("사용자 정보 없음");
    }

    const sock = new SockJS(getChatSockUrl()); // [ADDED]
    stompClient = new Client({
      webSocketFactory: () => sock, // [CHANGED] brokerURL → SockJS 사용
      connectHeaders: { accountId: String(accountId) },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("✅ STOMP 연결 완료");
        connectPromise = null; // [ADDED]
        resolve();
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 오류", frame);
        connectPromise = null; // [ADDED]
        reject(new Error("STOMP 연결 실패"));
      },
    });

    stompClient.activate();
  });

  return connectPromise;
}

// ✅ 소켓 연결 해제 (Promise 반환) — 옵션 A
export async function disconnectSocket(): Promise<void> { // [CHANGED] Promise<void>
  if (!stompClient) return;
  try {
    await stompClient.deactivate(); // [CHANGED] STOMP 비동기 종료 대기
  } finally {
    stompClient = null;             // [ADDED] 내부 상태 정리
    connectPromise = null;          // [ADDED]
  }
}

// ✅ 채팅방 구독
export function subscribeToRoom(
  roomId: string,
  callback: (message: IMessage) => void
): StompSubscription | null {
  console.log("📡 구독 시작: /topic/chat/" + roomId);
  return stompClient?.subscribe(`/topic/chat/${roomId}`, callback) ?? null;
}

// ✅ 메시지 전송
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
