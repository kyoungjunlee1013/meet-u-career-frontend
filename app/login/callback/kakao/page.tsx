"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchMyInfo } from "@/api/fetchMyInfo";
import { apiClient } from "@/api/apiClient";

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { setTokens } = useAuthStore();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      if (!code) {
        router.replace("/login");
        return;
      }

      try {
        const response = await apiClient.get(
          `/api/personal/auth/kakao/callback?code=${code}`
        );
        const { accessToken, refreshToken } = response.data.data;

        setTokens(accessToken, refreshToken);
        await fetchMyInfo();

        router.replace("/");
      } catch (error) {
        console.error("카카오 로그인 실패", error);
        router.replace("/login");
      }
    };

    handleKakaoLogin();
  }, [code, router, setTokens]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
