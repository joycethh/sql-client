import { Routes, Route } from "react-router-dom";

import Layout from "../component/layout/Layout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Profile from "../pages/profile/Profile";
import Home from "../pages/home/Home";
import ProtectedRoute from "./ProtectedRoute";
import SearchResults from "../component/search/SearchResults";

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/search" element={<SearchResults />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routers;
