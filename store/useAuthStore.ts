import { create } from "zustand";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";

/**
 * 인증 상태를 관리하는 Zustand store
 */
interface AuthState {
  accessToken: string | null; // 현재 저장된 AccessToken
  refreshToken: string | null; // 현재 저장된 RefreshToken
  setTokens: (accessToken: string, refreshToken: string) => void; // AccessToken과 RefreshToken을 저장
  setAccessToken: (accessToken: string) => void; // AccessToken만 따로 저장
  clearTokens: () => void; // 저장된 토큰 모두 삭제
  restoreTokensFromCookies: () => void; // 쿠키에 저장된 토큰 복구
  logoutWithAlert: () => void; // 세션 만료 시 로그아웃 + 알림
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,

  /**
   * AccessToken과 RefreshToken을 저장하고, 쿠키에도 함께 저장
   */
  setTokens: (accessToken, refreshToken) => {
    Cookies.set("accessToken", accessToken, { path: "/" });
    Cookies.set("refreshToken", refreshToken, { path: "/" });
    set({ accessToken, refreshToken });
  },

  /**
   * AccessToken만 별도로 갱신하고, 쿠키에도 저장
   */
  setAccessToken: (accessToken) => {
    Cookies.set("accessToken", accessToken, { path: "/" });
    set((state) => ({ ...state, accessToken }));
  },

  /**
   * 저장된 AccessToken, RefreshToken을 삭제 (쿠키와 상태 모두)
   */
  clearTokens: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({ accessToken: null, refreshToken: null });
  },

  /**
   * 앱 첫 로딩 시, 쿠키에서 토큰 복구
   */
  restoreTokensFromCookies: () => {
    const accessToken = Cookies.get("accessToken") || null;
    const refreshToken = Cookies.get("refreshToken") || null;
    set({ accessToken, refreshToken });
  },

  /**
   * 세션 만료 시 자동 로그아웃 + 알림 띄우기
   */
  logoutWithAlert: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({ accessToken: null, refreshToken: null });

    toast({
      title: "세션 만료",
      description: "로그인 세션이 만료되었습니다. 다시 로그인 해주세요.",
      variant: "destructive", // 또는 warning 스타일 가능
    });

    setTimeout(() => {
      window.location.href = "/login"; // 1~2초 후 로그인 페이지 이동
    }, 1500);
  },
}));
