import * as React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router";

interface IProtectedRoutesProps {
  children?: React.ReactNode;
}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  if (!isAuthenticated && pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && pathname === "/login") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
