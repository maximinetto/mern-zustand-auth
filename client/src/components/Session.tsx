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
    if (profile == null) {
      logout();
      return;
    }
    function validate(): void {
      if (profile == null) {
        logout();
        return;
      }

      const { exp } = profile;
      const isTokenExpired = exp * 1000 < Date.now();
      console.log({ isTokenExpired, exp: new Date(exp * 1000) });
      if (isTokenExpired) {
        logout();
      }
    }

    validate();
    const diff = profile.exp * 1000 - Date.now();
    let timeoutId: NodeJS.Timeout | undefined;
    console.log({ diff });
    if (diff > 0) {
      timeoutId = setTimeout(validate, diff);
    }

    return () => {
      timeoutId != null && clearTimeout(timeoutId);
    };
  }, [profile, logout]);

  return <>{children}</>;
}
