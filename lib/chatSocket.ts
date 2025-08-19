// lib/chatSocket.ts
import { Client, IMessage } from "@stomp/stompjs";
import { useUserStore } from "@/store/useUserStore";
import SockJS from "sockjs-client"; // [ADDED]

let stompClient: Client | null = null;

// [ADDED] 런타임 도메인/프로토콜 기반으로 소켓 URL 자동 결정
// - 로컬(프론트 3000) → 백엔드 8080로 직결
// - 배포(예: http://43.200.182.200) → 같은 호스트의 /ws-stomp (Nginx 프록시 전제)
const getChatSockUrl = () => {
  if (typeof window === "undefined") return "http://localhost:8080/ws-stomp"; // SSR 가드
  const { protocol, hostname, host } = window.location;

  // 로컬 개발 환경
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:8080/ws-stomp";
  }

  // 배포 환경 (예: http://43.200.182.200)
  const scheme = protocol === "https:" ? "https" : "http";
  return `${scheme}://${host}/ws-stomp`;
};

// ✅ 소켓 연결 (연결 완료되면 resolve)
// [CHANGED] accountId를 선택적으로 인자로 받을 수 있게 확장 (기존 호출 방식도 그대로 동작)
export async function connectSocket(accountIdParam?: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (stompClient && stompClient.connected) {
      return resolve();
    }

    // [CHANGED] 스토어 읽기 전에, 인자로 들어온 accountId가 있으면 그걸 우선 사용
    const accountId = accountIdParam ?? useUserStore.getState().userInfo?.accountId;
    if (!accountId) {
      console.error("❌ 사용자 정보 없음 - 소켓 연결 중단");
      return reject("사용자 정보 없음");
    }

    // [CHANGED] 순수 WS(brokerURL) 대신 SockJS 사용 → 프록시/HTTPS/HTTP2 환경에서도 안전
    const sock = new SockJS(getChatSockUrl()); // [ADDED]

    stompClient = new Client({
      webSocketFactory: () => sock, // [CHANGED]
      connectHeaders: {
        accountId: String(accountId),
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("✅ STOMP 연결 완료");
        resolve();
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 오류", frame);
        reject(new Error("STOMP 연결 실패"));
      },
    });

    stompClient.activate();
  });
}

// ✅ 소켓 연결 해제
export function disconnectSocket() {
  stompClient?.deactivate();
}

// ✅ 채팅방 구독 (서버에서 /topic/chat/{roomId} 로 브로드캐스트)
export function subscribeToRoom(roomId: string, callback: (message: IMessage) => void) {
  console.log("📡 구독 시작: /topic/chat/" + roomId);
  return stompClient?.subscribe(`/topic/chat/${roomId}`, callback) ?? null;
}

// ✅ 메시지 전송 (/app/chat/message)
export function sendSocketMessage(roomId: string, payload: any) {
  if (!stompClient || !stompClient.connected) {
    console.error("❌ STOMP 연결 안됨: 메시지 전송 실패");
    return;
  }

  console.log("📤 메시지 전송:", payload);

  stompClient.publish({
    destination: "/app/chat/message", // 서버 @MessageMapping("/chat/message") 와 일치
    body: JSON.stringify(payload),
  });
}
