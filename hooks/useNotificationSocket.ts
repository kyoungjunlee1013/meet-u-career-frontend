import { useNotificationStore } from "@/store/useNotificationStore";
import { useUserStore } from "@/store/useUserStore";
import { Client, StompSubscription } from "@stomp/stompjs"; // [ADDED]
import SockJS from "sockjs-client";
import { useEffect } from "react";

// [CHANGED] 동적 URL (로컬/배포 자동 분기, IP/도메인 모두 대응)
const getSocketUrl = () => {
  if (typeof window === "undefined") return "http://localhost:8080/ws/notification";
  const { protocol, hostname, host } = window.location;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:8080/ws/notification";
  }
  const scheme = protocol === "https:" ? "https" : "http";
  return `${scheme}://${host}/ws/notification`;
};

export const useNotificationSocket = () => {
  const { userInfo } = useUserStore();
  const { addNotifications } = useNotificationStore();

  useEffect(() => {
    // [CHANGED] accountId 없으면 연결 금지
    if (!userInfo?.accountId) return;

    const SOCKET_URL = getSocketUrl();
    const socket = new SockJS(SOCKET_URL);
    let sub: StompSubscription | null = null; // [ADDED]

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      connectHeaders: { accountId: String(userInfo.accountId) }, // [ADDED]
      onConnect: () => {
        console.log("🟢 Notification SockJS 연결 성공");
        sub = client.subscribe(
          `/topic/notification/${userInfo.accountId}`,
          (message) => {
            try {
              const body = JSON.parse(message.body);
              addNotifications([
                {
                  id: body.id ?? Date.now(), // [CHANGED] 서버 id 있으면 사용
                  message: body.message,
                  isRead: 0,
                  createdAt: body.createdAt,
                  notificationType: body.notificationType,
                },
              ]);
            } catch (error) {
              console.error("메시지 파싱 에러:", error);
            }
          }
        );
      },
      onStompError: (frame) => {
        console.error("STOMP 오류:", frame);
      },
      onWebSocketClose: (evt) => {                    // [ADDED] 진단용 로그
        console.warn("🔌 Notification 소켓 종료", evt?.reason || evt);
      },
    });

    client.activate();

    return () => {
      try { sub?.unsubscribe(); } catch {}            // [ADDED] 구독 해제
      void client.deactivate().catch(() => {});       // [ADDED] 안전 종료
    };
  }, [userInfo?.accountId, addNotifications]); // [CHANGED] accountId만 의존
};
