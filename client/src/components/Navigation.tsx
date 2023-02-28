import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import styles from "./Navigation.module.css";

function Navigation(): JSX.Element {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.item}>
          <Link to="/login">Login</Link>
        </li>
        <li className={styles.item}>
          <Link to="/profile">Profile</Link>
        </li>
        <li className={styles.item}>
          <Link to="/register">Register</Link>
        </li>
        <li className={styles.item}>
          <form onSubmit={handleSubmit}>
            <button className={styles.button}>Logout</button>
          </form>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
