import {
  Routes,
  Route,
  Navigate,
  Outlet,
  createBrowserRouter,
} from "react-router-dom";
import Navbar from "../component/navbar/Navbar";
import RightBar from "../component/rightbar/RightBar";
import SideBar from "../component/sidebar/SideBar";
import Login from "../src/pages/login/Login";
import Register from "../pages/register/Register";
import Profile from "../pages/profile/Profile";
import Home from "../pages/home/Home";
import ProtectedRoute from "./ProtectedRoute";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <Outlet />
        <RightBar />
      </div>
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
