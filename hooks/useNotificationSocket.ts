import { useNotificationStore } from "@/store/useNotificationStore";
import { useUserStore } from "@/store/useUserStore";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect } from "react";

// 소켓 연결 URL 분기 처리
const getSocketUrl = () => {
    if (typeof window !== "undefined") {
        const hostname = window.location.hostname;
        if (hostname === "localhost") {
            return "http://localhost:8080/ws/notification"; // 로컬 개발용
        } else {
            return "https://meet-u-career.com/ws/notification"; // 배포 도메인 주소
        }
    }
    return "";
};

export const useNotificationSocket = () => {
    const { userInfo } = useUserStore();
    const { addNotifications } = useNotificationStore();

    useEffect(() => {
        if (!userInfo) return;

        const SOCKET_URL = getSocketUrl();
        const socket = new SockJS(SOCKET_URL);

        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("🟢 WebSocket 연결 성공 (SockJS)");

                client.subscribe(`/topic/notification/${userInfo.accountId}`, (message) => {
                    try {
                        // console.log("수신된 메시지:", message.body);

                        const body = JSON.parse(message.body);

                        addNotifications([
                            {
                                id: Date.now(), // 임시 ID
                                message: body.message,
                                isRead: 0,
                                createdAt: body.createdAt,
                                notificationType: body.notificationType,
                            },
                        ]);
                    } catch (error) {
                        console.error("메시지 파싱 에러:", error);
                    }
                });
            },
            onStompError: (frame) => {
                console.error("Broker reported error:", frame);
            },
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [userInfo, addNotifications]);
};