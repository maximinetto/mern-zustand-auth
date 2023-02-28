import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isAllowed: boolean;
  children?: React.ReactNode;
}

function ProtectedRoute({ isAllowed, children }: Props): JSX.Element {
  if (!isAllowed) return <Navigate to="/login" />;
  return children != null ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;
