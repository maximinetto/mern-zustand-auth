import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default function Session({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { isLogged, token, profile, logout } = useAuth();

  useEffect(() => {
    if (token == null && isLogged) {
      logout();
    }
  }, [token, isLogged, logout]);

  useEffect(() => {
    if (profile == null) return logout();

    const isTokenExpired = profile.exp < Date.now() / 1000;
    console.log({ isTokenExpired });
    if (isTokenExpired) {
      logout();
    }
  }, [profile, logout]);

  return <>{children}</>;
}
