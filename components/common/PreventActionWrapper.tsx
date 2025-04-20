"use client";

import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

interface PreventActionWrapperProps {
  children: ReactNode;
}

/**
 * PreventActionWrapper
 * - 우클릭, 드래그 방지
 * - 앱 최초 진입 시 쿠키에서 토큰 복구
 */
export default function PreventActionWrapper({
  children,
}: PreventActionWrapperProps) {
  const { restoreTokensFromCookies } = useAuthStore();

  useEffect(() => {
    restoreTokensFromCookies(); // 앱 최초 진입 시 토큰 복구
  }, []);

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
