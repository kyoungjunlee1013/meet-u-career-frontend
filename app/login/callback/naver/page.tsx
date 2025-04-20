"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchMyInfo } from "@/api/fetchMyInfo";
import axios, { AxiosError } from "axios";

export default function NaverCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    const state = searchParams.get("state"); // ✅ 네이버는 state 필수
    const { setTokens } = useAuthStore();

    useEffect(() => {
        const handleNaverLogin = async () => {
            if (!code || !state) {
                router.replace("/login");
                return;
            }

            try {
                const response = await axios.get(`/api/personal/auth/naver/callback?code=${code}&state=${state}`);
                const { accessToken, refreshToken } = response.data.data;

                setTokens(accessToken, refreshToken);
                await fetchMyInfo();

                router.replace("/");
            } catch (error) {
                const err = error as AxiosError;
                console.error("네이버 로그인 실패", err);
                router.replace("/login");
            }
        };

        handleNaverLogin();
    }, [code, state, router, setTokens]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
