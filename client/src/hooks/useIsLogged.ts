import { useAuthStore } from "../store/auth";

export default function useIsLogged(): boolean {
  const isLogged = useAuthStore((state) => state.isLogged);

  return isLogged;
}
