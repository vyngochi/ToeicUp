import type { UserProfile } from "@/types/user.types";
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string) => void;
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  setAccessToken: (token) => set({ accessToken: token }),
  login: (token, user) =>
    set({ accessToken: token, user: user, isAuthenticated: true }),
  logout: () => set({ accessToken: null, user: null, isAuthenticated: false }),
}));
