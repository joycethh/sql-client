import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./component/navbar/Navbar";
import RightBar from "./component/rightbar/RightBar";
import SideBar from "./component/sidebar/SideBar";
import Login from "../src/pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import { useDarkModeContext } from "./context/darkModeContext";
import { useAuthContext } from "./context/authContext";

function App() {
  const { isDarkMode } = useDarkModeContext();
  const { currentUser } = useAuthContext();
  const [user, setUser] = useState(currentUser || null);

  useEffect(() => setUser(currentUser), [currentUser]);

  console.log("current user in app", currentUser);
  console.log("user in app", user);

  // Create a client
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${isDarkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <SideBar />
            <Outlet />
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      exact: true,
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

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
