import { useEffect } from "react";
import auth from "../services/authService";

const Logout = () => {
  const removeToken = () => {
    auth.logout();
    window.location = "/";
  };

  useEffect(() => {
    removeToken();
  }, []);

  return null;
};

export default Logout;
