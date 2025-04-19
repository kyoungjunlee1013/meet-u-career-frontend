"use client";

import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";

const ProfileDropdown = () => {
  const router = useRouter();
  const { clearTokens } = useAuthStore();
  const { clearUserInfo } = useUserStore();

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청 (refreshToken 삭제)
      await axios.post("/api/personal/auth/logout", {}, { withCredentials: true });

      // 클라이언트에 저장된 토큰, 유저정보 삭제
      clearTokens();
      clearUserInfo();

      // 로그인 페이지로 이동
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 실패", error);

      // 강제 클리어 후 이동
      clearTokens();
      clearUserInfo();
      router.push("/login");
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
      <ul>
        <li>
          <Link
            href="/personal/mypage"
            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            <User className="h-4 w-4 text-gray-500" />
            <span>마이페이지</span>
          </Link>
        </li>
        <li className="border-t">
          <button
            type="button"
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 text-gray-500" />
            <span>로그아웃</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
