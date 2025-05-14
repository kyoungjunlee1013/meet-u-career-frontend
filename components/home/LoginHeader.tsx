"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, MessageSquare, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { useUserStore } from "@/store/useUserStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useSearchStore } from "@/hooks/useSearchStore";
import { ChatDropdown } from "@/components/personal/mypage/ChatDropdown";
import { useChatRooms } from "@/hooks/useChatRooms";

export const LoginHeader = () => {
  const router = useRouter();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { userInfo } = useUserStore(); // 내 정보
  const { notifications, isLoaded } = useNotificationStore();
  const hasUnreadNotification =
    isLoaded && notifications.some((n) => n.isRead === 0);

  const { chatRooms } = useChatRooms();
  const unreadChatCount = chatRooms.reduce(
    (acc, room) => acc + room.unreadCount,
    0
  );

  const notificationRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState<string>("");
  const { setStoreKeyword } = useSearchStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (search.trim() !== "") {
        setStoreKeyword(search);
        router.push(`/personal/jobs`);
      }
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
    }

    if (notificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationOpen]);

  const toggleNotification = () => {
    setNotificationOpen((prev) => !prev);
    setChatOpen(false);
    setProfileOpen(false);
  };

  const toggleChat = () => {
    setChatOpen((prev) => !prev);
    setNotificationOpen(false);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
    setNotificationOpen(false);
    setChatOpen(false);
  };

  return (
    <header className="border-b py-2.5 bg-white sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-blue-600 font-bold text-2xl">
            <Image
              src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/logo/logo6.png"
              alt="로고"
              width={120}
              height={35}
              priority
            />
          </Link>
          <div className="relative flex items-center w-80">
            <Search className="absolute left-4 w-5 h-5 text-blue-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-12 pr-4 py-2 w-full text-sm font-semibold border border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* 알림 */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={toggleNotification}
              className="relative p-1 rounded-full hover:bg-gray-100"
              aria-label="알림"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {hasUnreadNotification && (
                <span className="absolute -top-0.5 -right-0.5 block h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>
            {notificationOpen && <NotificationDropdown />}
          </div>

          {/* 채팅 */}
          <div className="relative" ref={chatRef}>
            <button
              onClick={toggleChat}
              className="relative p-1 rounded-full hover:bg-gray-100"
              aria-label="채팅"
            >
              <MessageSquare className="h-5 w-5 text-gray-600" />
              {unreadChatCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadChatCount > 9 ? "9+" : unreadChatCount}
                </span>
              )}
            </button>
            {chatOpen && <ChatDropdown />}
          </div>

          {/* 프로필 */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={toggleProfile}
              className="flex items-center gap-1 hover:bg-gray-100 rounded-full p-1"
            >
              <div className="relative h-7 w-7 rounded-full overflow-hidden">
                <Image
                  src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=40&width=40"
                  alt="프로필 이미지"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium hidden sm:inline">
                {userInfo?.name || "게스트"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            {profileOpen && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </header>
  );
};
