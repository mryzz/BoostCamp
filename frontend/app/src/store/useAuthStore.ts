import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  uid: string | "";
  email: string | "";
  username: string | "";
  avatar: string | "";
  token: string | "";
}

export interface AuthStore {
  user: User;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setToken: (token: string) => void; 
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set, _) => ({
      user: {
        uid: "",
        email: "",
        username: "",
        avatar: "",
        token: "",
      },
      isLoggedIn: false,
      setUser: (user) => set((state) => ({ user })),
      setIsLoggedIn: (isLoggedIn: boolean) => set((state) => ({ isLoggedIn })),
      setToken: (token: string) => set((state) => ({ user: { ...state.user, token }})),
    }),
    {
      name: "convene-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);