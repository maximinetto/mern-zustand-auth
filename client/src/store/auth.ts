import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Profile {
  test: string;
  iat: number;
  exp: number;
}

interface State {
  token: string | null;
  profile: Profile | null;
  isLogged: boolean;
}

interface Actions {
  updateToken: (token: string) => void;
  updateProfile: (profile: Profile) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: null,
      profile: null,
      isLogged: false,
      updateToken: (token: string) => {
        set((state) => ({ token, isLogged: true }));
      },
      updateProfile: (profile: Profile) => {
        set((state) => ({ profile }));
      },
      logout: () => {
        set(() => ({
          token: null,
          profile: null,
          isLogged: false,
        }));
      },
    }),
    {
      name: "auth",
    }
  )
);
