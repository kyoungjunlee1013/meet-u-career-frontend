import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * axios 인스턴스 생성
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // http://localhost:8080
  withCredentials: true, // 요청마다 쿠키도 함께 보내기
});

/**
 * 요청 인터셉터
 * - 요청마다 accessToken 자동 삽입
 */
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

/**
 * 응답 인터셉터
 * - 401 에러 발생 시 자동으로 AccessToken 재발급 시도
 * - 실패하면 강제 로그아웃 처리
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setAccessToken, logoutWithAlert } =
      useAuthStore.getState();

    // 401 에러 + 재시도한 적 없는 경우만
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        // RefreshToken으로 AccessToken 재발급
        const res = await axios.get("/api/auth/refresh", {
          withCredentials: true,
        });
        const newAccessToken = res.data.data.accessToken;

        // 새 AccessToken Zustand + 쿠키에 저장
        setAccessToken(newAccessToken);

        // 실패했던 원래 요청에 새 토큰 넣고 재요청
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("RefreshToken 재발급 실패", refreshError);

        // ❌ RefreshToken도 만료 → 강제 로그아웃
        logoutWithAlert();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
