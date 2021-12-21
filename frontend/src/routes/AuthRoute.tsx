import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }: any) => {
  const {isAuthenticated, auth} = useSelector((state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
  }));

  return isAuthenticated && auth.accessToken
    ? children 
    : <Navigate to="/login" replace />;
}

export default AuthRoute;