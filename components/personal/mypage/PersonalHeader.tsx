"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationDropdown } from "./NotificationDropdown";
import { ChatDropdown } from "@/components/personal/mypage/ChatDropdown";
import { ProfileDropdown } from "./ProfileDropdown";
import { useSidebar } from "./SidebarProvider";
import { useNotificationStore } from "@/store/useNotificationStore";
import { apiClient } from "@/api/apiClient";

export function PersonalHeader() {
  const { toggleSidebar } = useSidebar();
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const { notifications, isLoaded, setNotifications } = useNotificationStore();
  const hasUnreadNotification =
    isLoaded && notifications.some((n) => n.isRead === 0);

  const notificationRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // 헤더 마운트 시 알림 미리 불러오기
  useEffect(() => {
    if (!isLoaded) {
      (async () => {
        try {
          const res = await apiClient.get("/api/notification/list");
          setNotifications(res.data.data || []);
        } catch (error) {
          console.error("알림 미리 불러오기 실패:", error);
        }
      })();
    }
  }, [isLoaded, setNotifications]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isNotificationOpen &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
      if (
        isChatOpen &&
        chatRef.current &&
        !chatRef.current.contains(event.target as Node)
      ) {
        setIsChatOpen(false);
      }
      if (
        isProfileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    if (isNotificationOpen || isChatOpen || isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen, isChatOpen, isProfileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-30">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold text-blue-600">meet</span>
            <span className="text-lg font-bold text-blue-600">Ü</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full w-9 h-9 hover:bg-transparent"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px] text-gray-700" />
              {hasUnreadNotification && (
                <span className="absolute -top-0.5 -right-0.5 block h-2 w-2 rounded-full bg-red-500" />
              )}
            </Button>
            {isNotificationOpen && <NotificationDropdown />}
          </div>

          <div className="relative" ref={chatRef}>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full w-9 h-9 hover:bg-transparent"
              onClick={() => setIsChatOpen(!isChatOpen)}
              aria-label="Messages"
            >
              <MessageSquare className="h-[18px] w-[18px] text-gray-700" />
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium">
                2
              </span>
            </Button>
            {isChatOpen && <ChatDropdown />}
          </div>

          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              size="icon"
              className="p-0 rounded-full w-9 h-9 hover:bg-transparent"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden" />
            </Button>
            {isProfileOpen && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </header>
  );
}
