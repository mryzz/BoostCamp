import create from "zustand";
import { persist } from "zustand/middleware"; // Note: Updated import for simplicity
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  uid: string | "";
  email: string | "";
  username: string | "";
  avatar: string | "";
  token: string | "";
}

interface StudentInfo {
  gradeLevel: string;
  interests: string[];
}

interface CoachInfo {
  expertiseAreas: string[];
  yearsOfExperience: number;
}

export interface AuthStore {
  user: User;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setToken: (token: string) => void;
  setLogout: () => void;

  // New properties
  hasJustSignedUp: boolean;
  isInitialSetupComplete: boolean;
  setHasJustSignedUp: (hasJustSignedUp: boolean) => void;
  setIsInitialSetupComplete: (isInitialSetupComplete: boolean) => void;

  // Existing profile management
  profileType: 'student' | 'coach' | '';
  profileInfo: StudentInfo | CoachInfo | {};
  setProfileType: (type: 'student' | 'coach') => void;
  setProfileInfo: (info: StudentInfo | CoachInfo) => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: {
        uid: "",
        email: "",
        username: "",
        avatar: "",
        token: "",
      },
      isLoggedIn: false,
      setUser: (user) => set(() => ({ user })),
      setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
      setLogout: () => set(() => ({ user: { uid: "", email: "", username: "", avatar: "", token: "" }, isLoggedIn: false, hasJustSignedUp: false, isInitialSetupComplete: false })),
      setToken: (token: string) => set((state) => ({ user: { ...state.user, token } })),

      // Initialize new flags
      hasJustSignedUp: false,
      isInitialSetupComplete: false,
      setHasJustSignedUp: (hasJustSignedUp: boolean) => set(() => ({ hasJustSignedUp })),
      setIsInitialSetupComplete: (isInitialSetupComplete: boolean) => set(() => ({ isInitialSetupComplete })),

      // Profile management
      profileType: '',
      profileInfo: {},
      setProfileType: (type) => set(() => ({ profileType: type })),
      setProfileInfo: (info) => set(() => ({ profileInfo: info })),
    }),
    {
      name: "convene-user-store", // Ensure this key is unique
      getStorage: () => AsyncStorage, // Updated to use getStorage which correctly types the AsyncStorage
    }
  )
);