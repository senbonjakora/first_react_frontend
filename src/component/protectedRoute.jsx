import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import auth from "../services/authService";
import MovieForm from "../pages/movieForm";

const ProtectedRoute = ({ redirectTo, component:Component}) => {
  const location = useLocation();
  return auth.getCurrentUser() ? (
    <Component />
  ) : (
    <Navigate to={redirectTo} state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;
