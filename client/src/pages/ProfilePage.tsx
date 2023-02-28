import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const profile = useAuthStore((state) => state.profile);
  return (
    <div>
      <h1>ProfilePage</h1>
      <div>{JSON.stringify(profile)}</div>
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
