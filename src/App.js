import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./component/movies";
import Navbar from "./component/navbar";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Favorites from "./pages/favorites";
import Trending from "./pages/trending";
import MovieForm from "./pages/movieForm";
import { useEffect, useState } from "react";
import Logout from "./pages/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Profile from "./pages/profile";
import ProtectedRoute from "./component/protectedRoute";
import NotFound from "./component/notFound";

function App() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUsers({ user });
  }, []);

  return (
    <div className="App">
      <div>
        <ToastContainer />

        <Navbar user={users.user} />

        <div className="content">
          <Routes>
            <Route path="/" element={<Movies user={users.user} />} />
            <Route
              path="/register/:id"
              element={
                <ProtectedRoute redirectTo="/login" component={MovieForm} />
              }
            />
            <Route path="/profile" element={<Profile user={users.user} />} />
            <Route path="/logout" element={<Logout />} />
            {/* <Route path="/login" element={<ProtectedRoute redirectTo="/" component={MovieForm} />} /> */}
            <Route
              path="/login"
              element={users.user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signUp"
              element={users.user ? <Navigate to="/" /> : <SignUp />}
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
