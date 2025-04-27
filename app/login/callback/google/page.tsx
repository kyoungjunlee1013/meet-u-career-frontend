"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchMyInfo } from "@/api/fetchMyInfo";
import axios, { AxiosError } from "axios";

export default function GoogleCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    const { setTokens } = useAuthStore();

    useEffect(() => {
        const handleGoogleLogin = async () => {
            if (!code) {
                router.replace("/login");
                return;
            }

            try {
                const response = await axios.post("/api/personal/auth/google/callback", { idToken: code });
                const { accessToken, refreshToken } = response.data.data;

                setTokens(accessToken, refreshToken);
                await fetchMyInfo();

                router.replace("/");
            } catch (error) {
                const err = error as AxiosError;
                console.error("구글 로그인 실패", err);
                router.replace("/login");
            }
        };

        handleGoogleLogin();
    }, [code, router, setTokens]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-12 h-12 border-4 border-red-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
