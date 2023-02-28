import type { Profile } from "../store/auth";
import { useAuthStore } from "../store/auth";
import useIsLogged from "./useIsLogged";

export default function useAuth(): {
  token: string | null;
  isLogged: boolean;
  profile: Profile | null;
  logout: () => void;
} {
  const { token, profile, logout } = useAuthStore(
    ({ token, profile, logout }) => ({
      token,

      logout,
      profile,
    })
  );

  const isLogged = useIsLogged();

  return {
    token,
    profile,
    logout,
    isLogged,
  };
}
