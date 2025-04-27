import { create } from "zustand";
import type { Notification } from "@/types/notification";

interface NotificationState {
    notifications: Notification[];
    isLoaded: boolean;
    setNotifications: (notifications: Notification[]) => void;
    addNotifications: (newNotifications: Notification[]) => void;
    markAsRead: (id: number) => void;
    markAllAsRead: () => void;
    clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    isLoaded: false,

    // 초기 알림 목록 설정
    setNotifications: (notifications) =>
        set({ notifications, isLoaded: true }),

    // 새 알림 추가 (isLoaded true 강제 세팅)
    addNotifications: (newNotifications) =>
        set((state) => ({
            notifications: [...newNotifications, ...state.notifications],
            isLoaded: true, // 수신할 때도 isLoaded true 처리
        })),

    // 특정 알림 읽음 처리
    markAsRead: (id) =>
        set((state) => ({
            notifications: state.notifications.map((n) =>
                n.id === id ? { ...n, isRead: 1 } : n
            ),
        })),

    // 전체 알림 읽음 처리
    markAllAsRead: () =>
        set((state) => ({
            notifications: state.notifications.map((n) => ({
                ...n,
                isRead: 1,
            })),
        })),

    // 알림 초기화
    clearNotifications: () => set({ notifications: [], isLoaded: false }),
}));