import { create } from "zustand";

interface UserInfo {
  accountId: number;
  profileId: number | null;
  nickname: string;
  email: string;
  role: "PERSONAL" | "BUSINESS" | "ADMIN" | "SUPER";
}

interface UserStoreState {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null }),
}));
