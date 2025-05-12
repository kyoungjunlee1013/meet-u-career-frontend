import { Client, IMessage } from "@stomp/stompjs";

let stompClient: Client | null = null;

// ✅ 소켓 연결 (연결 완료되면 resolve)
export async function connectSocket(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (stompClient && stompClient.connected) {
      return resolve();
    }

    stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws-stomp",
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

// ✅ 채팅방 구독 (서버에서 /topic/chat/{roomId} 로 전송함)
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
    destination: "/app/chat/message", // ✅ 서버의 @MessageMapping("/chat/message") 와 일치시킴
    body: JSON.stringify(payload),
  });
}
