import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Navbar from "./component/navbar/Navbar";
import RightBar from "./component/rightbar/RightBar";
import SideBar from "./component/sidebar/SideBar";
import Login from "../src/pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <Outlet />
        <RightBar />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
