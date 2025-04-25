import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";

const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";

/**
 * 내 정보 가져오기
 */
export const fetchMyInfo = async () => {
    const { accessToken, clearTokens } = useAuthStore.getState();
    const { setUserInfo, clearUserInfo } = useUserStore.getState();

    try {
        const response = await axios.get("/api/personal/me", {
            headers: isLocalhost && accessToken
                ? { Authorization: `Bearer ${accessToken}` }
                : undefined,
            withCredentials: !isLocalhost,
        });

        const userData = response.data.data;
        setUserInfo(userData);
    } catch (error) {
        console.error("/me 불러오기 실패", error);
        clearTokens();
        clearUserInfo();
    }
};