import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = ({ children }: any) => {
  const {isAuthenticated, auth} = useSelector((state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
  }));

  return isAuthenticated && auth.accessToken
    ? <Navigate to="/admin/dashboard" replace />
    : children;
}

export default GuestRoute;