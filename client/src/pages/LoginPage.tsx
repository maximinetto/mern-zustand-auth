import { ok } from "neverthrow";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginRequest, profileRequest } from "../api/auth";
import useIsLogged from "../hooks/useIsLogged";
import { useAuthStore } from "../store/auth";
import styles from "./LoginPage.module.css";

export default function LoginPage(): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const isLogged = useIsLogged();
  const updateToken = useAuthStore((state) => state.updateToken);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const navigate = useNavigate();

  console.log({ isLogged });
  if (isLogged) return <Navigate to="/" />;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    const response = await loginRequest(email, password);
    response
      .andThen((data) => {
        const { token } = data;
        updateToken(token);
        return ok(true);
      })
      .map(fetchProfile)
      .mapErr((e) => {
        setError(e.message);
      });
  };

  const fetchProfile = async (): Promise<void> => {
    const response = await profileRequest();
    response
      .andThen(({ profile }) => {
        updateProfile(profile);
        navigate("/");
        return ok(true);
      })
      .mapErr((err) => {
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email: </label>
      <input id="email" name="email" type="email" placeholder="me@email.com" />
      <label htmlFor="password">Password: </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="********"
      />
      <div className={styles.center}>
        <button type="submit">Login</button>
        <p className={styles.error}>{error}</p>
      </div>
    </form>
  );
}
