import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Session from "./components/Session";
import useIsLogged from "./hooks/useIsLogged";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

export default function App(): JSX.Element {
  const isLogged = useIsLogged();

  return (
    <BrowserRouter>
      <Session>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute isAllowed={isLogged} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Session>
    </BrowserRouter>
  );
}
