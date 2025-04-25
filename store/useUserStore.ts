import { create } from "zustand"
import { PersonalMyPageInfo } from "@/types/personal"

interface UserStoreState {
  userInfo: PersonalMyPageInfo | null
  isUserInfoHydrated: boolean
  isLocalhost: boolean
  setUserInfo: (userInfo: PersonalMyPageInfo) => void
  clearUserInfo: () => void
  restoreUserInfo: () => void
}

const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost"

export const useUserStore = create<UserStoreState>((set) => ({
  userInfo: null,
  isUserInfoHydrated: false,
  isLocalhost,

  setUserInfo: (userInfo) => set({ userInfo, isUserInfoHydrated: true }),
  clearUserInfo: () => set({ userInfo: null, isUserInfoHydrated: true }),

  restoreUserInfo: () => {
    let userInfo = null
    if (isLocalhost) {
      const saved = sessionStorage.getItem("userInfo")
      if (saved) {
        userInfo = JSON.parse(saved)
      }
    }
    set({ userInfo, isUserInfoHydrated: true })
  },
}))
