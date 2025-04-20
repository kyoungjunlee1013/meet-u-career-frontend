"use client";

import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { fetchMyInfo } from "@/api/fetchMyInfo";

interface Props {
  children: ReactNode;
}

/**
 * PreventActionWrapper
 * - 앱 최초 진입 시 토큰 복구 + 유저 정보 복구
 */
export default function PreventActionWrapper({ children }: Props) {
  const { restoreTokens, isHydrated, accessToken } = useAuthStore();
  const { restoreUserInfo } = useUserStore();

  useEffect(() => {
    restoreTokens();
    restoreUserInfo();
  }, []);

  useEffect(() => {
    if (isHydrated && accessToken) {
      fetchMyInfo(); // 토큰 있으면 /me 재호출해서 진짜 유저 정보 가져오기
    }
  }, [isHydrated, accessToken]);

  const preventAction = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onContextMenu={preventAction} // 우클릭 방지
      onDragStart={preventAction} // 드래그 시작 방지
      className="min-h-screen"
    >
      {children}
    </div>
  );
}