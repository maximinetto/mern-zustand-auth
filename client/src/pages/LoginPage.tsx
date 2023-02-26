import { Navigate, useNavigate } from "react-router-dom";
import { loginRequest, profileRequest } from "../api/auth";
import { useAuthStore } from "../store/auth";

export default function LoginPage() {
  const updateToken = useAuthStore((state) => state.updateToken);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const isLogged = useAuthStore((state) => state.isLogged);
  const navigate = useNavigate();

  if (isLogged) return <Navigate to="/" />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    let data = await loginRequest(email, password);
    const { token } = data;
    updateToken(token);

    const { profile } = await profileRequest();
    updateProfile(profile);
    navigate("/profile");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="me@email.com" />
      <input type="password" placeholder="********" />
      <button>Login</button>
    </form>
  );
}
