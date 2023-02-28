import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginRequest, profileRequest } from "../api/auth";
import useIsLogged from "../hooks/useIsLogged";
import { useAuthStore } from "../store/auth";

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
      .map((data) => {
        const { token } = data;
        updateToken(token);
      })
      .map(fetchProfile)
      .mapErr((e) => {
        setError(e.message);
      });
  };

  const fetchProfile = async (): Promise<void> => {
    console.time("profile");
    const response = await profileRequest();
    console.timeEnd("profile");
    response
      .map(({ profile }) => {
        updateProfile(profile);
        navigate("/");
      })
      .mapErr((err) => {
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="me@email.com" />
      <input type="password" placeholder="********" />
      <button>Login</button>
      <p style={{ color: "red" }}>{error}</p>
    </form>
  );
}
