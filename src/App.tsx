import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

export default function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() =>
    Boolean(localStorage.getItem("user"))
  );

  useEffect(() => {
    // Recheck login status on location change (e.g. after login)
    setIsLoggedIn(Boolean(localStorage.getItem("user")));
  }, [location]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={isLoggedIn ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
      </Route>
    </Routes>
  );
}
